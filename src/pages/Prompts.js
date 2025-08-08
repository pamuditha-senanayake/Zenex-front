// src/Prompts.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Prompts.module.css'; // Use prompts-specific styles
// You can also import Home.module.css if you want to reuse specific classes directly,
// but for better separation, we'll copy shared styles to Prompts.module.css.

const promptSteps = [
    {
        step: 1,
        title: "Extraction",
        description: "Extract all the details",
        prompt: `extract exactly everything`
    },
    {
        step: 2,
        title: "Structuring",
        description: "make the extraction into a structure",
        prompt: `dont miss any single point. need every little thing.  now structure this response without missing`
    },
    {
        step: 3,
        title: "Points creation",
        description: "processing part",
        prompt: `Rewrite the following lecture content as a clear, connected bullet-point walkthrough.
\t•\tKeep every sentence short and simple — no longer than one clause.
\t•\tMake the explanation flow like a natural story from start to end.
\t•\tDo not divide the content into subtopics or sections; keep it continuous and smooth.
\t•\tAlways start with what the reader likely already knows, then gently build new ideas step by step.
\t•\tUse plain, everyday language — avoid technical terms until they’ve been explained clearly in context.
\t•\tIf a concept is complex, break it into several simple, short sentences that build on each other.
\t•\tAvoid long or compound sentences. Avoid isolated lists.
\t•\tThe tone should be calm, friendly, and easy to follow, like guiding someone who’s learning for the first time.
\t•\tKeep the original meaning intact, but always prioritize understanding and memory.
\t•\tThe goal is to help someone remember the concept as a connected story, not a set of scattered points.

dont summarize, I need every point to cover here. when I said dont summarize, u can increase the number of points, but u cannot interfere the prompt and make the sentence longer. And continue from start to end continuously.`
    },
    {
        step: 4,
        title: "Adding Headings",
        description: "1 level headings",
        prompt: `now put these exact points into subheadings. only one level`
    },
    {
        step: 5,
        title: "Extra",
        description: "when too long - check",
        prompt: `break this to exactly 2 parts. exactly all. make sure dont summarize or miss any point, feel like u did. dont do that. I need everything.`
    }
];

function Prompts() {
    const [copiedIndex, setCopiedIndex] = useState(null);

    const handleCopy = (text, index) => {
        navigator.clipboard.writeText(text)
            .then(() => {
                setCopiedIndex(index);
                setTimeout(() => setCopiedIndex(null), 1500); // Reset "Copied!" message after 1.5 seconds
            })
            .catch(err => {
                console.error('Failed to copy text: ', err);
                alert('Failed to copy prompt. Please try again.');
            });
    };

    return (
        <div className={styles.promptsContainer}>
            {/* Replicated Navbar from Home.js for consistency */}
            <nav className={styles.navbar}>
                <h1 className={styles.navBrand}>ZENEX.AI </h1>
                <ul className={styles.navbarNav}>
                    <li><Link to="/home" className={`${styles.navLink} ${styles.activeNavLink}`}>AI Prompts</Link></li> {/* Active state */}
                    <li><Link to="/Prompts" className={styles.navLink}>Dashboard</Link></li>
                    <li><Link to="/tools" className={styles.navLink}>AI Tools</Link></li>
                    <li><Link to="/settings" className={styles.navLink}>Settings</Link></li>
                    <li><Link to="/profile" className={styles.navLink}>Profile</Link></li>
                </ul>
            </nav>



            <main className={styles.mainContent}>
                <header className={styles.header}>
                    {/*<h2 className={styles.headerTitle}>AI Prompt Engineering</h2>*/}
                    <p className={styles.headerSubtitle}>[Lec 3 Promopt]</p>
                </header>
                <div className={styles.promptSection}>
                    {promptSteps.map((item, index) => (
                        <div key={index} className={styles.promptStep}>
                            <h5 className={styles.stepTitle}>Step {item.step}: <span
                                >{item.title}</span></h5>
                            <p className={styles.stepDescription}>{item.description}</p>
                            <div className={styles.codeBlockContainer}>
                                <pre className={styles.codeBlock}><code>{item.prompt}</code></pre>
                                <button
                                    className={styles.copyButton}
                                    onClick={() => handleCopy(item.prompt, index)}
                                >
                                    {copiedIndex === index ? 'Copied!' : 'Copy Prompt'}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </main>

            {/* Replicated Footer from Home.js for consistency */}
            <footer className={styles.footer}>
                <p>&copy; 2023 Zenex AI. All rights reserved. <span className={styles.yellowGlow}>v1.0.0</span></p>
            </footer>
        </div>
    );
}

export default Prompts;