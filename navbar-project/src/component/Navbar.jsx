import './Navbar.css'

const Navbar = (props) => {

    return (
        <nav className="navbar">
            <ul>
                {props.links.map(link => (
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