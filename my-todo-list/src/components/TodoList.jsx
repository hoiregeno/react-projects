import React, { useState } from 'react';
import styles from './TodoList.module.css';

function TodoList() {
    const [tasks, setTasks] = useState([]); // Task list state
    const [newTask, setNewTask] = useState(""); // New task input state
    const [errorMessage, setErrorMessage] = useState(""); // Error message state

    // Function to validate a task
    function validTask(task, existingTask) {
        const trimmedTask = task.trim(); // Trim whitespace

        // If the task is empty, return an error
        if (!trimmedTask) {
            return "Please enter your task above.";
        }

        // If the task already exists, return an error
        if (existingTask.some(t => t.toLowerCase() === trimmedTask.toLowerCase())) {
            return "You already added that task!";
        }

        return null; // No error
    }

    // Function to add a new task
    function addNewTask() {
        const error = validTask(newTask, tasks); // Validate the task

        setNewTask(""); // Clear the input field after validation

        // If there's an error, set the error message and stop
        if (error) {
            setErrorMessage(error);
            return;
        }

        const trimmedTask = newTask.trim(); // Get the trimmed task

        // Add the task to the task list
        setTasks(t => [...t, trimmedTask]);
        setErrorMessage(""); // Clear any existing error message
    }

    // Function to delete task by passing an index
    function deleteTask(index) {
        // Check if the index is within valid range.
        if (index < 0 || index >= tasks.length) return;

        // Remove task if i does not match the index passed in.
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatedTasks);
    }

    // Function to move the task up
    function moveTaskUp(index) {
        // Prevent swapping if the task is already at the top
        if (index <= 0) return;

        const updatedTasks = [...tasks];

        // Swap using array destructuring
        [updatedTasks[index - 1], updatedTasks[index]] = [updatedTasks[index], updatedTasks[index - 1]];

        setTasks(updatedTasks);
    }

    // Function to move the task down
    function moveTaskDown(index) {
        // Prevent swapping if the task is already at the bottom
        if (index >= tasks.length - 1) return;

        const updatedTasks = [...tasks];

        // Swap using array destructuring
        [updatedTasks[index + 1], updatedTasks[index]] = [updatedTasks[index], updatedTasks[index + 1]];

        setTasks(updatedTasks);
    }

    return (
        <>
            <h1 className={styles.title}>My Todo List</h1>
            <form className={styles.todoForm} onSubmit={event => event.preventDefault()}>
                <input
                    type="text"
                    placeholder="Enter your task here"
                    value={newTask}
                    onChange={event => {
                        setNewTask(event.target.value) // Update input value
                        setErrorMessage(""); // Clear error message on typing
                    }}
                    className={styles.taskInput}
                />
                <button type="submit" onClick={addNewTask} className={styles.addButton}>Add</button>
            </form>

            {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}

            {tasks.length === 0
                ? <p className={styles.noTaskMessage}>You have no tasks at the moment.</p>
                : <ul className={styles.taskList}>
                    {tasks.map((task, index) =>
                        <li className={styles.taskItem} key={index}>
                            {task}
                            <div className={styles.controls}>
                                <button className={styles.deleteBtn} onClick={() => deleteTask(index)}>Delete</button>
                                <button className={styles.moveBtns} onClick={() => moveTaskUp(index)}>👆</button>
                                <button className={styles.moveBtns} onClick={() => moveTaskDown(index)}>👇</button>
                            </div>
                        </li>
                    )}
                </ul>
            }
        </>
    )
}

export default TodoList