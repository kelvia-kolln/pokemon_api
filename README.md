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

# Explicação das regras
## API POKEMON
Contexto: Desenvolver uma api para gerenciamento de pokemons de uma rede de zoológicos

Requisitos: 
- Cadastrar zoológica
- Excluir zoológico
- Cadastrar novo pokemon
- Listar pokemons
- Detalhes de um pokemon
- Editar um pokemon
- Excluir um pokemon
## Adicionado no dia 25/10/2025
- Desvincular um pokémon de um zoológico
- Vincular um pokémon com um zoológico
- Listar pokémons sem zoológico
## Vai ser adicionado
- Adicionar autenticação com jwt, para permitir apenas usuários logados a acessarem a API

Entidades: 
* Pokemon
  - nome
  - peso
  - atributo
  - alimentação
  - espécie
  - em extinção
  - agressividade
  - id do zoológico
* Zoológico
  - nome
  - endereço
  - número de pokemons no zoológico
  - responsável
  - número de funcionários
## Adicionado no dia 25/10/2025
* Usuário
  - nome
  - e-mail
  - senha
  - perfil (admin, funcionário e visitante)
  
Requisitos não funcionais: 
- Só pode excluir um zoológico sem pokemons ✅
- Existe uma máximo de X (0 <= X <= 30) pokemons por zoológico ✅
- A cidade tem espaço para 5 zoológicos cheios
- Deve ser usado o banco de dados MongoDB ✅
- O framework http deve ser express ✅