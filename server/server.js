var express = require('express');
var bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();

app.use(bodyParser.json());

app.post('/todos',(request,response) => {
    var todo = new Todo({
        text: request.body.text
    })
    todo.save().then((doc) =>{
        response.send(doc);
    },(e) => {
        response.status(400).send(e);
    })
});

app.get('/todos',(req,res) => {
   Todo.find().then((todos) =>{
       res.send({todos});
   },(e) =>{
       res.status(400).send(e);
   })
});

app.get('/todos/:id', (req,res) =>{
    var id = req.params.id;
    if (!ObjectID.isValid(id))
        return res.send(JSON.stringify({text: 'invalid ID', status: 400},undefined,2));
    Todo.findById(id).then((todo) => {
        if (!todo)
            res.status(404).send();
        res.send({todo});
    }).catch((e) => {
        res.status(400).send(e);
    })
});

var port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Started up on port ${port}`);
});

module.exports = {
  app
};


