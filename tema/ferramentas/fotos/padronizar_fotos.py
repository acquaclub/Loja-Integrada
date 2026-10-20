#!/usr/bin/env python3
"""
Padroniza as fotos de produto da Unikitchen.

Entrada:  <entrada>/<perfil>/<SKU>/<n>.<jpg|png|webp>   (é o que o baixar_fotos.py grava)
          selecao.json (nesta pasta) diz quais fotos usar e em que ordem: {"SKU": ["2", "3", "1:medidas"]}
          tipo depois de ":" (opcional): produto | detalhe | medidas. Sem tipo, a ferramenta detecta.
          SKU fora da seleção: usa todas as fotos na ordem do cadastro.
Saída:    <saida>/<categoria>/<codigo>-<NN>.jpg   (2000x2000, fundo branco, JPG)
          <saida>/<categoria>/_conferencia.png      (folha para conferir o resultado)
          <saida>/relatorio.md                      (avisos por produto)

Tipos de foto:
  produto  produto recortado do fundo e enquadrado pelo perfil da categoria (perfis.json)
  detalhe  foto de detalhe sem fundo branco: corte quadrado central, sem recorte
  medidas  desenho técnico: tira a sobra branca e centraliza com margem fixa

Uso:  python3 padronizar_fotos.py <entrada> <saida> [--png] [--so=SKU1,SKU2]
      --png  também grava uma versão PNG com fundo transparente das fotos de produto
      --so   processa só esses SKUs
      --ia   usa remoção de fundo por IA (rembg) quando o fundo não é branco puro
"""
import json
import sys
from pathlib import Path

import numpy as np
from PIL import Image, ImageOps
from scipy import ndimage

AQUI = Path(__file__).resolve().parent
TAMANHO = 2000
QUALIDADE = 88
BRANCO = 243          # a partir deste valor (nos 3 canais) o pixel conta como fundo branco
TIPOS = ("produto", "detalhe", "medidas")
USAR_IA = "--ia" in sys.argv   # remoção de fundo por IA (rembg): só com --ia
PALAVRAS_MEDIDAS = ("medida", "tecnico", "técnico", "dimens", "desenho")


def carregar_perfis():
    perfis = json.loads((AQUI / "perfis.json").read_text(encoding="utf-8"))
    perfis.pop("_ajuda", None)
    return perfis


def abrir(caminho):
    im = Image.open(caminho)
    im = ImageOps.exif_transpose(im)
    return im.convert("RGBA")


def mascara_produto(rgba):
    """Devolve (mascara do produto, como foi obtida). True = produto."""
    a = np.asarray(rgba)
    alfa = a[..., 3]
    if (alfa < 10).mean() > 0.02:                       # já veio sem fundo
        return alfa > 20, "transparencia"
    rgb = a[..., :3]
    claro = (rgb >= BRANCO).all(axis=2)
    rotulos, _ = ndimage.label(claro)
    borda = np.unique(np.concatenate([rotulos[0], rotulos[-1], rotulos[:, 0], rotulos[:, -1]]))
    borda = borda[borda > 0]
    fundo = np.isin(rotulos, borda)
    return ~fundo, "fundo-branco"


def remover_fundo_ia(rgba):
    from rembg import remove  # só carrega se precisar (fundo colorido ou cenário)
    saida = remove(rgba)
    return np.asarray(saida)[..., 3] > 20, "ia"


def limpar(masc):
    """Tira pontinhos soltos (sujeira, marca d'água pequena) para não atrapalhar o enquadramento."""
    rotulos, n = ndimage.label(masc)
    if n <= 1:
        return masc
    areas = ndimage.sum(masc, rotulos, range(1, n + 1))
    minimo = max(areas.max() * 0.002, masc.size * 0.00005)
    manter = np.isin(rotulos, np.nonzero(areas >= minimo)[0] + 1)
    return manter


def borda_branca(rgba):
    a = np.asarray(rgba)
    b = np.concatenate([a[0], a[-1], a[:, 0], a[:, -1]])
    branco_ou_transp = (b[:, 3] < 10) | (b[:, :3] >= BRANCO).all(axis=1)
    return branco_ou_transp.mean()


def detectar_tipo(nome, rgba):
    n = nome.lower()
    for t in TIPOS:
        if n.endswith("-" + t):
            return t
    if any(p in n for p in PALAVRAS_MEDIDAS):
        return "medidas"
    if borda_branca(rgba) < 0.85:
        return "detalhe"
    masc, _ = mascara_produto(rgba)
    ys, xs = np.nonzero(limpar(masc))
    if len(ys) == 0:
        return "produto"
    caixa = np.asarray(rgba)[ys.min():ys.max() + 1, xs.min():xs.max() + 1]
    rgb = caixa[..., :3].astype(int)
    claro = ((rgb >= BRANCO).all(axis=2) | (caixa[..., 3] < 10)).mean()
    cor = (rgb.max(axis=2) - rgb.min(axis=2)).mean()
    if claro > 0.80 and cor < 12:                       # traço fino sobre branco: desenho técnico
        return "medidas"
    return "produto"


