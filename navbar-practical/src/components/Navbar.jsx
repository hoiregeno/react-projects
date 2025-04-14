import React, { useState } from 'react';
import './Navbar.css';

function Navbar({ navLinks }) {
    // State to manage the open/close state of the navbar.
    const [isOpen, setIsOpen] = useState(false);

    function openSidebar() {
        setIsOpen(true);
    }

    function closeSidebar() {
        setIsOpen(false);
    }

    // The links are passed as props from the parent component.
    return (
        <>
            <button onClick={openSidebar} className="open-sidebar-btn">
                <i className="bx bx-menu"></i>
            </button>

            <nav className={isOpen ? "show-sidebar" : ""}>
                <ul className="links-container">
                    <li>
                        <button onClick={closeSidebar} className="close-sidebar-btn">
                            <i className="bx bx-x"></i>
                        </button>
                    </li>
                    {navLinks.map((link) => (
                        <li key={link.id}><a href={link.url}>{link.name}</a></li>
                    ))}
                </ul>
            </nav>
        </>
    );
}

export default Navbar