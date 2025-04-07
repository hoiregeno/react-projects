import './Navbar.css'

const Navbar = ({ navLinks }) => {
    const openSiderBar = () => {
        document.getElementById("navbar").classList.add("show");
    }

    const closeSidebar = () => {
        document.getElementById("navbar").classList.remove("show");
    }

    return (
        <>
            <button className="open-btn" onClick={openSiderBar}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z"></path>
                </svg>
            </button>
            <nav id="navbar">
                <button className="close-btn" onClick={closeSidebar}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path d="m16.192 6.344-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414 1.414 4.242-4.242 4.243 4.242 1.414-1.414L13.364 12l4.242-4.242z"></path>
                    </svg>
                </button>
                <h1 className="brand">Brand</h1>
                <ul className="link-container">
                    {
                        navLinks.map(navLink => (
                            <li key={navLink.name}>
                                <a href={navLink.url}>
                                    {navLink.name}
                                </a>
                            </li>
                        ))
                    }
                </ul>
            </nav>
        </>
    );
}

export default Navbar