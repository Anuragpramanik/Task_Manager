
var MongoClient = require("mongodb").MongoClient;
var express = require("express");
var cors = require("cors");


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
    var data = {
        "TaskId":parseInt(req.body.TaskId),
        "Title": req.body.Title,
        "Description":req.body.Description,
        "Completed":(req.body.Completed=="true"||true)?true:false
    }
    try {
        const client = await MongoClient.connect(connectionString);
        const database = client.db("taskdb");
        await database.collection("tbltasks").insertOne(data);
        res.send("Task added successfully");
        
    } catch (err) {
        console.error("Error adding task:", err);
        res.status(500).send("Error adding task");
    }
});

app.put("/upDateTask/:id", async (req, res) => {
    var Data = {
        "TaskId":parseInt(req.body.TaskId),
        "Title": req.body.Title,
        "Description":req.body.Description,
        "Completed":(req.body.Completed=="true"||true)?true:false
    }
    try {
        const taskId = parseInt(req.params.id);
        const client = await MongoClient.connect(connectionString);
        const database = client.db("taskdb");
        await database.collection("tbltasks").updateOne(
            { TaskId:taskId },
            { $set: Data }
        );
        res.send("Task updated successfully"); 
        
    } catch (err) {
        console.error("Error updating task:", err);
        res.status(500).send("Error updating task");
    }
});

app.delete("/deleteTask/:id", async (req, res) => {
    try {
        const taskId = parseInt(req.params.id);
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
