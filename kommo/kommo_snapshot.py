#!/usr/bin/env python3
"""Tira uma "foto" somente-leitura de uma conta Kommo e gera um relatório de organização.

Uso:
    export KOMMO_SUBDOMAIN=minhaempresa          # ou KOMMO_BASE_URL=https://minhaempresa.kommo.com
    export KOMMO_TOKEN=<token de longa duração>
    python3 kommo_snapshot.py [pasta_saida]

O script só faz requisições GET. Nada na conta é alterado.
Saída: um JSON por entidade + RELATORIO.md com o diagnóstico.
"""
import json
import os
import re
import sys
import time
import urllib.error
import urllib.request
from collections import Counter, defaultdict
from datetime import datetime, timezone

STALE_DAYS = 30           # lead aberto sem atualização há mais que isso = "parado"
WON, LOST = 142, 143      # ids fixos de "ganho" e "perdido" no Kommo


def base_url():
    url = os.environ.get("KOMMO_BASE_URL")
    if url:
        return url.rstrip("/")
    sub = os.environ.get("KOMMO_SUBDOMAIN")
    if not sub:
        sys.exit("Defina KOMMO_SUBDOMAIN ou KOMMO_BASE_URL.")
    return f"https://{sub}.kommo.com"


TOKEN = os.environ.get("KOMMO_TOKEN") or sys.exit("Defina KOMMO_TOKEN.")
BASE = base_url()


def get(url):
    """GET com respeito ao limite de requisições do Kommo (7/s) e novas tentativas em 429/5xx."""
    if url.startswith("/"):
        url = BASE + url
    req = urllib.request.Request(url, headers={"Authorization": f"Bearer {TOKEN}"})
    for attempt in range(5):
        time.sleep(0.2)
        try:
            with urllib.request.urlopen(req, timeout=60) as resp:
                if resp.status == 204:
                    return None
                return json.loads(resp.read() or b"null")
        except urllib.error.HTTPError as e:
            if e.code in (429, 500, 502, 503, 504) and attempt < 4:
                time.sleep(2 ** attempt)
                continue
            if e.code == 401:
                sys.exit("401: token inválido ou vencido.")
            if e.code in (402, 403):
                print(f"  aviso: sem acesso a {url} ({e.code}), pulando")
                return None
            raise


def get_all(path, key, params="limit=250"):
    """Percorre todas as páginas de um endpoint de lista."""
    sep = "&" if "?" in path else "?"
    url = f"{path}{sep}{params}"
    items = []
    while url:
        data = get(url)
        if not data:
            break
        items.extend(data.get("_embedded", {}).get(key, []))
        url = data.get("_links", {}).get("next", {}).get("href")
        print(f"  {path}: {len(items)}", end="\r")
    print(f"  {path}: {len(items)}      ")
    return items


def collect():
    d = {}
    print("Baixando dados...")
    d["account"] = get("/api/v4/account?with=task_types,users_groups") or {}
    d["users"] = get_all("/api/v4/users", "users", "limit=250&with=role,group")
    d["pipelines"] = get_all("/api/v4/leads/pipelines", "pipelines", "")
    for ent in ("leads", "contacts", "companies"):
        d[f"{ent}_custom_fields"] = get_all(f"/api/v4/{ent}/custom_fields", "custom_fields", "limit=50")
        d[f"{ent}_tags"] = get_all(f"/api/v4/{ent}/tags", "tags")
    d["loss_reasons"] = get_all("/api/v4/leads/loss_reasons", "loss_reasons", "")
    d["sources"] = get_all("/api/v4/sources", "sources", "")
    d["leads"] = get_all("/api/v4/leads", "leads", "limit=250&with=contacts,loss_reason,source_id")
    d["contacts"] = get_all("/api/v4/contacts", "contacts", "limit=250&with=leads")
    d["companies"] = get_all("/api/v4/companies", "companies")
    d["tasks"] = get_all("/api/v4/tasks", "tasks")
    return d


# ---------- análise ----------

def ts(t):
    return datetime.fromtimestamp(t, timezone.utc).strftime("%Y-%m-%d") if t else "-"


def cf_values(entity, code):
    out = []
    for f in entity.get("custom_fields_values") or []:
        if f.get("field_code") == code:
            out += [str(v.get("value", "")) for v in f.get("values") or []]
    return out


def norm_phone(p):
    digits = re.sub(r"\D", "", p)
    return digits[-11:] if len(digits) >= 8 else ""  # compara pelos últimos 11 dígitos (DDD + número)


def fill_rate(entities, fields):
    used = Counter()
    for e in entities:
        for f in e.get("custom_fields_values") or []:
            if f.get("values"):
                used[f["field_id"]] += 1
    total = len(entities) or 1
    return sorted(((f["name"], used[f["id"]], used[f["id"]] * 100 / total) for f in fields),
                  key=lambda x: x[1])


def tag_usage(entities, tags):
    used = Counter(t["id"] for e in entities for t in (e.get("_embedded") or {}).get("tags") or [])
    return sorted(((t["name"], used[t["id"]]) for t in tags), key=lambda x: x[1])


