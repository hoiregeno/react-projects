import './Navbar.css';

const Navbar = () => {
    return (
        <nav className='navbar'>
            <img src="" alt="" className='logo' />

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

            <img src="" alt="" className='toggle-icon' />
        </nav>
    )
}

export default Navbar