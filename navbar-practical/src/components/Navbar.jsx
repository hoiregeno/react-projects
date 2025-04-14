import React, { useState } from 'react';

function Navbar({ navLinks }) {
    // State to manage the open/close state of the navbar.
    const [isOpen, setIsOpen] = useState(false);

    // The links are passed as props from the parent component.
    return (
        <>
            <button className="open-sidebar-btn">
                <i class='bx bx-menu'></i>
            </button>

            <nav>
                <ul className='links-container'>
                    <li>
                        <button className="close-sidebar-btn">
                            <i class='bx bx-x'></i>
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