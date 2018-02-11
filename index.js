var mongojs = require('mongojs');
var db = mongojs('mongo-sample', ['users']);

// to do bulk operations
var bulk = db.users.initializeOrderedBulkOp();
    bulk.insert({
      name: "Ricky",
      age: 27,
      height: 5.5,
      charm: 10
    });
    bulk.insert({
      name: "Andrea",
      age: 27,
      height: 5.2,
      charm: 10
    });
    bulk.insert({
      name: "Teddybear",
      age: 10,
      height: 2,
      charm: 3
    });
    bulk.insert({
      name: "Felicia",
      age: 3,
      height: .5,
      charm: 3
    });
    bulk.insert({
      name: "Chair",
      age: 1,
      height: 4,
      charm: 1
    });

    // remove anyone under 27
    bulk.find({
      age: {$lt: 27}
    }).remove();

    // Andrea has a birthday!
    // update() will update the whole object
    // updateOne($set: {age: 28})
    bulk.find({name: "Andrea"}).updateOne({$set: {age: 28}});

    bulk.execute((err, r) => {
      console.log("Worked!");
      db.close()
    });

// singular function
// remove( identifier, only one this is removed, callback)
// db.users.remove({
//   _id: mongojs.ObjectId("5a7f88c49f4a52440473d0b5")
// }, true,  (err, result) = => {
//   console.log("Ricky was removed");
//   db.close();
// })
