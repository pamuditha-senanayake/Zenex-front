import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './NavBar.module.css';

const NavBar = () => {
    const location = useLocation();

    return (
        <nav className={styles.navbar}>
            <h1 className={styles.navBrand}>ZENEX</h1>
            <ul className={styles.navbarNav}>
                <li>
                    <Link
                        to="/home"
                        className={`${styles.navLink} ${location.pathname === '/home' ? styles.activeNavLink : ''}`}
                    >
                        Dashboard
                    </Link>
                </li>
                <li>
                    <Link
                        to="/Prompts"
                        className={`${styles.navLink} ${location.pathname === '/Prompts' ? styles.activeNavLink : ''}`}
                    >
                        Prompts
                    </Link>
                </li>
                <li>
                    <Link
                        to="/Matrix"
                        className={`${styles.navLink} ${location.pathname === '/Matrix' ? styles.activeNavLink : ''}`}
                    >
                        Matrix
                    </Link>
                </li>
                <li>
                    <Link
                        to="/settings"
                        className={`${styles.navLink} ${location.pathname === '/settings' ? styles.activeNavLink : ''}`}
                    >
                        Settings
                    </Link>
                </li>
                <li>
                    <Link
                        to="/profile"
                        className={`${styles.navLink} ${location.pathname === '/profile' ? styles.activeNavLink : ''}`}
                    >
                        Profile
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default NavBar;
