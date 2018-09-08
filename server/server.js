var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://' +
    'localhost:27017/TodosApp');

var Todo = mongoose.model('Todo', {
    text: {
        type: String,
        required: true,
        minLength:1,
        trim: true
   } ,
    completed: {
        type: Boolean,
        default: false
    },
    completedAt: {
        type: Number
    }
});

var newTodo = new Todo({text: '        d'});
newTodo.save().then((doc) => {
    console.log('Saved todo',JSON.stringify(doc,undefined,2));
}, (e) => {
    console.log('Unable to save todo, ',e);
});