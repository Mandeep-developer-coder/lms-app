import { useState, useEffect, useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

import './navbar.css';
import ProfileIcon from '../../assets/profileImg.png';

export const Navbar = () => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef();

    const handleLogin = () => {
        setIsLoggedIn(true);
        setShowDropdown(false);
        navigate('/login');
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setShowDropdown(false);
        navigate('/');
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="main-navbar">
            <div className="main-navbar-container">
                <div className="main-navbar-nav">
                    <NavLink to="/" className="nav-link">HOME</NavLink>
                    <NavLink to="/about" className="nav-link">ABOUT</NavLink>
                    <NavLink to="/rules" className="nav-link">RULE & REGULATION</NavLink>
                    <NavLink to="/books" className="nav-link">BOOKS</NavLink>
                    <NavLink to="/contact-us" className="nav-link">CONTACT US</NavLink>
                </div>

                <div className="main-navbar-profile" ref={dropdownRef}>
                    <img
                        src={ProfileIcon}
                        alt="Profile"
                        className="main-navbar-profile-img"
                        onClick={() => setShowDropdown(!showDropdown)}
                    />
                    {showDropdown && (
                        <div className="main-navbar-dropdown-menu">
                            {!isLoggedIn ? (
                                <>
                                    <div className="main-navbar-dropdown-header">Login to your account</div>
                                    <button className="main-navbar-login-btn" onClick={handleLogin}>Login</button>
                                </>
                            ) : (
                                <>
                                    <div className="main-navbar-dropdown-item" onClick={() => navigate('/profile')}>User Profile</div>
                                    <div className="main-navbar-dropdown-item" onClick={() => navigate('/settings')}>Settings</div>
                                    <div className="main-navbar-dropdown-divider"></div>
                                    <div className="main-navbar-dropdown-item-logout" onClick={handleLogout}>Logout</div>
                                </>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};