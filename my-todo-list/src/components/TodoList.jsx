import React, { useState, useEffect } from 'react';
import styles from '../styles/TodoList.module.css';
import { useTheme } from '../context/ThemeContext';

function TodoList() {
    const { darkMode, toggleTheme } = useTheme();

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

    const validTask = (task, existingTask) => {
        const trimmedTask = task.trim();
        if (!trimmedTask) return "Please enter your task above.";
        if (existingTask.some(t => t.toLowerCase() === trimmedTask.toLowerCase())) return "You already added that task!";
        return null;
    };

    const addNewTask = () => {
        const error = validTask(newTask, tasks);
        if (error) {
            setErrorMessage(error);
            return;
        }
        setTasks(prevTasks => [...prevTasks, newTask.trim()]);
        setNewTask("");
        setErrorMessage("");
    };

    const modifyTaskOrder = (index, direction) => {
        const updatedTasks = [...tasks];
        const swapIndex = direction === 'up' ? index - 1 : index + 1;
        if (swapIndex < 0 || swapIndex >= tasks.length) return;

        [updatedTasks[swapIndex], updatedTasks[index]] = [updatedTasks[index], updatedTasks[swapIndex]];
        setTasks(updatedTasks);
    };

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
                    {tasks.map((task, index) => (
                        <li className={styles.taskItem} key={index}>
                            {task}
                            <div className={styles.controls}>
                                <button className={styles.deleteBtn} onClick={() => deleteTask(index)}>Delete</button>
                                <button className={styles.moveBtns} onClick={() => modifyTaskOrder(index, 'up')}>👆</button>
                                <button className={styles.moveBtns} onClick={() => modifyTaskOrder(index, 'down')}>👇</button>
                            </div>
                        </li>
                    ))}
                </ul>
            }
        </div>
    );
}

export default TodoList;