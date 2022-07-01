const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.lhwyq.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    try{
        await client.connect();
        const todoCollection = client.db("mtask").collection("todos");

        app.post("/todoList", async (req, res) => {
          const todoDoc = req.body;
          const result = await todoCollection.insertOne(todoDoc);
          res.send(result);
        });

        app.get("/todoList", async (req, res) => {
          const query = {};
          const todos = await todoCollection.find(query).toArray();
          res.send(todos);
        });

        app.delete("/todoList/:id", async (req, res) => {
          const id = req.params.id;
          const query = { _id: ObjectId(id) };
          const result = await todoCollection.deleteOne(query);
          res.send(result);
        });
    }
    finally{

    }
}

run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('Hello World!')
  })
  
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
