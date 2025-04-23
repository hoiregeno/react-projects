// DropdownNav.jsx
import React, { useState, useRef, useEffect } from 'react';
import './DropdownNav.css';

const DropdownNav = () => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <nav className="nav1">
            <div className="logo">MyShop</div>
            <ul>
                <li>
                    <a href="/">Home</a>
                </li>
                <li ref={dropdownRef} className="has-child">
                    <button
                        className="dropdown-btn"
                        onClick={() => setIsOpen((prev) => !prev)}
                        aria-expanded={isOpen}
                        aria-haspopup="true"
                    >
                        Products
                    </button>
                    {isOpen && (
                        <ul className="submenu" role="menu">
                            <li>
                                <a href="/products/shirts" role="menuitem">
                                    Shirts
                                </a>
                            </li>
                            <li>
                                <a href="/products/pants" role="menuitem">
                                    Pants
                                </a>
                            </li>
                            <li>
                                <a href="/products/shoes" role="menuitem">
                                    Shoes
                                </a>
                            </li>
                        </ul>
                    )}
                </li>
                <li>
                    <a href="/about">About</a>
                </li>
            </ul>
        </nav>
    );
};

export default DropdownNav;