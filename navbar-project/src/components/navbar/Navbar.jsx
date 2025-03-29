import './Navbar.css';
import logo_light from '../../assets/images/logo-black.png';
import logo_dark from '../../assets/images/logo-white.png';
import search_icon_dark from '../../assets/images/search-b.png';
import search_icon_light from '../../assets/images/search-w.png';
import toggle_light from '../../assets/images/night.png';
import toggle_dark from '../../assets/images/day.png';

const Navbar = ({ theme, setTheme }) => {

    const toggle_mode = () => {
        theme === 'light' ? setTheme('dark') : setTheme('light');
    }

    return (
        <nav className='navbar'>
            <img
                src={theme === 'light' ? logo_light : logo_dark}
                alt="logo"
                className='logo'
            />

            <ul>
                <li>Home</li>
                <li>Products</li>
                <li>Features</li>
                <li>About</li>
            </ul>

            <div className="search-box">
                <input type="text" placeholder='Search' />
                <img
                    src={theme === 'light' ? search_icon_light : search_icon_dark}
                    alt="search icon"
                />
            </div>

            <img
                onClick={() => toggle_mode()}
                src={theme === 'light' ? toggle_light : toggle_dark}
                alt="toggle icon"
                className='toggle-icon'
            />
        </nav>
    )
}

export default Navbar