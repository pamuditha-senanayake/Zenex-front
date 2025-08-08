// src/Prompts.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Prompts.module.css'; // Use prompts-specific styles
// You can also import Home.module.css if you want to reuse specific classes directly,
// but for better separation, we'll copy shared styles to Prompts.module.css.

const promptSteps = [
    {
        step: 1,
        title: "Brainstorming a Blog Post",
        description: "Generate innovative ideas and potential outlines for a blog post on a given topic.",
        prompt: `Act as a senior content strategist. I need 5 unique and engaging blog post ideas about "the future of AI in creative industries." For each idea, provide a compelling title and 3-5 key bullet points for the outline. Focus on trends and practical applications.`
    },
    {
        step: 2,
        title: "Summarizing Complex Research",
        description: "Condense a lengthy research paper into a concise, easily digestible summary.",
        prompt: `Read the following research abstract: "[PASTE ABSTRACT HERE]". Summarize it for a non-technical audience in under 150 words. Highlight the main objective, key findings, and potential implications.`
    },
    {
        step: 3,
        title: "Generating Python Code Snippet",
        description: "Request a specific Python function, including best practices and error handling.",
        prompt: `Write a Python function named 'calculate_fibonacci' that takes an integer 'n' as input and returns the nth Fibonacci number. Implement memoization for efficiency and include basic error handling for non-positive or non-integer inputs. Provide a docstring and example usage.`
    },
    {
        step: 4,
        title: "Crafting a Marketing Email",
        description: "Compose a persuasive marketing email for a product launch, tailored to a specific audience.",
        prompt: `Draft a concise and engaging marketing email for the launch of "QuantumLink", a new secure messaging app. The target audience is privacy-conscious professionals. The email should create excitement, highlight key security features, and include a clear call-to-action to download the app. Subject line should be compelling.`
    },
    {
        step: 5,
        title: "Analyzing Customer Feedback",
        description: "Extract insights and sentiment from raw customer reviews to identify common themes.",
        prompt: `Analyze the following raw customer feedback comments (one per line): \n\n"[PASTE COMMENTS HERE]".\n\nIdentify the top 3 recurring positive themes and top 3 recurring negative themes. Provide a sentiment score (positive, negative, neutral) for each comment and suggest actionable improvements based on the feedback.`
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
                <h1 className={styles.navBrand}>AI Nexus <span className={styles.yellowGlow}>OS</span></h1>
                <ul className={styles.navbarNav}>
                    <li><Link to="/home" className={styles.navLink}>Dashboard</Link></li>
                    <li><Link to="/Prompts" className={`${styles.navLink} ${styles.activeNavLink}`}>AI Prompts</Link></li> {/* Active state */}
                    <li><Link to="/tools" className={styles.navLink}>AI Tools</Link></li>
                    <li><Link to="/settings" className={styles.navLink}>Settings</Link></li>
                    <li><Link to="/profile" className={styles.navLink}>Profile</Link></li>
                </ul>
            </nav>

            <header className={styles.header}>
                {/*<h2 className={styles.headerTitle}>AI Prompt Engineering</h2>*/}
                <p className={styles.headerSubtitle}>[Lec 3 Promopt]</p>
            </header>

            <main className={styles.mainContent}>
                <div className={styles.promptSection}>
                    {promptSteps.map((item, index) => (
                        <div key={index} className={styles.promptStep}>
                            <h3 className={styles.stepTitle}>Step {item.step}: <span className={styles.yellowGlow}>{item.title}</span></h3>
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
                <p>&copy; 2023 AI Nexus. All rights reserved. <span className={styles.yellowGlow}>v1.0.0</span></p>
            </footer>
        </div>
    );
}

export default Prompts;