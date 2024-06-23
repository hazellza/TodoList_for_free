import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);
  
  

  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
    
  }, [tasks]);
  

  const handleAddTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { text: newTask, completed: false }]);
      setNewTask("");
    }
  };

  const handleDeleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const handleClearTasks = () => {
    setTasks([]);
  };

  const handleToggleTask = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-center text-white text-4xl mb-12">TO-DO LIST</h1>
      <div className="flex flex-col container-todo">
        <div className="wrap-todo flex bg-white">
          <input
            type="text"
            className="input-todo font-light"
            placeholder="new task"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <button className="add-todo" onClick={handleAddTask}>
            ADD
          </button>
        </div>

        <div className="list-todo flex flex-col p-6 font-light">
          {tasks.map((task, index) => (
            <div key={index} className="wrap-topic p-2">
              <label htmlFor="todo" className="todo flex items-center gap-2">
                <div>
                  <button
                    className="but-delete text-xs"
                    onClick={() => handleDeleteTask(index)}
                  >
                    X
                  </button>
                </div>
                <input
                  type="checkbox"
                  className="checkbox"
                  checked={task.completed}
                  onChange={() => handleToggleTask(index)}
                />
                <span
                  style={{
                    textDecoration: task.completed ? "line-through" : "none",
                    color: task.completed ? "red" : "rgb(100, 100, 100)",
                  }}
                >
                  {task.text}
                </span>
              </label>
            </div>
          ))}
        </div>

        <div className="grid justify-items-end mt-5">
          <button className="but-clear" onClick={handleClearTasks}>
            CLEAR
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
