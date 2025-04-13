import React, { useState } from 'react';

function Navbar({ navLinks }) {
    // State to manage the open/close state of the navbar.
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav>
            <ul className='links-container'>
                {navLinks.map((link) => (
                    <li key={link.id}><a href={link.url}>{link.name}</a></li>
                ))}
            </ul>
        </nav>
    );
}

export default Navbar