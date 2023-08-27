
var MongoClient = require("mongodb").MongoClient;
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
    res.send("<h1>--TASK_MANAGER--</h1>");
});

app.get("/getusers", async (req, res) => {
    try {
        const client = await MongoClient.connect("mongodb://127.0.0.1:27017");
        const database = client.db("taskdb");
        const documents = await database.collection("tblusers").find({}).toArray();
        res.send(documents);
    } catch (err) {
        console.error("Error fetching users:", err);
        res.status(500).send("Error fetching users");
    }
});

app.listen(4000);
console.log("Server Started http://127.0.0.1:4000");