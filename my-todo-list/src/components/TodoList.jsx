import React, { useState } from 'react'

function TodoList() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    function validTask(task, existingTask) {
        const trimmedTask = task.trim();

        if (!trimmedTask) {
            return "Please enter your task above.";
        }

        if (existingTask.includes(trimmedTask)) {
            return "You already added that task!";
        }

        return null;
    }

    function addNewTask() {
        const error = validTask(newTask, tasks);

        if (error) {
            setErrorMessage(error);
            return;
        }

        const trimmedTask = newTask.trim();

        setTasks(t => [...t, trimmedTask]);
        setNewTask("");
        setErrorMessage("");
    }

    return (
        <>
            <h1>My Todo List</h1>
            <form onSubmit={event => event.preventDefault()}>
                <input
                    type="text"
                    placeholder="Enter your task here"
                    value={newTask}
                    onChange={event => {
                        setNewTask(event.target.value)
                        setErrorMessage("");
                    }}
                />
                <button
                    type="submit"
                    onClick={addNewTask}>Add</button>
            </form>

            {errorMessage && <p>{errorMessage}</p>}

            {tasks.length === 0
                ? <p>You have no tasks at the moment.</p>
                : <ul>
                    {tasks.map(task => <li>{task}</li>)}
                </ul>
            }


        </>
    )
}

export default TodoList