def compor(recorte_rgba, escala, x, y):
    w, h = recorte_rgba.size
    nova = recorte_rgba.resize((max(1, round(w * escala)), max(1, round(h * escala))), Image.LANCZOS)
    tela = Image.new("RGBA", (TAMANHO, TAMANHO), (255, 255, 255, 0))
    tela.alpha_composite(nova, (round(x), round(y)))
    return tela


def processar_produto(rgba, perfil):
    masc, metodo = mascara_produto(rgba)
    if USAR_IA and metodo == "fundo-branco" and borda_branca(rgba) < 0.97:
        try:
            masc, metodo = remover_fundo_ia(rgba)
        except Exception as e:  # sem rembg: segue com o recorte simples
            metodo = f"fundo-branco (IA indisponível: {e.__class__.__name__})"
    masc = limpar(masc)
    ys, xs = np.nonzero(masc)
    if len(ys) == 0:
        raise ValueError("produto não encontrado na imagem")
    y0, y1, x0, x1 = ys.min(), ys.max() + 1, xs.min(), xs.max() + 1
    a = np.asarray(rgba).copy()
    a[..., 3] = np.where(masc, a[..., 3], 0)            # fundo vira transparente
    recorte = Image.fromarray(a[y0:y1, x0:x1])
    w, h = recorte.size

    T = TAMANHO
    enc, ocupa, limite, base = perfil["encaixe"], perfil["ocupa"], perfil["limite"], perfil["base"]
    if enc == "largura":
        escala = min(T * ocupa / w, T * limite / h)
    elif enc == "altura":
        escala = min(T * ocupa / h, T * limite / w)
    else:
        escala = T * ocupa / max(w, h)
    nw, nh = w * escala, h * escala
    x = (T - nw) / 2
    if base is None:
        y = (T - nh) / 2
    else:
        y = T * base - nh
        topo = T * (1 - limite) / 2 if enc != "altura" else T * (1 - ocupa) / 2
        if y < topo:                                    # produto alto demais para a base: sobe só o necessário
            y = max(topo, (T - nh) / 2)
    tela = compor(recorte, escala, x, y)
    return tela, metodo, escala


def processar_detalhe(rgba):
    im = Image.new("RGBA", rgba.size, (255, 255, 255, 255))
    im.alpha_composite(rgba)
    # tira faixas brancas inteiras nas bordas (foto horizontal colocada num quadrado branco)
    claro = (np.asarray(im)[..., :3] >= BRANCO).all(axis=2)
    linhas, colunas = np.nonzero(~claro.all(axis=1))[0], np.nonzero(~claro.all(axis=0))[0]
    if len(linhas) and len(colunas):
        im = im.crop((colunas[0], linhas[0], colunas[-1] + 1, linhas[-1] + 1))
    lado = min(im.size)
    escala = TAMANHO / lado
    im = ImageOps.fit(im, (TAMANHO, TAMANHO), Image.LANCZOS, centering=(0.5, 0.5))
    return im, "corte-quadrado", escala


def processar_medidas(rgba):
    masc, metodo = mascara_produto(rgba)
    a = np.asarray(rgba)
    escuro = ~(((a[..., :3] >= BRANCO).all(axis=2)) | (a[..., 3] < 10))
    ys, xs = np.nonzero(escuro)
    y0, y1, x0, x1 = ys.min(), ys.max() + 1, xs.min(), xs.max() + 1
    base = Image.new("RGBA", rgba.size, (255, 255, 255, 255))
    base.alpha_composite(rgba)
    recorte = base.crop((x0, y0, x1, y1))
    w, h = recorte.size
    escala = TAMANHO * 0.90 / max(w, h)
    tela = compor(recorte, escala, (TAMANHO - w * escala) / 2, (TAMANHO - h * escala) / 2)
    return tela, "desenho", escala


def no_branco(tela):
    fundo = Image.new("RGBA", tela.size, (255, 255, 255, 255))
    fundo.alpha_composite(tela)
    return fundo.convert("RGB")


