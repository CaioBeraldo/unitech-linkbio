# UniTech — Link na bio

Projeto simples em **HTML + CSS + JS puro** (sem build, sem dependências).
Só abrir o `index.html` no navegador — ou usar a extensão **Live Server** do VS Code — que já funciona.

## Estrutura

```
unitech-linkbio/
├── index.html        → conteúdo da página (textos e links)
├── css/style.css      → cores, layout, animações de hover
├── js/script.js       → fundo interativo (partículas) + efeito de clique
├── assets/logo.png    → sua logo (usada como avatar)
└── README.md
```

## Como editar

### Trocar o destino de um link
No `index.html`, cada botão é um bloco assim:

```html
<a class="link-card" href="https://instagram.com/" target="_blank" rel="noopener noreferrer">
  ...
  <span class="link-label">Instagram</span>
  ...
</a>
```

- Troque o valor de `href="..."` pela URL desejada.
- Troque o texto dentro de `<span class="link-label">...</span>` pelo nome que quiser mostrar.

### Adicionar um novo botão de link
Copie um bloco `<a class="link-card">...</a>` inteiro (do `<a` até o `</a>` correspondente) e cole
logo abaixo do último, dentro de `<nav class="links"> ... </nav>`. Depois edite o `href` e o texto.

### Remover um botão
Apague o bloco `<a class="link-card">...</a>` inteiro.

### Trocar o ícone de um botão
Cada botão tem um `<svg>...</svg>` dentro de `<span class="link-icon">`. No fim do `index.html`
(comentado) e também no arquivo `icones-extra.html` incluso, tem outros ícones prontos (telefone,
site, play, nota musical, estrela, carrinho, etc). É só copiar o `<svg>` que quiser e colar no lugar.

### Trocar a logo/avatar
Substitua o arquivo `assets/logo.png` por outra imagem com o mesmo nome — ou troque o nome no
`index.html`, na linha:
```html
<img src="assets/logo.png" alt="Logo UniTech">
```

### Trocar as cores
Tudo fica no topo do `css/style.css`, dentro de `:root { ... }`:
```css
--bg-0:#040A24;   /* azul mais escuro do fundo */
--bg-1:#0A1554;
--bg-2:#13278F;   /* azul mais claro do fundo */
--cyan:#3FE0E8;   /* cor de destaque (ícones, brilho) */
--blue:#2F5BFF;   /* segunda cor de destaque */
```
Mudando esses valores, o site inteiro atualiza (anel do avatar, ícones, brilho no hover, etc).

### Fundo interativo (partículas)
Fica no `js/script.js`. Alguns ajustes rápidos:
- `mouse.radius` → distância em que as partículas reagem ao mouse.
- `particleCount()` → quantidade de partículas (o divisor `16000` controla a densidade: número
  menor = mais partículas).
- Distância `120` no cálculo das linhas → controla até que distância duas partículas se conectam.

### Efeito de clique (ripple)
Também no `js/script.js`, no final do arquivo — funciona automaticamente em qualquer elemento com
a classe `.link-card` ou `.social-btn`, então se você adicionar novos botões com essas classes o
efeito já funciona sem precisar mexer no JS.

## Publicar o site

Esse projeto é só HTML/CSS/JS estático, então funciona em qualquer hospedagem simples:
- **GitHub Pages** (grátis)
- **Netlify** / **Vercel** (grátis, arrastar a pasta e pronto)
- Qualquer hospedagem compartilhada comum

Não precisa de servidor, banco de dados nem processo de build.
