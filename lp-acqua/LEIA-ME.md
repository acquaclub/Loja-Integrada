# LP Acqua Exclusive

Página única (`index.html`), feita a partir do documento "ALTERAÇÕES LP ACQUA" (30/10/2026).
Tudo num arquivo só: CSS, ícones e script. Classes com prefixo `aq-` para não conflitar com o tema.

O site atual (acquaexclusive.com.br) foi analisado em 30/10/2026: **WordPress + Elementor (Site Expresso)**. A página nova usa as fotos, logos e o WhatsApp de lá (links diretos para `wp-content/uploads`). Para publicar, o caminho mais simples é remontar no Elementor seguindo esta página como referência, ou colar o HTML num widget "HTML" de uma página em branco (modelo "Elementor Canvas").

## Seções (na ordem do documento)
1. Topo (hero): headline, subheadline, CTAs "Agende uma visita" e "Explore o portfólio".
2. Marcas e portfólio: grade de 6 ambientes; cada um abre um carrossel ampliado.
3. Por que somos Exclusive: 3 cards + CTAs "Agende uma visita" e "Baixe o catálogo Exclusive" (CTA do meio).
4. Depoimentos: 4 fotos de projetos com citação, troca automática a cada 7 s.
5. Galeria de produtos com filtros (Banheiro, Cozinha, Gourmet, Revestimentos), sem códigos.
6. Painéis com ícones (marcas, atendimento, garantia, alto padrão, armazenamento, entrega fracionada).
7. Visite nosso showroom: endereço, horário, WhatsApp + botões grandes (CTA final).
8. Rodapé: telefone, WhatsApp, Instagram. WhatsApp flutuante em toda a página.

## Como trocar fotos e textos
Editar só o bloco `var AQ = { ... }` no início do `<script>`. Foto sem URL aparece como espaço reservado com a descrição do que deve entrar.

## Pendências (precisam do cliente)
- **Fotos**: já usa as do site atual. Faltam as 4 fotos de projeto dos depoimentos e mais fotos de cozinha (só há 1).
- **Nomes dos produtos** da galeria: provisórios, deduzidos das fotos. Confirmar nome e marca de cada um.
- **Foto do showroom**: o arquivo no site chama "ChatGPT-Image…". Se foi gerada ou alterada por IA, trocar por foto real (risco de passar imagem que não corresponde à loja).
- **Depoimentos**: textos, nomes e autorização dos arquitetos (só o 1º texto veio no documento).
- **Catálogo Exclusive (PDF)**: sem link, o botão abre o WhatsApp pedindo o catálogo.
- **"10 anos de garantia"**: confirmar se vale para todos os materiais; garantia varia por linha/fabricante.
- **Horário**: usado o do site (seg–sex 9h–18h). O repositório da Unikitchen diz seg–qui 9h–18h e sex 9h–17h. Confirmar qual vale.
- **Telefone fixo** (15) 3202-4531: veio do repositório; o site atual não mostra telefone fixo.

## Pontos de texto a revisar
- Card 2 diz "Não vendemos por catálogo", mas há CTA "Baixe o catálogo Exclusive". Sugestão: "Baixe o lookbook Exclusive" ou "portfólio Exclusive".
- Subheadline "só quem é Exclusive pode oferecer": mantida, com "Exclusive" em maiúscula (nome da marca).

## Rastreio
Cada clique em CTA envia `{event: 'aq_cta', aq_cta: '<nome>'}` ao `dataLayer` (ex.: `hero_agendar`, `meio_catalogo`, `final_especialista`, `filtro_cozinha`). Criar o acionador no GTM se quiser medir.

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
