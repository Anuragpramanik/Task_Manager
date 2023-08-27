import React, { useState, useEffect } from "react";
import axios from "axios";
import './taskManager.css';

export function TaskManager() {
  const [data, setData] = useState([]);
  const [newData, setNewData] = useState({ TaskId: 0, Title: "",Description:"", Completed: false });
  const [selectedTodo, setSelectedTodo] = useState(null);

  useEffect(() => {
    loadData();
  }, [data]);

  function loadData(){
    axios({
      method:'GET',
      // url:'https://jsonplaceholder.typicode.com/users/1/todos'
      url:'http://localhost:4001/tasks'
    })
    .then((response)=>{
      setData(response.data);
    })
  }

  function handleId(e) {
    setNewData({
      ...newData,
      TaskId: e.target.value,
    });
  }

  function handleTitle(e) {
    setNewData({
      ...newData,
      Title: e.target.value,
    });
  }

  function handleDescription(e) {
    setNewData({
      ...newData,
      Description: e.target.value,
    });
  }

  function handleComplete(e) {
    setNewData({
      ...newData,
      Completed: e.target.checked
    });
  }

async function handleSubmit(e) {
    e.preventDefault();
  
    if (!newData.TaskId || !newData.Title ) {
      alert("Please fill in all the required fields.");
      return;
    }
  
    try {
      if (selectedTodo) {
        // Update the existing todo
        const response = await axios.put(
          // `https://jsonplaceholder.typicode.com/todos/${selectedTodo.id}`,
          `http://localhost:4001/upDateTask/${selectedTodo.TaskId}`,
          newData
        );
        setData((prevData) =>
          prevData.map((todo) =>
            todo.TaskId === selectedTodo.TaskId ? { ...response.data } : todo
          )
        );
      } else {
        // Add a new todo
        const response = await axios.post(
          // "https://jsonplaceholder.typicode.com/users/1/todos",
          'http://localhost:4001/setTask',
          newData
        );
        setData((prev) => [...prev, response.data]);
      }
      setNewData({ TaskId: 0, Title: "",Description:"", Completed: false });
      setSelectedTodo(null);
    } catch (error) {
      console.error("Error adding/updating todo:", error);
    }
  }
  

  async function handleDelete(todoId) {
    try {
      await axios.delete(
        // `https://jsonplaceholder.typicode.com/todos/${todoId}`
       `http://localhost:4001/deleteTask/${todoId}`
        );
      setData((prevData) => prevData.filter((todo) => todo.TaskId !== todoId));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  }
  
  function handleEdit(todo) {
    setSelectedTodo(todo);
    setNewData({
      TaskId: todo.TaskId,
      Title: todo.Title,
      Completed: todo.Completed,
    });
  }
  
  return (
    <div className="container-fluid">
     
      <section className="main p-1 m-1">
        <nav >
          <form onSubmit={handleSubmit}>
            <dl>
              <dt>Task Id.</dt>
              <dd>
                <input type="number" onChange={handleId} value={newData.TaskId} name="id" className="form-control" />
              </dd>
              <dt>Title.</dt>
              <dd>
                <input type="text" onChange={handleTitle} value={newData.Title} name="title" className="form-control" />
              </dd>
              <dt>Description.</dt>
              <dd>
                <input type="text" onChange={handleDescription} value={newData.Description} name="description" className="form-control" />
              </dd>
              <dt>Completed</dt>
              <dd className="form-switch">
                <input type="checkbox" onChange={handleComplete} checked={newData.Completed} name="complete" className="form-check-input" />
              </dd>
            </dl>
            <hr />
            <button className="btn btn-dark">Submit</button> Add New Task..
          </form>
        </nav>
        <main style={{height:'640px',overflow:'auto'}}>
          <dl>
            
            {data.map((todo) => (
                <React.Fragment key={todo.TaskId}>
                    <dt>{todo.TaskId} : {todo.Title}</dt>
                    <dd>{todo.Description}</dd>
                    <dd>{todo.Completed ? "Completed" : "InComplete"}</dd>
                    <button className="btn btn-outline-danger"onClick={() => handleDelete(todo.TaskId)}>Delete</button> &nbsp;
                    <button className="btn btn-dark"onClick={() => handleEdit(todo)}>Edit </button>
                    <hr />
                </React.Fragment>
                ))}

          </dl>
        </main>
      </section>
    </div>
  );
}
