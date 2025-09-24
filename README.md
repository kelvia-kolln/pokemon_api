Projeto criado com o intuito de aprender a fazer um CRUD utilizando o node.js com conexão com o mongoDB

# Instalação

### Node.js 
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash

export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm

nvm install 22
nvm use 22

### Para instalar as libs no projeto, basta: 
npm i ou npm install

### Para criar o banco no Mongo
## Compas
- Criar uma nova connections
- Criar no compas um novo database

## Atlas
- Criar um novo projeto
- Criar um novo cluster