import React, { useState } from 'react';

const TodoList = () => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleListInput = (e) => {
        e.preventDefault();

        const trimmedTask = newTask.trim().toLowerCase();   // Remove spaces and convert to lowercase

        if (trimmedTask === "") {
            setErrorMessage("Please enter a task.");
            return;
        }

        if (tasks.some(task => task.toLowerCase() === trimmedTask)) {
            setErrorMessage("Task already exists.")
            return;
        }

        setTasks(t => [...t, newTask]);   // Add the task if it's valid
        setNewTask(""); // Clear input
        setErrorMessage(""); // Clear error message.
    }

    const deleteTask = (index) => {
        if (tasks.length === 0) return;
        if (index < 0 || index >= tasks.length) return;

        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatedTasks);
    }

    const moveTaskUp = (index) => {
        // Ensure the index is within valid bounds
        if (index <= 0 || index >= tasks.length) return;

        // Create a copy of the tasks array
        const updatedTasks = [...tasks];

        // Swap the task with the one above it
        [updatedTasks[index], updatedTasks[index - 1]] = [updatedTasks[index - 1], updatedTasks[index]];

        // Update the state with the modified tasks array
        setTasks(updatedTasks);
    }

    const moveTaskDown = (index) => {
        // Ensure the index is within valid bounds
        if (index < 0 || index >= tasks.length - 1) return;

        // Create a copy of the tasks array
        const updatedTasks = [...tasks];

        // Swap the task with the one below it
        [updatedTasks[index], updatedTasks[index + 1]] = [updatedTasks[index + 1], updatedTasks[index]];

        // Update the state with the modified tasks array
        setTasks(updatedTasks);
    }

    return (
        <div className='container'>
            <h1 className='app-title'>Todo-App</h1>

            <form className="todo-form" onSubmit={handleListInput}>
                <input
                    type="text"
                    placeholder='Enter your task'
                    value={newTask}
                    onChange={e => {
                        setNewTask(e.target.value);
                        setErrorMessage("");
                    }}
                />
                <button type="submit">Add</button>
            </form>

            {errorMessage && (
                <div className='error-container'>
                    <p className="error-message">{errorMessage}</p>
                </div>
            )}

            <ol className='list-container'>
                {tasks.map((task, id) =>
                    <li key={id}>
                        <span className='task-display'>{task}</span>
                        <div className="controls">
                            <button className="delete-button" onClick={() => deleteTask(id)}>Delete</button>
                            <button
                                className="move-buttons"
                                onClick={() => moveTaskUp(id)}
                                disabled={id === 0}
                            >
                                👆
                            </button>
                            <button
                                className="move-buttons"
                                onClick={() => moveTaskDown(id)}
                                disabled={id === tasks.length - 1}
                            >
                                👇
                            </button>
                        </div>
                    </li>
                )}
            </ol>
        </div>
    )
}

export default TodoList;