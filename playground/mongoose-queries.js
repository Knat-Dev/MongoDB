const {ObjectID} =require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} =require('./../server/models/user');

var id = '5b9441e90fc29b2932bbc30f';



// Todo.find({
//     _id: id
// }).then((todos) => {
//     console.log('Todos: ',JSON.stringify(todos,undefined,2));
// });
//
// Todo.findOne({
//     _id: id
// }).then((todo) => {
//    console.log('Todo: ',JSON.stringify(todo,undefined,2));
// });
User.findById(id).then((user) => {
    if (!user)
        return console.log('Unable to find user');
    console.log('UserById: ',JSON.stringify(user,undefined,2));
}).catch((e) => {
    console.log(e);
});

// Todo.findById(id).then((todo) => {
//     console.log('TodoById: ',JSON.stringify(todo,undefined,2));
// }).catch((e) =>{
//     console.log(e);
// });