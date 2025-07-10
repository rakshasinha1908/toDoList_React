import { useState } from 'react';

function Home() {
  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-IN', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const [task, setTask] = useState('');
  const [taskList, setTaskList] = useState([]);

  const handleAddTask = () => {
    if (task.trim() === '') return;

    const newTask = {
      id: Date.now(),
      text: task,
      completed: false,
    };

    setTaskList([...taskList, newTask]);
    setTask('');
  };

  const handleToggleComplete = (id) => {
    const updatedTasks = taskList.map((task) =>
        task.id === id? { ...task, completed: !task.completed} : task
    );
    setTaskList(updatedTasks);
  };

  const handleDeleteTask = (id) => {
    const updatedTasks = taskList.filter((task) => task.id != id);
    setTaskList(updatedTasks);
  }

  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const handleEditTask = (id) => {
    const taskToEdit = taskList.find((task) => task.id === id);
    setTask(taskToEdit.text);
    setIsEditing(true);
    setEditId(id);
  }

  const handleUpdateTask = () => {
    if(task.trim() === '') return;

    const updatedTasks = taskList.map((t) =>
        t.id === editId ? { ...t, text: task} : t
    );

    setTaskList(updatedTasks);
    setTask('');
    setIsEditing(false);
    setEditId(null);
  }

  return (
    <div className="outer">
      <div className="container">
        <div className="title">
          <h1>Daily Checklist</h1>
        </div>

        <div>
          <h3>{formattedDate}</h3>
        </div>

        <div className="task">
          <input
            type="text"
            className="next"
            placeholder="What's next?"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
          <button className="add-button" onClick={isEditing ? handleUpdateTask : handleAddTask}>
            {isEditing ? 'Update Task' : 'Add Task'}
          </button>
        </div>

        <div>
            <p>Things to finish today :</p>
        </div>
        <div className="task-list-wrapper">

          {taskList.map((item) => (
            <div className="tasks" key={item.id}>
              <span className={`task-title ${item.completed ? 'completed' : ''}`}>{item.text}</span>

              <div className="circle">
                <i className="fa-solid fa-pen icon" onClick={() => handleEditTask(item.id)}></i>
              </div>
              <div className="circle">
                <i className="fa-solid fa-check icon" onClick={() => handleToggleComplete(item.id)}></i>
              </div>
              <div className="circle">
                <i className="fa-solid fa-trash icon" onClick={() => handleDeleteTask(item.id)}></i>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
