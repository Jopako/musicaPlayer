# Sompur

Um player de músicas minimalista e elegante desenvolvido com Electron, combinando performance desktop com uma interface interativa.

## Visão Geral

Sompur é um aplicativo desktop para reprodução de arquivos MP3 com foco em experiência do usuário. Construído com tecnologias web modernas encapsuladas no Electron, oferece uma forma elegante de gerenciar e ouvir sua coleção musical pessoal com interface customizada e efeitos visuais interativos.

## Como Foi Desenvolvido

O projeto foi arquitetado com separação clara entre:

- **Frontend:** HTML5, CSS3 e JavaScript vanilla — sem dependências externas
- **Backend:** Node.js com Electron — gerenciando janelas, I/O e integração com o SO
- **Persistência:** SQLite com biblioteca `better-sqlite3` para armazenar metadados de músicas
- **Metadados:** Biblioteca `music-metadata` para extrair informações de tags ID3

O desenvolvimento foi iterativo, começando com um player básico e evoluindo para um aplicativo completo com gerenciamento de biblioteca e efeitos interativos.

## Funcionalidades Atuais

### Reprodução de Áudio

- Reprodução de arquivos MP3 locais com controles básicos
- Botão play/pause com ícone dinâmico
- Navegação com próxima/anterior (com loop cíclico)
- Reinício da música
- Autoplay — passa para próxima música automaticamente ao final

### Gerenciamento de Biblioteca

- Importar músicas MP3 com extração automática de metadados (título, artista, álbum, ano, gênero)
- Banco de dados SQLite para persistência de informações
- Visualizar biblioteca completa de músicas importadas
- Importar/alterar capas de álbum
- Edição manual de metadados antes de salvar
- Exclusão de músicas da biblioteca

### Controles e Interface

- Slider de progresso — clique ou arraste para pular para qualquer ponto da música
- Mostrador de tempo em formato MM:SS (tempo atual / duração total)
- Controle de volume com slider
- Menu lateral (drawer) com acesso a todas as funcionalidades
- Efeito de movimentação 3D no card principal (hover effect com perspectiva)
- Opção para ativar/desativar o efeito de movimentação conforme preferência do usuário

### Armazenamento de Dados

- Banco de dados SQLite criado automaticamente em `~/.config/meu-app/sompur.db`
- Todas as músicas, capas e metadados são persistidos localmente
- Fallback com playlist padrão em caso de DB vazio

## Tecnologias Utilizadas

| Tecnologia                   | Propósito                                                |
| ---------------------------- | -------------------------------------------------------- |
| **Electron**                 | Framework para criar aplicativos desktop multiplataforma |
| **Node.js**                  | Runtime JavaScript no servidor                           |
| **SQLite3** (better-sqlite3) | Banco de dados leve e embutido                           |
| **music-metadata**           | Extração de tags ID3 de arquivos MP3                     |
| **electron-builder**         | Build e packaging para distribuição                      |
| **electron-reload**          | Hot reload automático em desenvolvimento                 |
| **HTML5**                    | Estrutura da interface                                   |
| **CSS3**                     | Estilização com transformações 3D                        |
| **JavaScript Vanilla**       | Lógica sem frameworks externos                           |

## Estrutura do Projeto

```
musicaPlayer/
├── src/
│   ├── Assets/           # Ícones e recursos visuais
│   ├── Music/            # Músicas padrão (fallback)
│   ├── Photo/            # Capas padrão (fallback)
│   ├── code.js           # Lógica completa do player
│   ├── index.html        # Estrutura HTML
│   └── style.css         # Estilos e animações
├── main.js               # Processo principal do Electron
├── package.json          # Dependências e scripts
├── .gitignore            # Arquivos ignorados no Git
├── .electronmonrc.json   # Configuração de hot reload
└── README.md             # Este arquivo
```

## Como Usar

### Instalação e Execução

1. Instale as dependências:

```bash
npm install
```

2. Execute em modo desenvolvimento:

```bash
npm start
```

3. Para build de distribuição:

```bash
npm run dist
```

### Adicionando Músicas

Existem duas formas:

**Opção 1: Importar via Interface**

1. Clique no menu (hambúrguer) no topo
2. Selecione "Adicionar música"
3. Escolha um arquivo MP3
4. Os metadados serão extraídos automaticamente
5. Edite se necessário e salve

**Opção 2: Fallback Local**
Coloque arquivos MP3 em `src/Music/` e capas em `src/Photo/`, então edite `src/code.js` para adicionar à playlist inicial.


## Considerações de Produção

- Banco de dados é criado no diretório de dados do usuário (`app.getPath("userData")`)
- Completamente funcional quando empacotado e distribuído
- Compatível com Windows, macOS e Linux
- Sem dependências externas no runtime (melhor performance)

## Próximos Passos Potenciais

- Desenvolver interface para usuários novos
- Mascote para interface / Aseprite made
- Dowloader de mp3 embutido

## Autor

João Paulo Kowalski
