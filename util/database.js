const { MongoClient } = require("mongodb");

// const client = new MongoClient(
//   "mongodb+srv://madNode:8O75hjSQlgu5RKxQ@nodemongocluster.ved7ppg.mongodb.net/todosDb?retryWrites=true&w=majority"
// );
let _db;

const mongoConnect = (callback) => {
  MongoClient.connect(process.env.DB_URI)
    .then((client) => {
      console.log("Connected");
      _db = client.db();
      callback();
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

const getDb = () => {
  if (_db) {
    return _db;
  } else {
    throw Error("No Database Found!");
  }
};

module.exports = { getDb, mongoConnect };
