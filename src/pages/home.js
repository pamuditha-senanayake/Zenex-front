// src/Home.js
import React from 'react';
import styles from './Home.module.css';
import {Link} from "react-router-dom"; // Import CSS Module

const siteLinks = [
    { name: 'docs', url: 'https://www.docs.new' },
    { name: 'sheets', url: 'https:/s/www.sheets.new' },
    { name: 'Lec 3', url: '/Prompts' },
    { name: 'Stack Overflow', url: 'https://stackoverflow.com' },
    { name: 'MDN Web Docs', url: 'https://developer.mozilla.org/en-US/' },
    { name: 'ChatGPT', url: 'https://chat.openai.com/' },
    { name: 'Docs.new', url: 'https://docs.new' },
    { name: 'Sheets.new', url: 'https://sheets.new' },
    { name: 'Figma', url: 'https://www.figma.com/' },
    { name: 'Notion', url: 'https://www.notion.so/' }
    // { name: 'VS Code Online', url: 'https://vscode.dev/' },
    // { name: 'Canva', url: 'https://www.canva.com/' },
    // { name: 'Twitter (X)', url: 'https://twitter.com/' },
    // { name: 'LinkedIn', url: 'https://www.linkedin.com/' },
    // { name: 'Wikipedia', url: 'https://www.wikipedia.org/' },
    // { name: 'Reddit', url: 'https://www.reddit.com/' },
    // { name: 'Netlify', url: 'https://www.netlify.com/' },
    // { name: 'Vercel', url: 'https://vercel.com/' },
    // { name: 'Stripe Dev', url: 'https://dashboard.stripe.com/test/dashboard' },
    // { name: 'AWS Console', url: 'https://aws.amazon.com/console/' },
    // { name: 'Google Cloud', url: 'https://console.cloud.google.com/' },
    // { name: 'Azure Portal', url: 'https://portal.azure.com/' },
    // { name: 'LeetCode', url: 'https://leetcode.com/' },
    // { name: 'HackerRank', url: 'https://www.hackerrank.com/' },
];

function Home() {
    const handleBoxClick = (url) => {
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    return (
        <div className={styles.homeContainer}>
            <nav className={styles.navbar}>
                <h1 className={styles.navBrand}>ZENEX </h1>
                <ul className={styles.navbarNav}>

                    <li><Link to="/home" className={`${styles.navLink} ${styles.activeNavLink}`}>AI Prompts</Link>
                    </li>
                    <li><Link to="/Prompts" className={styles.navLink}>Dashboard</Link></li>
                    {/* Active state */}
                    <li><Link to="/Matrix" className={styles.navLink}>Matrix</Link></li>
                    <li><Link to="/settings" className={styles.navLink}>Settings</Link></li>
                    <li><Link to="/profile" className={styles.navLink}>Profile</Link></li>
                </ul>
            </nav>

            <header className={styles.header}>
                <p className={styles.headerSubtitle}>[Fast access to customized tools by Pamuditha]</p>
                <h2 className={styles.headerTitle}>Welcome to the ZENEX.AI</h2>

            </header>

            <main className={styles.mainContent}>
                <div className={styles.gridContainer}>
                    {siteLinks.map((link, index) => (
                        <div
                            key={index}
                            className={styles.gridItem}
                            onClick={() => handleBoxClick(link.url)}
                            title={`Go to ${link.name}`}
                        >
                            <span className={styles.itemName}>{link.name}</span>
                            <span className={styles.itemIcon}>&gt;</span> {/* Small techy arrow */}
                        </div>
                    ))}
                </div>
            </main>



            <footer className={styles.footer}>
                <p>&copy; 2025 PAMUDITHA. All rights reserved. <span className={styles.yellowGlow}>v1.0.0</span></p>
            </footer>
        </div>
    );
}

export default Home;