def report(d):
    now = time.time()
    users = {u["id"]: u["name"] for u in d["users"]}
    L = []
    w = L.append

    w(f"# Diagnóstico Kommo — {d['account'].get('name', '')}")
    w(f"Gerado em {datetime.now().strftime('%Y-%m-%d %H:%M')} (somente leitura)\n")
    w("## Volume")
    for k in ("users", "pipelines", "leads", "contacts", "companies", "tasks"):
        w(f"- {k}: {len(d[k])}")

    # funis e etapas
    w("\n## Funis e etapas (leads por etapa)")
    by_status = Counter((l["pipeline_id"], l["status_id"]) for l in d["leads"])
    empty_stages = []
    for p in d["pipelines"]:
        w(f"\n### {p['name']}{' (arquivado)' if p.get('is_archive') else ''}")
        for s in p.get("_embedded", {}).get("statuses", []):
            n = by_status[(p["id"], s["id"])]
            w(f"- {s['name']}: {n}")
            if n == 0 and s["id"] not in (WON, LOST):
                empty_stages.append(f"{p['name']} › {s['name']}")
    w("\n**Etapas sem nenhum lead:** " + (", ".join(empty_stages) or "nenhuma"))

    # leads problemáticos
    open_leads = [l for l in d["leads"] if l["status_id"] not in (WON, LOST)]
    stale = [l for l in open_leads if now - l["updated_at"] > STALE_DAYS * 86400]
    no_contact = [l for l in open_leads if not (l.get("_embedded") or {}).get("contacts")]
    no_owner = [l for l in open_leads if l.get("responsible_user_id") not in users]
    w("\n## Leads abertos que pedem atenção")
    w(f"- Abertos: {len(open_leads)}")
    w(f"- Parados há mais de {STALE_DAYS} dias: {len(stale)}")
    w(f"- Sem contato vinculado: {len(no_contact)}")
    w(f"- Responsável inexistente/desativado: {len(no_owner)}")
    if stale:
        w(f"\nOs 30 mais antigos parados:\n")
        w("| Lead | Responsável | Última atualização |\n|---|---|---|")
        for l in sorted(stale, key=lambda x: x["updated_at"])[:30]:
            w(f"| {l['name']} (#{l['id']}) | {users.get(l.get('responsible_user_id'), '?')} | {ts(l['updated_at'])} |")

    # por responsável
    w("\n## Leads abertos por responsável")
    for uid, n in Counter(l.get("responsible_user_id") for l in open_leads).most_common():
        w(f"- {users.get(uid, f'id {uid} (inexistente)')}: {n}")

    # contatos duplicados
    w("\n## Contatos possivelmente duplicados")
    keys = defaultdict(list)
    for c in d["contacts"]:
        for p in cf_values(c, "PHONE"):
            if norm_phone(p):
                keys["tel " + norm_phone(p)].append(c)
        for e in cf_values(c, "EMAIL"):
            if e.strip():
                keys["email " + e.strip().lower()].append(c)
    dups = {k: v for k, v in keys.items() if len({c["id"] for c in v}) > 1}
    w(f"- Grupos com mesmo telefone/e-mail: {len(dups)}")
    no_info = [c for c in d["contacts"] if not cf_values(c, "PHONE") and not cf_values(c, "EMAIL")]
    w(f"- Contatos sem telefone nem e-mail: {len(no_info)}")
    for k, v in list(dups.items())[:30]:
        w(f"  - {k}: " + "; ".join(f"{c['name']} (#{c['id']})" for c in v))

    # campos personalizados
    for ent in ("leads", "contacts", "companies"):
        fields = d[f"{ent}_custom_fields"]
        if not fields:
            continue
        w(f"\n## Campos personalizados — {ent} (preenchimento)")
        w("| Campo | Preenchidos | % |\n|---|---|---|")
        for name, n, pct in fill_rate(d[ent], fields):
            w(f"| {name} | {n} | {pct:.0f}% |")

    # tags
    for ent in ("leads", "contacts", "companies"):
        tags = d[f"{ent}_tags"]
        if not tags:
            continue
        usage = tag_usage(d[ent], tags)
        unused = [n for n, c in usage if c == 0]
        w(f"\n## Tags — {ent}")
        w(f"- Total: {len(tags)} | sem uso: {len(unused)}")
        if unused:
            w("- Sem uso: " + ", ".join(unused[:80]))
        w("- Mais usadas: " + ", ".join(f"{n} ({c})" for n, c in usage[::-1][:20]))

    # tarefas
    pending = [t for t in d["tasks"] if not t.get("is_completed")]
    overdue = [t for t in pending if (t.get("complete_till") or now) < now]
    w("\n## Tarefas")
    w(f"- Pendentes: {len(pending)} | atrasadas: {len(overdue)}")
    for uid, n in Counter(t.get("responsible_user_id") for t in overdue).most_common():
        w(f"  - {users.get(uid, uid)}: {n} atrasadas")

    # motivos de perda
    if d["loss_reasons"]:
        reasons = {r["id"]: r["name"] for r in d["loss_reasons"]}
        lost = Counter(l.get("loss_reason_id") for l in d["leads"] if l["status_id"] == LOST)
        w("\n## Motivos de perda")
        for rid, n in lost.most_common():
            w(f"- {reasons.get(rid, 'sem motivo')}: {n}")

    w("\n## Usuários")
    for u in d["users"]:
        w(f"- {u['name']} — {u.get('email', '')}")
    return "\n".join(L) + "\n"


def main():
    out = sys.argv[1] if len(sys.argv) > 1 else f"kommo_snapshot_{datetime.now():%Y%m%d_%H%M}"
    os.makedirs(out, exist_ok=True)
    d = collect()
    for k, v in d.items():
        with open(os.path.join(out, f"{k}.json"), "w", encoding="utf-8") as f:
            json.dump(v, f, ensure_ascii=False, indent=1)
    with open(os.path.join(out, "RELATORIO.md"), "w", encoding="utf-8") as f:
        f.write(report(d))
    print(f"Pronto: {out}/RELATORIO.md")


if __name__ == "__main__":
    main()
