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

        if (existingTask.some(t => t.toLowerCase() === trimmedTask.toLowerCase())) {
            return "You already added that task!";
        }

        return null;
    }

    function addNewTask() {
        const error = validTask(newTask, tasks);

        setNewTask("");

        if (error) {
            setErrorMessage(error);
            return;
        }

        // If there are no errors, do this.
        const trimmedTask = newTask.trim();

        setTasks(t => [...t, trimmedTask]);
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
                    {tasks.map((task, index) => <li key={index}>{task}</li>)}
                </ul>
            }


        </>
    )
}

export default TodoList