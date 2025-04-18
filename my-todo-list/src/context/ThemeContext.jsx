import React, { createContext, useContext, useState, useEffect } from 'react';

// Create a context
const ThemeContext = createContext();

// ThemeProvider component
export function ThemeProvider({ children }) {
    const [darkMode, setDarkMode] = useState(() => {
        // Check localStorage for saved theme preference
        const savedTheme = localStorage.getItem('darkMode');
        return savedTheme ? JSON.parse(savedTheme) : false; // Default to light mode if not found
    });

    // Toggle theme and save to localStorage
    const toggleTheme = () => {
        setDarkMode(prevMode => {
            const newMode = !prevMode;
            localStorage.setItem('darkMode', JSON.stringify(newMode)); // Save to localStorage
            return newMode;
        });
    };

    return (
        <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

// Custom hook to use theme
export const useTheme = () => useContext(ThemeContext);