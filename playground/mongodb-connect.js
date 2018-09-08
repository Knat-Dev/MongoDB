const {MongoClient, ObjectID} = require('mongodb');



MongoClient.connect('mongodb://localhost:27017/TodosApp',(err, db)=>{
    if (err){
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');
    db.collection('Todos').find().count().then((count)=> {
        console.log(`Todos count: ${count}`);

    },(err)=>{
        console.log('Unable to fetch Todos',err);
    });

    db.collection('Users').find({name: 'Dor'}).toArray().then((doc)=>{
        console.log(JSON.stringify(doc,undefined,2));
    });
    db.close();
});