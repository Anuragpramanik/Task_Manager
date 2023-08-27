
var MongoClient = require("mongodb").MongoClient;
var express = require("express");
var cors = require("cors");
const { ObjectId } = require("mongodb");

var connectionString = "mongodb://127.0.0.1:27017";
var app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/tasks", async (req, res) => {
    try {
        const client = await MongoClient.connect(connectionString);
        const database = client.db("taskdb");
        const documents = await database.collection("tbltasks").find({}).toArray();
        res.send(documents);
        
    } catch (err) {
        console.error("Error fetching tasks:", err);
        res.status(500).send("Error fetching tasks");
    }
});

app.post("/setTask", async (req, res) => {
    try {
        const client = await MongoClient.connect(connectionString);
        const database = client.db("taskdb");
        await database.collection("tbltasks").insertOne(req.body);
        res.send("Task added successfully");
        
    } catch (err) {
        console.error("Error adding task:", err);
        res.status(500).send("Error adding task");
    }
});

app.put("/upDateTask/:id", async (req, res) => {
    try {
        const taskId = req.params.taskId;
        const client = await MongoClient.connect(connectionString);
        const database = client.db("taskdb");
        await database.collection("tbltasks").updateOne(
            { TaskId:taskId },
            { $set: req.body }
        );
        res.send("Task updated successfully");
        
    } catch (err) {
        console.error("Error updating task:", err);
        res.status(500).send("Error updating task");
    }
});

app.delete("/deleteTask/:id", async (req, res) => {
    try {
        const taskId = req.params.todoId;
        const client = await MongoClient.connect(connectionString);
        const database = client.db("taskdb");
        await database.collection("tbltasks").deleteOne({ TaskId:taskId });
        res.send("Task deleted successfully");
        
    } catch (err) {
        console.error("Error deleting task:", err);
        res.status(500).send("Error deleting task");
    }
});

app.listen(4001, () => {
    console.log("Server Started: http://localhost:4001");
});
