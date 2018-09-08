const {MongoClient, ObjectID} = require('mongodb');



MongoClient.connect('mongodb://localhost:27017/TodosApp',(err, db)=>{
    if (err){
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');

    //deleteMany
    // db.collection('Todos').deleteMany({text: 'Walk the dog'}).then((result) => {
    //     console.log(`${result.deletedCount} items were deleted`);
    // });

    // deleteOne
    //     db.collection('Todos').deleteOne({text: 'Walk the dog'}).then((result) => {
    //        console.log(result.result.n);
    //     });

    //fineOneAndDelete
    // db.collection('Todos').findOneAndDelete({text: 'Walk the dog'}).then((result) =>{
    //    console.log(result);
    // });


    db.close();
});