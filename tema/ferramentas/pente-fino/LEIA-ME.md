# Pente fino de SKUs (cruzamento com as listas das marcas)

Estado em 09/10/2026. As listas das marcas (PDF/planilhas) e a planilha de resultado NÃO ficam aqui (repositório público; trazem preços e custos de fornecedor). O cliente guarda: `Pente-fino-SKUs-Unikitchen.xlsx` e as listas originais.

- `lista-cadastro-e-mudancas.md`: lista final para o chat de descrições (26 atualizar, 8 reativar, 4 corrigir, 13 sugestão de remover, 195 novos).
- Scripts (rodar numa pasta com `produtos.xlsx` = exportação da Loja Integrada e `evol/` com as listas convertidas em texto):
  `montar.py` (planilha base + cruzamento) → `plano.py` (aba Plano de ação) → `aba_cadastro.py` (abas Capacidade e Cadastro novos, usa `curva.py`/`novos.py`).
- Regras combinadas: fora de linha = excluir; disponível, indisponível com previsão, em breve e sob consulta = fica (site é catálogo).
- Capacidade: 500 produtos ativos; ativos 188 (após exclusões e Smeg); margem 70 para marcas novas; 8 reativações; 39 vagas guardadas para as listas que faltam.
- Listas já cruzadas: Evol, Tecno (+Bertazzoni, Lofra, Elica), Elettromec (+Viking, Invita, Falmec, Fulgor Milano), Gorenje, Dometic, InSinkErator.
- Faltam: Tramontina, Franke, Deca, Jacuzzi, Speed Queen.
