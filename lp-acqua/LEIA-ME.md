# LP Acqua Exclusive

Página única (`index.html`), feita a partir do documento "ALTERAÇÕES LP ACQUA" (30/10/2026).
Tudo num arquivo só: CSS, ícones e script. Classes com prefixo `aq-` para não conflitar com o tema.

O site atual (acquaexclusive.com.br) **não foi acessado**: a rede deste ambiente bloqueia o domínio. Não sei em qual plataforma ele roda; antes de publicar, confirmar onde a página vai entrar.

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
- **WhatsApp da Acqua**: hoje está `(15) 0000-0000`. O do site Unikitchen é (15) 99610-0914; confirmar se é o mesmo.
- **Fotos** (a página é 70% imagem; sem elas não dá para publicar): showroom (hero e CTA final), 6 ambientes com 2–3 fotos cada, 4 projetos dos depoimentos + rosto dos arquitetos, 9+ produtos.
- **Depoimentos**: textos, nomes e autorização dos arquitetos (só o 1º texto veio no documento).
- **Catálogo Exclusive (PDF)**: sem link, o botão abre o WhatsApp pedindo o catálogo.
- **Logos** Acqua, Deca, Portinari e Ceusa (hoje em texto).
- **"10 anos de garantia"**: confirmar se vale para todos os materiais; garantia varia por linha/fabricante.
- **Horário**: usado o do repositório (seg–qui 9h–18h, sex 9h–17h). Confirmar se há sábado.

## Pontos de texto a revisar
- Card 2 diz "Não vendemos por catálogo", mas há CTA "Baixe o catálogo Exclusive". Sugestão: "Baixe o lookbook Exclusive" ou "portfólio Exclusive".
- Subheadline "só quem é Exclusive pode oferecer": mantida, com "Exclusive" em maiúscula (nome da marca).

## Rastreio
Cada clique em CTA envia `{event: 'aq_cta', aq_cta: '<nome>'}` ao `dataLayer` (ex.: `hero_agendar`, `meio_catalogo`, `final_especialista`, `filtro_cozinha`). Criar o acionador no GTM se quiser medir.
