import { Link, useNavigate } from 'react-router-dom';
import '../style/navbar.css';
import { useEffect, useState } from 'react';

function NavBar() {
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('login'));
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem('login');
        setIsLoggedIn(false);
        
        // Small delay so state update happens first
        setTimeout(() => {
            navigate('/login');
        }, 100);
    };

    // Listen for login changes from Login component
    useEffect(() => {
        const handleStorageChange = () => {
            setIsLoggedIn(!!localStorage.getItem('login'));
        };

        window.addEventListener('localStorage-change', handleStorageChange);

        return () => {
            window.removeEventListener('localStorage-change', handleStorageChange);
        };
    }, []);

    return (
        <nav className='navbar'>
            <div className='logo'>To Do App</div>
            
            <ul className='nav-links'>
                {isLoggedIn ? (
                    <>
                        <li><Link to="/">List</Link></li>
                        <li><Link to="/add">Add Task</Link></li>
                        <li>
                            <button onClick={logout} className="logout-btn">
                                Logout
                            </button>
                        </li>
                    </>
                ) : null}
            </ul>
        </nav>
    );
}

export default NavBar;