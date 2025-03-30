import React, { useEffect, useState } from 'react';
import './TodoList.css';

const TodoList = () => {
    /*** STATE ***/
    // Initialize tasks from localStorage or as an empty array
    const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem("tasks")) || []);
    const [newTask, setNewTask] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    /*** SIDE EFFECTS ***/
    // Save tasks to localStorage whenever tasks change
    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);

    /*** EVENT HANDLERS ***/
    // Handle form submission for adding a task
    const handleListInput = (e) => {
        e.preventDefault();

        // Trim input and convert to lowercase for validation
        const trimmedTask = newTask.trim().toLowerCase();

        if (!trimmedTask) {
            setErrorMessage("Please enter a task.");
            return;
        }

        if (tasks.some(task => task.toLowerCase() === trimmedTask)) {
            setErrorMessage("Task already exists.");
            return;
        }

        // Capitalize the first letter of the task
        const capitalizedTask = trimmedTask.charAt(0).toUpperCase() + trimmedTask.slice(1);

        setTasks(prevTasks => [...prevTasks, capitalizedTask]);
        setNewTask("");
        setErrorMessage("");
    };

    // Delete a task by its index
    const deleteTask = (index) => {
        if (index < 0 || index >= tasks.length) return;
        setTasks(tasks.filter((_, i) => i !== index));
    };

    // Move a task up in the list
    const moveTaskUp = (index) => {
        if (index <= 0 || index >= tasks.length) return;
        const updatedTasks = [...tasks];
        [updatedTasks[index - 1], updatedTasks[index]] = [updatedTasks[index], updatedTasks[index - 1]];
        setTasks(updatedTasks);
    };

    // Move a task down in the list
    const moveTaskDown = (index) => {
        if (index < 0 || index >= tasks.length - 1) return;
        const updatedTasks = [...tasks];
        [updatedTasks[index], updatedTasks[index + 1]] = [updatedTasks[index + 1], updatedTasks[index]];
        setTasks(updatedTasks);
    };

    /*** RENDER ***/
    return (
        <div className="container">
            <h1 className="app-title">Todo-App</h1>

            <form className="todo-form" onSubmit={handleListInput}>
                <input
                    type="text"
                    placeholder="Enter your task"
                    value={newTask}
                    onChange={(e) => {
                        setNewTask(e.target.value);
                        setErrorMessage("");
                    }}
                />
                <button type="submit">Add</button>
            </form>

            {errorMessage && (
                <div className="error-container">
                    <p className="error-message">{errorMessage}</p>
                </div>
            )}

            {tasks.length > 0 && (
                <ol className="list-container">
                    {tasks.map((task, id) => (
                        <li key={id}>
                            <span className="task-display">{task}</span>
                            <div className="controls">
                                <button className="delete-button" onClick={() => deleteTask(id)}>
                                    Delete
                                </button>
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
                    ))}
                </ol>
            )}
        </div>
    );
};

export default TodoList;