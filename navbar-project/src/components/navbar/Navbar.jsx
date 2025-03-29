import './Navbar.css';

const Navbar = () => {
    return (
        <nav className='navbar'>
            <ul>
                <li>Home</li>
                <li>Products</li>
                <li>Features</li>
                <li>About</li>
            </ul>

            <div className="search-box">
                <input type="text" placeholder='Search' />
                <img src="" alt="" />
            </div>
        </nav>
    )
}

export default Navbar