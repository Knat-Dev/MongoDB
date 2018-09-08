const {MongoClient, ObjectID} = require('mongodb');



MongoClient.connect('mongodb://localhost:27017/TodosApp',(err, db)=>{
    if (err){
        return console.log('Unable to connect to MongoDB server');
    }

    console.log('Connected to MongoDB server');

    // db.collection('Todos').findOneAndUpdate({
    //     text: 'eat lunch'
    // },{
    //   $set:{
    //       completed:true
    //   }
    // },{
    //     returnOriginal: false
    // }).then((result) => {
    //     console.log(result);
    // });



    db.collection('Users').findOneAndUpdate({
        name: 'Dor'
    },{
        $set:{
            name: 'Dor',
            location: 'Haifa'
        },
        $inc:{
            age: 3
        }
    },{
        returnOriginal: false
    }).then((result) => {
        console.log(result);
    })


    db.close();
});