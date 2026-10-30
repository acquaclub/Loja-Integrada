# LP Acqua Exclusive

Página única (`index.html`) com **somente** o conteúdo do documento "ALTERAÇÕES LP ACQUA" (versão de 30/10/2026, sem acréscimos).
O site atual é WordPress + Elementor; fotos, logos e WhatsApp vêm de lá (`wp-content/uploads`).

## Seções (ordem e textos do documento)
1. Topo (Hero Visual): headline, subheadline, CTAs "Agende uma visita" e "Explore o portfólio".
2. Marcas e Portfólio: texto do documento + grid de ambientes (banheiro, cozinha, gourmet); cada imagem amplia e abre carrossel.
3. "Por que somos Exclusive": 3 cards + CTAs "Agende uma visita" e "Baixe o catálogo Exclusive".
4. Depoimentos Visuais: 4 fotos de projetos com citação curta (carrossel).
5. Galeria de Produtos: título do documento, filtros Banheiro / Cozinha / Gourmet / Revestimentos, imagem grande + nome.
6. Painéis com ícones: os 6 itens do documento, com logos Deca, Portinari e Ceusa.
7. CTA Estruturado: "Visite nosso showroom", endereço, horário, WhatsApp, botões "Agendar visita" e "Falar com especialista".
8. Rodapé: telefone, WhatsApp, Instagram.

Fotos e textos editáveis no bloco `var AQ = { ... }` do script.

## Pendências
- Nome de cada produto da galeria (hoje "Nome do produto").
- Depoimentos: 4 fotos de projetos, 3 citações e os nomes dos arquitetos (o documento traz só 1 citação, sem nome).
- Link do PDF do catálogo Exclusive (hoje o botão não leva a lugar nenhum).
- Horário: usado o do site (seg–sex 9h–18h); confirmar.
- Telefone fixo (15) 3202-4531: o documento pede telefone no rodapé, mas o site atual não mostra; número veio dos dados da loja no repositório. Confirmar.
- "10 anos de garantia": confirmar se vale para todos os materiais.
- O documento não pede logo da Acqua nem menu no topo; a página está sem os dois.

## Site atual × documento de alterações (30/10/2026)
Já tem: galeria de ambientes, os 3 cards "Por que somos Exclusive", painéis com ícones, logos das marcas, filtros de portfólio, seção de showroom.

Falta ou diverge:
- Topo: headline é "Por que é mais vantajoso optar por pisos e revestimentos de primeira linha?", não a do documento; só 1 CTA; foto escura, não "fundo claro".
- CTA do meio: falta "Baixe o catálogo Exclusive".
- Depoimentos: são prints de avaliações do Google de clientes, não fotos de projetos com arquitetos. Duas citam a **Unikitchen**, não a Acqua.
- Galeria de produtos: só fotos, sem nome.
- Showroom: formulário em vez dos botões grandes "Agendar visita" / "Falar com especialista".
- Rodapé: só Facebook e Instagram; faltam telefone e WhatsApp.
- Erro de grafia: "Portifólio" (3 vezes) → "Portfólio".
- Aviso de cookies cobre parte do topo ao abrir.
- Dois contêineres do GTM (GTM-M8W5QJGX e GTM-TDZTNK44): risco de contar acessos em dobro.
- 5 famílias de fonte diferentes carregadas (Abhaya Libre, Albert Sans, AR One Sans, Afacad, Actor).
