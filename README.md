<div align="center">
  
  ![Sompur](src/Assets/sompur.png)

  
<p> Sompur é um aplicativo desktop para reprodução de arquivos MP3. Adicione sua música desejada como quiser, mude a capa, seu nome e autor. Fiz esse projeto justamente para ouvir as músicas que eu amo com a cara que eu gosto. Baixe manualmente o mp3 e a capa, os adicione ao Sompur, parece retrógrado? Sim, mas acaba que dou muito mais valor a música que escuto quando é feito esse processo de cuidado e ajustes. Espero que sinta o mesmo. </p>

</div>



<img width="400" height="600" alt="image" src="https://github.com/user-attachments/assets/c6647776-0dd5-424e-ba28-06419097a577" />
<img width="400" height="600" alt="image" src="https://github.com/user-attachments/assets/aecfd7d3-78c9-4021-a558-6baa7ec1c997" />



  # Frontend:         [![My Skills](https://skillicons.dev/icons?i=js,html,css)](https://skillicons.dev)
  # Backend:          [![My Skills](https://skillicons.dev/icons?i=nodejs,electron)](https://skillicons.dev) 
  # Banco de Dados:   [![My Skills](https://skillicons.dev/icons?i=sqlite)](https://skillicons.dev) 

  
- **Metadados:** Biblioteca `music-metadata` para extrair informações de tags ID3




# Funcionalidades Atuais

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



**Importar via Interface**

1. Clique no menu (hambúrguer) no topo
2. Selecione "Adicionar música"
3. Escolha um arquivo MP3
4. Os metadados serão extraídos automaticamente
5. Edite se necessário e salve




## Considerações de Produção

- Banco de dados é criado no diretório de dados do usuário (`app.getPath("userData")`)
- Compatível com Windows, macOS e Linux

## Próximos Passos Potenciais

- Dowloader de mp3 
- créditos no drawer
- ajustar css do habilitar e desabilitar, quando ativada a função ele quebra o css
- fazer icones do drawer no aseprite

## Autor

João Paulo Kowalski
