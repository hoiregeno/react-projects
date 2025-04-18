import React, { useState, useEffect } from 'react';
import styles from '../styles/TodoList.module.css';
import { useTheme } from '../context/ThemeContext';

function TodoList() {
    const { darkMode, toggleTheme } = useTheme(); // context hook

    const [tasks, setTasks] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem("tasks")) || [];
        } catch {
            return [];
        }
    });
    const [newTask, setNewTask] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);

    function validTask(task, existingTask) {
        const trimmedTask = task.trim();
        if (!trimmedTask) return "Please enter your task above.";
        if (existingTask.some(t => t.toLowerCase() === trimmedTask.toLowerCase())) return "You already added that task!";
        return null;
    }

    function addNewTask() {
        const error = validTask(newTask, tasks);
        setNewTask("");
        if (error) return setErrorMessage(error);
        setTasks(t => [...t, newTask.trim()]);
        setErrorMessage("");
    }

    function deleteTask(index) {
        if (index < 0 || index >= tasks.length) return;
        setTasks(tasks.filter((_, i) => i !== index));
    }

    function moveTaskUp(index) {
        if (index <= 0) return;
        const updatedTasks = [...tasks];
        [updatedTasks[index - 1], updatedTasks[index]] = [updatedTasks[index], updatedTasks[index - 1]];
        setTasks(updatedTasks);
    }

    function moveTaskDown(index) {
        if (index >= tasks.length - 1) return;
        const updatedTasks = [...tasks];
        [updatedTasks[index + 1], updatedTasks[index]] = [updatedTasks[index], updatedTasks[index + 1]];
        setTasks(updatedTasks);
    }

    return (
        <div className={darkMode ? styles.dark : styles.light}>
            <button
                onClick={toggleTheme}
                className={`${styles.toggleBtn} ${darkMode ? styles.darkBtn : styles.lightBtn}`}
            >
                Toggle {darkMode ? "Light" : "Dark"} Mode
            </button>


            <h1 className={styles.title}>My Todo List</h1>
            <form className={styles.todoForm} onSubmit={e => e.preventDefault()}>
                <input
                    type="text"
                    placeholder="Enter your task here"
                    value={newTask}
                    onChange={e => {
                        setNewTask(e.target.value);
                        setErrorMessage("");
                    }}
                    className={`${styles.taskInput} ${darkMode ? styles.darkInput : ''}`}
                />
                <button type="submit" onClick={addNewTask} className={styles.addButton}>Add</button>
            </form>

            {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}

            {tasks.length === 0
                ? <p className={styles.noTaskMessage}>You have no tasks at the moment.</p>
                : <ul className={`${styles.taskList} ${darkMode ? styles.darkTaskList : ''}`}>
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
        </div>
    );
}

export default TodoList;