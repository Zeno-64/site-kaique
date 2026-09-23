# Landing page Emagrecimento — Kaique Gastim

Redesign da landing page de `kaiquegastim.com.br` (antes em WordPress + Elementor, backup em
`LP - EMAGRECIMENTO - 03 01 25.wpress`). O copy foi mantido; o design foi refeito do zero com foco em conversão.

## Stack

Site estático: HTML + CSS + JavaScript puro, sem framework e sem etapa de build.

- Carrega em uma fração do tempo da versão Elementor, o que ajuda a conversão e o Índice de Qualidade dos anúncios.
- Funciona em qualquer hospedagem, inclusive no mesmo cPanel do WordPress atual.
- Todos os caminhos são relativos, então a pasta pode ser publicada na raiz do domínio ou em uma subpasta.

```
index.html              página completa (copy, SEO, Meta Pixel)
assets/css/style.css    design system e layout responsivo
assets/js/main.js       interações e eventos de conversão
assets/img/             imagens otimizadas em WebP
favicon.png, apple-touch-icon.png
```

## Rodar localmente

```bash
python -m http.server 5173
```

Depois acesse http://localhost:5173.

## Publicar no cPanel

Envie `index.html`, `favicon.png`, `apple-touch-icon.png` e a pasta `assets/` pelo Gerenciador de Arquivos ou por FTP.

**Opção A: subpasta (sem risco, boa para testar primeiro)**

1. Crie `public_html/emagrecimento/` e envie os arquivos para lá.
2. A página fica em `https://kaiquegastim.com.br/emagrecimento/`. Aponte os anúncios para esse endereço.
3. Em `index.html`, atualize `canonical`, `og:url` e `og:image` com o novo caminho.

**Opção B: substituir a página inicial**

1. Envie os arquivos para `public_html/`, ao lado do WordPress.
2. No início do `.htaccess` de `public_html`, adicione:
   ```
   DirectoryIndex index.html index.php
   ```
3. A raiz passa a servir a nova landing page. As páginas do WordPress (blog, Política de Privacidade, Termos de uso)
   continuam funcionando, porque as regras de reescrita do WordPress só atuam em endereços que não existem como arquivo.
4. Limpe o cache do WP Fastest Cache e do LiteSpeed, se estiverem ativos.

## Conversão e rastreamento

- Todos os botões levam ao WhatsApp (`https://wa.link/mveq21`) e abrem em nova aba.
- O Meta Pixel `305153158661152` registra `PageView` ao carregar a página, e `Lead` + `Contact` em qualquer clique de CTA.
  O `content_name` do `Lead` identifica o botão clicado (`hero`, `header`, `flutuante`, `final`...), útil para ver
  qual posição converte mais.
- A versão antiga tentava chamar `marcarEventosERedirecionar()` pelos botões, mas o atributo estava mal configurado
  no Elementor e a função nunca era executada. Agora os eventos disparam de fato.
- As tags do Google Ads/Analytics estavam na lixeira do WordPress e não foram incluídas. Se quiser reativar, cole o
  snippet do `gtag.js` no `<head>` de `index.html`.

## Alterações no texto

O copy foi preservado. Só foram corrigidos erros de digitação e de pontuação:

| Antes | Depois |
|---|---|
| Ferramentais comportamentais | Ferramentas comportamentais |
| Conhecimentos essencias / essenciasi | Conhecimentos essenciais |
| efeito safona / essse | efeito sanfona / esse |
| Porque muito de nós | Porque muitos de nós |
| comaçeram a cair | começaram a cair |
| Como posso agendar eu Acompanhamento | Como posso agendar meu Acompanhamento |
| treino a 9 anos | treino há 9 anos |
| ai realmente / Ai eu emito | aí realmente / Aí eu emito |
| Preescrevo / ainda sim | Prescrevo / ainda assim |
| viabializar | viabilizar |
| Espaço antes de `?` (ex.: "Nutricional ?") | Removido |

No hero, o parágrafo "Se você já tentou de tudo..." passou para antes de "Eu entendo isso perfeitamente...".
É a mesma ordem da página de Tijuca, e assim o "isso" passa a se referir à frustração descrita antes dele.

Rótulos curtos de interface montados a partir do copy existente (sem texto persuasivo novo): links do menu,
botão "Fale com o nutri", faixa de credenciais (UERJ, Nutrição Comportamental, Bangu, online em mais de 5 estados),
selos sobre as fotos e os números da seção "Sobre mim" (27 kg, +15 kg, 9 anos).

## Atualização: Método M.V.P

Fonte: `Método M.V.P — Apresentação.html`. A promessa e a estrutura da oferta foram atualizadas.

| Onde | Antes | Depois |
|---|---|---|
| `<title>`, `og:title` | Nutricionista Esportivo On line e Rio de Janeiro | Método M.V.P — Nutricionista Esportivo Online e Rio de Janeiro |
| `description`, `og:description` | Perca 10 kg em 90 dias | Emagreça até 20 kg (ou mais) em 180 dias |
| H1 do hero | Perca 10 kg em 90 dias e recupere sua Autoestima e Disposição... | Quebre o ciclo da sobrevivência e emagreça até 20 kg (ou mais) em 180 dias |
| Selo do hero | Nutricionista Esportivo em Bangu - RJ e Online! | Método M.V.P · Nutricionista Esportivo em Bangu - RJ e Online! |
| Passo 04 de "Como funciona" | "irei te ensinar os conhecimentos essenciais" | aponta para o Sistema Anti-Efeito Sanfona (6 módulos, 6 metas, inteligência emocional) |

Duas seções novas entraram entre "Como funciona" e "Sobre mim":

- `#metodo` — **Sistema Anti-Efeito Sanfona**: linha do tempo com os 6 módulos (A arte de queimar + calorias,
  Mentalidade campeã, Calorias inteligentes, Fome sob controle, Ambiente e escolhas, Decifrando rótulos),
  mais os cards de "6 metas personalizadas" e "Técnicas de inteligência emocional" (Observação, Sentimentos,
  Necessidades, Pedido específico).
- `#ferramentas` — **Ferramentas de acompanhamento**: diário alimentar com feedback do nutri, método check-in e
  biblioteca da vida real. As três ilustrações são mock-ups em CSS, sem imagem nova.

O menu ganhou o link "Método M.V.P" e os dois botões novos usam os `data-cta` `metodo` e `ferramentas`
no Meta Pixel. O restante do copy (histórias, sobre, FAQ, rodapé) não mudou.

## O que não veio do site antigo

- O banner de cookies do Complianz (plugin do WordPress). Como a página usa o Meta Pixel, avalie incluir um aviso de
  consentimento para a LGPD.
- As imagens de fundo `Planos-Oficiais-2.png` e `estrela.png`, que não estavam no backup. Foram substituídas por
  elementos de design em CSS.
