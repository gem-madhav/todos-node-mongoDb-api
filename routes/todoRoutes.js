require("dotenv").config();
const { ObjectId } = require("mongodb");

const getDb = require("../util/database").getDb;

const router = async (req, res) => {
  const { url, method } = req;
  console.log(url, method);
  const db = getDb();

  //   Getting All Todos
  if (url === "/todos" && method === "GET") {
    res.writeHead(200, { "content-type": "application/json" });
    return db
      .collection("todos")
      .find()
      .toArray()
      .then((result) => {
        res.end(JSON.stringify(result));
      })
      .catch((err) => {
        console.log(err);
        res.end(JSON.stringify({ message: err }));
      });
  }

  //   Inserting Todo
  if (url === "/create-todo" && method === "POST") {
    const body = [];

    req.on("data", (chunk) => {
      body.push(chunk);
    });

    return req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();

      console.log(parsedBody, "Todo Inserted");

      res.writeHead(201, { "content-type": "application/json" });

      const todoToInsertObject = JSON.parse(parsedBody);

      db.collection("todos")
        .insertOne(todoToInsertObject)
        .then((result) => {
          res.end(JSON.stringify({ ...result, message: "Todo Inserted" }));
        })
        .catch((err) => {
          console.log(err);
          res.end(JSON.stringify({ message: err }));
        });
    });
  }

  //   Deleting Todo
  if (url === "/delete-todo" && method === "DELETE") {
    const body = [];

    req.on("data", (chunk) => {
      body.push(chunk);
    });

    return req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();

      console.log(parsedBody, "Todo Deleted");

      res.writeHead(200, { "content-type": "application/json" });

      const todoToDeleteObject = JSON.parse(parsedBody);
      todoToDeleteObject._id = new ObjectId(todoToDeleteObject._id);

      db.collection("todos")
        .findOneAndDelete(todoToDeleteObject)
        .then((result) => {
          res.end(JSON.stringify({ ...result, message: "Todo Deleted" }));
        })
        .catch((err) => {
          console.log(err);
          res.end(JSON.stringify({ message: err }));
        });
    });
  }

  //   Deleting Todo
  if (url === "/update-todo" && method === "PUT") {
    const body = [];

    req.on("data", (chunk) => {
      body.push(chunk);
    });

    return req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();

      console.log(parsedBody, "Todo Updated");

      res.writeHead(200, { "content-type": "application/json" });

      const todoToUpdateObject = JSON.parse(parsedBody);
      todoToUpdateObject._id = new ObjectId(todoToUpdateObject._id);

      db.collection("todos")
        .updateOne(
          { _id: new ObjectId(todoToUpdateObject._id) },
          { $set: { title: todoToUpdateObject.title } }
        )
        .then((result) => {
          res.end(JSON.stringify({ ...result, message: "Todo Updated" }));
        })
        .catch((err) => {
          console.log(err);
          res.end(JSON.stringify({ message: err }));
        });
    });
  }

  res.statusCode = 404;
  res.write("Not Found");
  res.end();
};

module.exports = router;
