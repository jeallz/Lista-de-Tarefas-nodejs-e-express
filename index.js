const express = require('express');
require('colors');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const port = 8080;

var tarefas = ['Arrumar a Cama', 'Cozinhar', "Lavar a Louça"];

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended : true
}));

app.set('view engine', 'ejs');
app.use('/Public', express.static(path.join(__dirname, 'Public')));
app.set('views', path.join(__dirname, 'Views'));

app.get('/', (req, res) => {
    res.render('Home/index', { tarefasList : tarefas });
});

app.post('/', (req, res) => {
    tarefas.push(req.body.tarefa);
    res.render('Home/index', { tarefasList : tarefas })
});

app.get('/deletar/:id', (req, res) => {
    tarefas = tarefas.filter((val, index) => {
        if (index !== Number(req.params.id)) {
            return val;
        }
     })

    res.render('Home/index', { tarefasList : tarefas })
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta: ${port}`.green);
});