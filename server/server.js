'use strict';
const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();
var port = process.env.PORT || 3000;




app.use(bodyParser.json());

app.post('/todos',(request,response) => {
    var todo = new Todo({
        text: request.body.text
    })
    todo.save().then((doc) =>{
        response.status(200).send(doc);
    },(e) => {
        response.status(400).send(e);
    })
});

app.get('/todos',(req,res) => {
   Todo.find().then((todos) =>{
       res.status(200).send({todos});
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
            return res.status(404).send();
        res.status(200).send({todo});
    }).catch((e) => {
        res.status(400).send(e);
    })
});

app.delete('/todos/:id',(req,res) => {
   var id = req.params.id;

   if (!ObjectID.isValid(id))
       return res.status(404).send();
   Todo.findByIdAndRemove(id).then((todo) =>{
       if(!todo)
           return res.status(404).send();
       res.status(200).send(todo);
   }).catch((e) => {
       res.status(400).send();
   })
});

app.get('/todos/remove/:id', (req,res) =>{
    var id = req.params.id;

   if (!ObjectID.isValid(id))
       return res.status(404).send();
   Todo.findByIdAndRemove(id).then((todo) =>{
       if(!todo)
           return res.status(404).send();
       res.status(200).send(todo);
   }).catch((e) => {
       res.status(400).send();
   })
});

app.get('/todos/:id/complete',(req,res) => {
    var id = req.params.id;

    if (!ObjectID.isValid(id))
        return res.status(404).send();

    Todo.findByIdAndUpdate(id,
        {$set: {
            completed: true,
            completedAt: new Date().getTime()
            }
        },{new: true})
        .then((todo) => {
            if(!todo)
                return res.status(404).send();
            res.status(200).send({todo});
        })

});

app.patch('/todos/:id', (req,res) => {
   var id = req.params.id;
   var body = _.pick(req.body,['text','completed']);

    if (!ObjectID.isValid(id))
        return res.status(404).send();

    if (_.isBoolean(body.completed) && body.completed){
        body.completedAt = new Date().getTime();
    }else {
        body.completed = false;
        body.completedAt = false;
        console.log();
    }

    Todo.findByIdAndUpdate(id,{$set:body},{new: true}).then((todo) => {
        if (!todo)
            return res.status(404).send();
        res.send({todo});
    }).catch((e) =>{
        res.status(400).send();
    })
});

app.listen(port, () => {
    console.log(`Started up on port ${port}`);
});

module.exports = {
  app
};



