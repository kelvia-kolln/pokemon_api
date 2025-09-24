// importando o módulo express para lidar com rotas e middlewares
import express from 'express';
import connect from './src/infra/database/index.js';
import routes from './src/interfaces/http/routes/Routes.js';
//quando importar o controller ele vai criar as collections no mongo, desde que o controller tenha importado o model

// iniciando a aplicação express
const app = express();

// definindo a porta em que o servidor irá escutar
const port = process.env.port || 3000;

app.use(express.json()); // middleware para interpretar requisições com payload JSON
app.use(express.urlencoded({ extended: true })); // middleware para interpretar requisições com payload URL-encoded
app.use('/api', routes);

// iniciando o servidor e fazendo com que ele escute na porta definida
app.listen(port, async () => {
    console.log(`Servidor rodando na porta ${port}`)
    await connect()
});