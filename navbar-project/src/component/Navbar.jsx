import { useState, useEffect } from 'react';
import './Navbar.css';

const Navbar = ({ navLinks }) => {
    // State for handling sidebar open/close and mobile view detection
    const [isOpen, setIsOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    // Effect to track window resizing and check if mobile view is active
    useEffect(() => {
        const mediaQuery = window.matchMedia("(max-width: 500px)");
        setIsMobile(mediaQuery.matches);

        const handleResize = (e) => {
            setIsMobile(e.matches);
        };

        mediaQuery.addEventListener("change", handleResize);
        return () => mediaQuery.removeEventListener('change', handleResize);
    }, []);

    // Toggle sidebar visibility
    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    // Close the sidebar
    const closeSidebar = () => {
        setIsOpen(false);
    };

    return (
        <>
            {/* Backdrop for mobile view */}
            {isMobile && isOpen && (
                <div className="backdrop" onClick={closeSidebar}></div>
            )}

            {/* Hamburger Button (mobile view) */}
            <button
                className="open-btn"
                onClick={toggleSidebar}
                aria-expanded={isOpen ? "true" : "false"}
                aria-label="Open navigation menu"
                aria-controls="navbar"
            >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z"></path>
                </svg>
            </button>

            {/* Sidebar / Navbar */}
            <nav id="navbar" className={isOpen ? "show" : ""} aria-label="Primary navigation">
                {/* Close Button */}
                <button
                    className="close-btn"
                    onClick={toggleSidebar}
                    aria-label="Close navigation menu"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path d="m16.192 6.344-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414 1.414 4.242-4.242 4.243 4.242 1.414-1.414L13.364 12l4.242-4.242z"></path>
                    </svg>
                </button>

                {/* Brand */}
                <h1 className="brand">Brand</h1>

                {/* Navigation Links */}
                <ul className="link-container">
                    {navLinks.map(navLink => (
                        <li key={navLink.name}>
                            <a
                                href={navLink.url}
                                className="nav-link"
                                onClick={() => {
                                    // Close sidebar on link click if on mobile
                                    if (isMobile) {
                                        closeSidebar();
                                    }
                                }}
                            >
                                {navLink.name}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
        </>
    );
};

export default Navbar;