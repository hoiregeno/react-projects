import React, { useState, useEffect } from 'react'

const TodoList = () => {
    // Load the tasks if there are any tasks.
    const [tasks, setTasks] = useState(() => JSON.parse(localStorage.getItem("tasks")) || []);
    const [newTask, setNewTask] = useState("");

    //Save the tasks.
    useEffect(() => localStorage.setItem("tasks", JSON.stringify(tasks)), [tasks]);

    // Updates the newTask state whenever the input field value changes.
    const handleInputChange = (event) => {
        setNewTask(event.target.value);
    }

    // Adds a new task to the task list if it's not empty and not already in the list.
    const addTask = () => {
        if (newTask.trim() !== "" && !tasks.includes(newTask)) {
            setTasks(t => [...t, newTask]);
            setNewTask(""); // Clears the input field after adding the task.
        }
    }

    // Removes a task from the list by filtering out the task at the given index.
    const deleteTask = (index) => {
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatedTasks);
    }

    // Moves a task up in the list if it's not already at the top.
    const moveTaskUp = (index) => {
        const updatedTasks = [...tasks];

        // Swaps the task with the one above it.
        if (index > 0) {
            [updatedTasks[index], updatedTasks[index - 1]] = [updatedTasks[index - 1], updatedTasks[index]];
            setTasks(updatedTasks);
        }
    }

    // Moves a task down in the list if it's not already at the bottom.
    const moveTaskDown = (index) => {
        const updatedTasks = [...tasks];

        // Swaps the task with the one below it.
        if (index < tasks.length - 1) {
            [updatedTasks[index], updatedTasks[index + 1]] = [updatedTasks[index + 1], updatedTasks[index]];
            setTasks(updatedTasks);
        }
    }

    return (
        <div className="todo-container">
            <h1>Todo List</h1>
            <div className="input-wrapper">
                <input
                    type="text"
                    placeholder="Enter your task here"
                    value={newTask}
                    onChange={handleInputChange}
                />
                <button className="add-btn" onClick={addTask}>Add</button>
            </div>
            <ul>
                {tasks.map((task, index) =>
                    <li key={index}>
                        <span className="text">{task}</span>
                        <div className="button-container">
                            <button className="delete-btn" onClick={() => deleteTask(index)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" ><path d="m16.192 6.344-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414 1.414 4.242-4.242 4.243 4.242 1.414-1.414L13.364 12l4.242-4.242z"></path></svg>
                            </button>
                            <button className="move-btns" onClick={() => moveTaskUp(index)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M19.221 10.803 12 10V4a2 2 0 0 0-4 0v12l-3.031-1.212a2 2 0 0 0-2.64 1.225l-.113.34a.998.998 0 0 0 .309 1.084l5.197 4.332c.179.149.406.231.64.231H19a2 2 0 0 0 2-2v-7.21a2 2 0 0 0-1.779-1.987z"></path></svg>
                            </button>
                            <button className="move-btns" onClick={() => moveTaskDown(index)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M16.278 2.231a1.001 1.001 0 0 0-.64-.231H5a2 2 0 0 0-2 2v7.21a2 2 0 0 0 1.779 1.987L12 14v6a2 2 0 0 0 4 0V8l3.03 1.212a2.001 2.001 0 0 0 2.641-1.225l.113-.34a.998.998 0 0 0-.309-1.084l-5.197-4.332z"></path></svg>
                            </button>
                        </div>
                    </li>
                )}
            </ul>
        </div>
    )
}

export default TodoList