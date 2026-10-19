#!/usr/bin/env python3
"""
Baixa as fotos atuais de todos os produtos da loja, já separadas por perfil de enquadramento.

Uso:  python3 baixar_fotos.py <destino>
Saída: <destino>/<perfil>/<SKU>/<n>.<ext>   (fotos na ordem em que estão no cadastro)
       <destino>/produtos.json              (SKU, nome, link, categorias, perfil, fotos)
"""
import json
import re
import sys
import time
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path

import requests
from bs4 import BeautifulSoup

LOJA = "https://www.unikitchen.com.br"
AQUI = Path(__file__).resolve().parent
S = requests.Session()
S.headers["User-Agent"] = "Mozilla/5.0 (padronizacao de fotos Unikitchen)"


def pegar(url, tentativas=4):
    for i in range(tentativas):
        try:
            r = S.get(url, timeout=60)
            if r.status_code == 200:
                return r
        except requests.RequestException:
            pass
        time.sleep(2 ** i)
    raise RuntimeError(f"falhou: {url}")


def listar(slug):
    """Cards de uma categoria, com todas as páginas."""
    achados, pagina = {}, 1
    while True:
        html = pegar(f"{LOJA}/{slug}?pagina={pagina}").text
        s = BeautifulSoup(html, "html.parser")
        novos = 0
        for card in s.select(".listagem-item"):
            sku = card.select_one(".produto-sku")
            link = card.select_one("a.produto-sobrepor, a.nome-produto")
            if sku and link and sku.get_text(strip=True):
                k = sku.get_text(strip=True)
                if k not in achados:
                    achados[k] = link["href"]
                    novos += 1
        if not novos or not s.select_one(f'.pagination a[href*="pagina={pagina + 1}"]'):
            return achados
        pagina += 1


def fotos_do_produto(url):
    html = pegar(url).text
    urls = re.findall(r'https://cdn\.awsli\.com\.br/2500x2500/[^"\'\s]+/produto/[^"\'\s]+', html)
    vistos, ordem = set(), []
    for u in urls:
        if u not in vistos:
            vistos.add(u)
            ordem.append(u)
    s = BeautifulSoup(html, "html.parser")
    nome = s.select_one("h1.nome-produto")
    return (nome.get_text(strip=True) if nome else ""), ordem


def main():
    destino = Path(sys.argv[1])
    destino.mkdir(parents=True, exist_ok=True)
    mapa = json.loads((AQUI / "perfis.json").read_text(encoding="utf-8"))["categorias"]
    mapa.pop("_ajuda", None)

    produtos = {}
    for slug in mapa:                                  # ordem do arquivo = prioridade
        for sku, link in listar(slug).items():
            p = produtos.setdefault(sku, {"sku": sku, "link": link, "categorias": [], "perfil": mapa[slug]})
            p["categorias"].append(slug)
        print(f"{slug}: {len(produtos)} produtos no total", flush=True)

    def um(p):
        p["nome"], urls = fotos_do_produto(p["link"])
        pasta = destino / p["perfil"] / re.sub(r"[^\w.-]", "_", p["sku"])
        pasta.mkdir(parents=True, exist_ok=True)
        p["fotos"] = []
        for i, u in enumerate(urls, start=1):
            ext = u.rsplit(".", 1)[-1].lower()
            arq = pasta / f"{i}.{ext if ext in ('jpg', 'jpeg', 'png', 'webp', 'gif') else 'jpg'}"
            if not arq.exists():
                arq.write_bytes(pegar(u).content)
            p["fotos"].append({"arquivo": arq.name, "url": u})
        return p

    with ThreadPoolExecutor(6) as ex:
        for n, p in enumerate(ex.map(um, produtos.values()), start=1):
            if n % 25 == 0:
                print(f"{n}/{len(produtos)} produtos baixados", flush=True)

    (destino / "produtos.json").write_text(json.dumps(list(produtos.values()), ensure_ascii=False, indent=1),
                                           encoding="utf-8")
    print(f"Pronto: {len(produtos)} produtos")


if __name__ == "__main__":
    main()
