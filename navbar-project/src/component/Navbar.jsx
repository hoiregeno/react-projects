import './Navbar.css'

const Navbar = ({ navLinks }) => {

    return (
        <nav className="navbar">
            <h1 className="brand">Brand</h1>
            <ul className="link-container">
                {navLinks.map(link => (
                    <li key={link.name}>
                        <a href={link.url}>
                            {link.name}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
}

export default Navbar