def folha_conferencia(categoria, produtos, destino):
    """Em cima: vitrine (foto 1 de cada produto, como no card, 6 por linha).
    Embaixo: um produto por linha, com todas as fotos na ordem final."""
    from PIL import ImageDraw
    C, G, R, COL = 220, 12, 22, 6
    codigos = sorted(produtos)
    n_fotos = max(len(v) for v in produtos.values())
    largura = G + max(COL, n_fotos) * (C + G)
    lin_vitrine = -(-len(codigos) // COL)
    altura = G + lin_vitrine * (C + R + G) + 30 + len(codigos) * (C + R + G)
    folha = Image.new("RGB", (largura, altura), (225, 225, 225))
    d = ImageDraw.Draw(folha)
    for i, cod in enumerate(codigos):
        x, y = G + (i % COL) * (C + G), G + (i // COL) * (C + R + G)
        folha.paste(produtos[cod][0][1].resize((C, C), Image.LANCZOS), (x, y))
        d.text((x, y + C + 4), cod, fill=(0, 0, 0))
    topo = G + lin_vitrine * (C + R + G) + 30
    for lin, cod in enumerate(codigos):
        for col, (nome, im) in enumerate(produtos[cod]):
            x, y = G + col * (C + G), topo + lin * (C + R + G)
            folha.paste(im.resize((C, C), Image.LANCZOS), (x, y))
            d.text((x, y + C + 4), nome, fill=(0, 0, 0))
    folha.save(destino)


def main():
    args = [a for a in sys.argv[1:] if not a.startswith("--")]
    if len(args) != 2:
        print(__doc__)
        sys.exit(1)
    entrada, saida = Path(args[0]), Path(args[1])
    com_png = "--png" in sys.argv
    perfis = carregar_perfis()
    arq_sel = AQUI / "selecao.json"
    selecao = json.loads(arq_sel.read_text(encoding="utf-8")) if arq_sel.exists() else {}
    selecao.pop("_ajuda", None)
    so = [a.split("=", 1)[1] for a in sys.argv if a.startswith("--so=")]
    so = set(so[0].split(",")) if so else None
    relatorio = ["# Relatório de padronização de fotos", ""]

    for pasta in sorted(p for p in entrada.iterdir() if p.is_dir()):
        categoria = pasta.name
        perfil = perfis.get(categoria, perfis["padrao"])
        destino = saida / categoria
        relatorio += [f"## {categoria}", f"Perfil: `{json.dumps(perfil)}`" +
                      ("" if categoria in perfis else " (perfil padrão: categoria sem perfil próprio)"), ""]
        prontos = {}
        for pasta_prod in sorted(p for p in pasta.iterdir() if p.is_dir()):
            codigo = pasta_prod.name
            if so and codigo not in so:
                continue
            disponiveis = {f.stem: f for f in pasta_prod.iterdir()
                           if f.suffix.lower() in (".jpg", ".jpeg", ".png", ".webp")}
            if codigo in selecao:
                escolha = []
                for item in selecao[codigo]:
                    n, _, tipo = str(item).partition(":")
                    if n in disponiveis:
                        escolha.append((disponiveis[n], tipo or None))
            else:
                escolha = [(disponiveis[k], None) for k in sorted(disponiveis, key=lambda k: int(k) if k.isdigit() else 999)]
            if not escolha:
                continue
            destino.mkdir(parents=True, exist_ok=True)
            avisos, saidas, tipos = [], [], []
            for ordem, (f, tipo) in enumerate(escolha):
                rgba = abrir(f)
                tipo = tipo or ("produto" if ordem == 0 else detectar_tipo(f.stem, rgba))  # a 1ª é sempre o produto
                if tipo == "produto":
                    tela, metodo, escala = processar_produto(rgba, perfil)
                elif tipo == "detalhe":
                    tela, metodo, escala = processar_detalhe(rgba)
                else:
                    tela, metodo, escala = processar_medidas(rgba)
                if escala > 2.6:
                    avisos.append(f"foto {f.stem}: pequena ({rgba.size[0]}x{rgba.size[1]}), ampliada {escala:.1f}x")
                if "IA indisponível" in metodo:
                    avisos.append(f"foto {f.stem}: fundo não é branco puro e a remoção por IA falhou")
                tipos.append(tipo)
                saidas.append((ordem, f, tipo, metodo, tela))

            # desenho técnico sempre por último; o resto fica na ordem escolhida
            saidas.sort(key=lambda s: (s[2] == "medidas", s[0]))
            tipos = [s[2] for s in saidas]
            prontos[codigo] = []
            linhas = []
            for i, (_, f, tipo, metodo, tela) in enumerate(saidas, start=1):
                nome = f"{codigo}-{i:02d}"
                rgb = no_branco(tela)
                rgb.save(destino / f"{nome}.jpg", quality=QUALIDADE, optimize=True, progressive=True)
                if com_png and tipo == "produto":
                    tela.save(destino / f"{nome}.png", optimize=True)
                prontos[codigo].append((nome, rgb))
                kb = (destino / f"{nome}.jpg").stat().st_size // 1024
                linhas.append(f"  - {nome}.jpg ← foto {f.stem} do cadastro ({tipo}, {metodo}, {kb} KB)")

            if "medidas" not in tipos:
                avisos.append("sem desenho técnico com medidas")
            if tipos[0] != "produto":
                avisos.append("a foto 1 não é foto de produto")
            elif len(tipos) < 2 or tipos[1] != "produto":
                avisos.append("a foto 2 (a do mouse) não é foto de produto")
            relatorio.append(f"- **{codigo}**" + (" ⚠ " + "; ".join(avisos) if avisos else " ok"))
            relatorio += linhas
        relatorio.append("")
        if prontos:
            folha_conferencia(categoria, prontos, destino / "_conferencia.png")
            print(f"{categoria}: {len(prontos)} produtos", flush=True)

    saida.mkdir(parents=True, exist_ok=True)
    (saida / "relatorio.md").write_text("\n".join(relatorio) + "\n", encoding="utf-8")
    print(f"Relatório: {saida / 'relatorio.md'}")


if __name__ == "__main__":
    main()
