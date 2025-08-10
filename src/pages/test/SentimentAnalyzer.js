import React, { useState } from "react";
import NavBar from '../NavBar';

export default function SentimentAnalyzer() {
    const [inputText, setInputText] = useState("");
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setResult(null); // Clear previous result before new analysis

        try {
            const response = await fetch("http://localhost:8000/analyze", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ text: inputText }),
            });

            if (!response.ok) {
                // Attempt to read error message from response, if available
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || `API error: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            setResult(data);
        } catch (err) {
            setError(err.message || "Failed to analyze text. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    // --- Inline Styles for static elements ---
    const containerStyle = {
        maxWidth: 600,
        margin: "2rem auto",
        padding: "2rem",
        border: "1px solid #222", // Dark gray/black border
        borderRadius: "8px",
        backgroundColor: "white", // Explicitly set background to white
        boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)", // Subtle dark shadow
        color: "#222", // Dark gray text color
        fontFamily: "'Segoe UI', 'Roboto', 'Helvetica Neue', Arial, sans-serif", // Clean, modern font
        position: "relative",
        overflow: "hidden" // Ensures inner elements' shadows/transforms are contained
    };

    const titleStyle = {
        textAlign: "center",
        fontFamily: "'Orbitron', sans-serif",
        fontweight: "100px",
        marginBottom: "1.5rem",
        color: "black",
        textTransform: "uppercase",
        letterSpacing: "1px"
    };

    const textareaStyle = {
        width: "100%",
        padding: "1rem",
        border: "1px solid #555", // Medium gray border
        borderRadius: "4px",
        fontFamily: "'Orbitron', sans-serif",
        fontSize: "1rem",
        minHeight: "120px",
        resize: "vertical",
        backgroundColor: "#f9f9f9", // Very light gray background for input
        color: "black",
        // Transition for focus effect is handled by the injected CSS
    };

    const buttonBaseStyle = { // Base style for the button
        marginTop: "1.5rem",
        padding: "0.8rem 1.8rem",
        fontFamily: "'Orbitron', sans-serif",
        backgroundColor: "black",
        color: "white",
        border: "1px solid black",
        borderRadius: "5px",
        fontSize: "1.1rem",
        cursor: "pointer",
        // Transition and hover/active effects are handled by the injected CSS
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "10px", // Space between text and spinner
    };

    const errorStyle = {
        color: "red", // Keep original red for error messages
        marginTop: "1rem",
        textAlign: "center",
        fontSize: "0.95rem"
    };

    const resultBoxStyle = {
        marginTop: "2rem",
        fontFamily: "'Orbitron', sans-serif",
        padding: "1.5rem",
        backgroundColor: "#f8f8f8",
        border: "1px solid #555",
        borderRadius: "6px",
        color: "black",
        opacity: 0, // initially hidden for fade-in
        transition: "opacity 0.5s ease-in-out",
    };


    const resultLabelStyle = {
        fontWeight: "bold",
        marginRight: "0.5rem",
        color: "#444" // Slightly darker gray for labels
    };

    const sentimentValueStyle = (sentiment) => {
        let color = "#333"; // Default dark gray for neutral/unknown
        if (sentiment === "Positive") color = "#CCCC00"; // A distinct yellow for positive
        else if (sentiment === "Negative") color = "#CC0000"; // A darker red for negative
        return { color, fontWeight: "bold" };
    };

    // --- CSS for Animations and Pseudo-classes (Injected directly into the component) ---
    // This allows for hover effects, focus states, and keyframe animations
    // without requiring an external CSS file, keeping all styling within the component.
    const animationStyles = `
        /* Spinner Animation for loading state */
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        .spinner {
            border: 4px solid rgba(255, 255, 255, 0.3);
            border-top: 4px solid white; /* The "spinning" part */
            border-radius: 50%;
            width: 20px;
            height: 20px;
            animation: spin 1s linear infinite;
        }

        /* Fade-in Animation for the result box */
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .result-animated {
            animation: fadeIn 0.6s ease-out forwards;
        }

        /* Textarea Focus Effect (small yellow highlight) */
        textarea:focus {
            outline: none; /* Remove default outline */
            border-color: yellow; /* Yellow border highlight */
            box-shadow: 0 0 0 3px rgba(255, 255, 0, 0.2); /* Subtle yellow glow */
        }

        /* Button Hover, Active, and Disabled Effects */
        button {
            transition: all 0.3s ease; /* Smooth transitions for all properties */
        }
        button:not(:disabled):hover {
            background-color: #333; /* Darker gray on hover */
            color: yellow; /* Yellow text on hover */
            border-color: yellow; /* Yellow border on hover */
            transform: translateY(-2px); /* Subtle lift effect */
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2); /* Subtle dark shadow */
        }
        button:not(:disabled):active {
            transform: translateY(0); /* Press down effect */
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
            background-color: #222; /* Even darker on active */
            border-color: yellow;
        }
        button:disabled {
            opacity: 0.6;
            cursor: not-allowed;
            background-color: #555; /* Grayed out background */
            border-color: #555;
            color: #ccc; /* Lighter text */
            box-shadow: none;
            transform: none;
        }
    `;

    return (
        <div>
            {/* Inject CSS animations and pseudo-classes into the DOM */}
            <style>{animationStyles}</style>

            <NavBar />

            <div style={containerStyle}>
                <h2 style={titleStyle}>NLP Sentiment Analyzer</h2>
                <form onSubmit={handleSubmit}>
                    <textarea
                        rows={4}
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        placeholder="Type something to analyze..."
                        style={textareaStyle}
                        required
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        style={buttonBaseStyle}
                    >
                        {loading && <div className="spinner"></div>} {/* Spinner animation */}
                        {loading ? "Analyzing..." : "Analyze"}
                    </button>
                </form>

                {error && <p style={errorStyle}>{error}</p>}

                {result && (
                    <div
                        style={resultBoxStyle}
                        className="result-animated" // Apply fade-in animation class here
                    >
                        <p><strong style={resultLabelStyle}>Input Text:</strong> {result.text}</p>
                        <p>
                            <strong style={resultLabelStyle}>Sentiment:</strong>
                            {/* Apply dynamic style for sentiment value (yellow highlight for positive) */}
                            <span style={sentimentValueStyle(result.sentiment)}> {result.sentiment}</span>
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}