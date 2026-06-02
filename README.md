# SpotiBy 

Um player de músicas minimalista e elegante feito com **Electron**, **HTML**, **CSS** e **JavaScript**.

Projeto pessoal criado para explorar o desenvolvimento de desktop com Electron e desfrutar das suas próprias músicas com uma interface customizada.

---

## Funcionalidades

- Reprodução de arquivos MP3 locais
- **Próxima/Anterior** com navegação cíclica pela playlist
- **Slider de progresso** — arraste para pular para qualquer ponto
- **Relógio de tempo** — mostra tempo atual e duração (MM:SS)
- **Reinicio da música** — volta ao início
- **Autoplay** — toca a próxima música automaticamente ao final

---

## Estrutura do Projeto

```
musicaPlayer/
├── src/
│   ├── Assets/           # Ícones e imagens (botões, logo, etc.)
│   ├── Music/            # Arquivos MP3 das músicas
│   ├── Photo/            # Capas das músicas
│   ├── code.js           # Lógica completa do player
│   ├── index.html        # Interface HTML
│   └── style.css         # Estilos CSS
├── main.js               # Entrada principal do Electron
├── package.json          # Dependências e scripts
├── .gitignore            # Arquivos ignorados no Git
├── .electronmonrc.json   # Config do hot reload
└── README.md             # Este arquivo
```

---

## Como Rodar

### Pré-requisitos

- **Node.js** (v14+) e **npm** instalados

### Instalação

1. Clone ou baixe o repositório:

```bash
git clone <seu-repo>
cd musicaPlayer
```

2. Instale as dependências:

```bash
npm install
```

3. Execute em modo desenvolvimento (com hot reload):

```bash
npm start
```

A janela do app abrirá automaticamente. 

### Build para Distribuição

Para criar um executável:

```bash
npm run dist
```

O arquivo será gerado em `dist/`.

---

## Como Adicionar Músicas

1. Coloque seus arquivos **MP3** na pasta `src/Music/`
2. Coloque as capas (JPG/PNG) na pasta `src/Photo/`
3. Edite `src/code.js` e adicione a música no array `songs`:

```javascript
{
  title: "Nome da Música",
  author: "Artista",
  audio: "Music/arquivo.mp3",
  image: "Photo/capa.jpg",
}
```

4. Salve e veja a mudança em tempo real!

---

## Tecnologias Utilizadas

- **Electron** — Framework para apps desktop
- **HTML5 & CSS3** — Interface e estilos
- **JavaScript Vanilla** — Lógica sem dependências
- **electron-reload** — Hot reload automático
- **electron-builder** — Build e packaging

---

## Notas

- O player faz loop automático ao final da playlist
- Use o slider para pular entre partes da música
- Todos os tempos são exibidos em formato `MM:SS`
- A interface é otimizada para uma resolução específica (490x760px)

---

## 👨‍💻 Autor

João Paulo Kowalski
