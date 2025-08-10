import React, { useState } from "react";
import NavBar from '../NavBar';

export default function CryptoSentiment() {
    // List of common crypto symbols for the dropdown
    const cryptoSymbols = [
        "btcusd",
        "ethusd",
        "xrpusd",
        "ltcusd",
        "adausd",
        "solusd",
        "dogeusd", // Added a couple more common ones
        "dotusd",
    ];

    const [symbol, setSymbol] = useState(cryptoSymbols[0]); // Default to the first symbol
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const analyze = async () => {
        setLoading(true);
        setError(null); // Clear previous errors
        setResult(null); // Clear previous result

        try {
            const response = await fetch("http://localhost:8000/crypto-sentiment", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ symbol }),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || `API error: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            setResult(data);
        } catch (err) {
            setError(err.message || "Failed to fetch crypto sentiment. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    // --- Inline Styles for static elements ---
    const containerStyle = {
        maxWidth: 450,
        margin: "2rem auto",
        padding: "2rem",
        border: "1px solid #222",
        borderRadius: "8px",
        backgroundColor: "white",
        boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
        color: "#222",
        fontFamily: "'Manrope', sans-serif",
        position: "relative",
        overflow: "hidden"
    };

    const titleStyle = {
        textAlign: "center",
        marginBottom: "1.5rem",
        color: "black",
        textTransform: "uppercase",
        letterSpacing: "1px",
        fontFamily: "'Orbitron', sans-serif",
    };

    const selectStyle = { // New style for the select dropdown
        width: "100%",
        padding: "1rem",
        border: "1px solid #555",
        borderRadius: "4px",
        fontSize: "1rem",
        marginBottom: "1.5rem",
        backgroundColor: "#f9f9f9",
        color: "black",
        fontFamily: "'Manrope', sans-serif",
        cursor: "pointer", // Indicate it's clickable
        // Make the default system dropdown arrow black/white if possible, though browser-dependent
        WebkitAppearance: 'none', // Remove default Safari/Chrome styling
        MozAppearance: 'none', // Remove default Firefox styling
        appearance: 'none', // Remove default styling for cross-browser
        // Add a custom arrow if desired (more complex, using pseudo-elements in CSS)
        backgroundImage: 'url("data:image/svg+xml;utf8,<svg fill=\'black\' height=\'24\' viewBox=\'0 0 24 24\' width=\'24\' xmlns=\'http://www.w3.org/2000/svg\'><path d=\'M7 10l5 5 5-5z\'/><path d=\'M0 0h24v24H0z\' fill=\'none\'/></svg>")',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'right 0.8rem top 50%',
        backgroundSize: '24px auto',
    };


    const buttonBaseStyle = {
        padding: "0.8rem 1.8rem",
        backgroundColor: "black",
        color: "white",
        border: "1px solid black",
        borderRadius: "5px",
        fontSize: "1.1rem",
        cursor: "pointer",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "10px",
        fontFamily: "'Manrope', sans-serif",
    };

    const errorStyle = {
        color: "red",
        marginTop: "1rem",
        textAlign: "center",
        fontSize: "0.95rem",
        fontFamily: "'Manrope', sans-serif",
    };

    const resultBoxStyle = {
        marginTop: "2rem",
        padding: "1.5rem",
        backgroundColor: "#f8f8f8",
        border: "1px solid #555",
        borderRadius: "6px",
        color: "black",
        opacity: 0,
        fontFamily: "'Manrope', sans-serif",
    };

    const resultLabelStyle = {
        fontWeight: "bold",
        marginRight: "0.5rem",
        color: "#444"
    };

    const sentimentValueStyle = (sentiment) => {
        let color = "#888";
        if (sentiment === "Bullish") color = "#CCCC00"; // Yellow for Bullish
        else if (sentiment === "Bearish") color = "#CC0000"; // Dark red for Bearish
        return { color, fontWeight: "bold" };
    };

    // --- CSS for Google Fonts, Animations and Pseudo-classes ---
    const animationStyles = `
        /* Import Google Fonts */
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;700&family=Orbitron:wght@400;700&display=swap');

        /* Spinner Animation for loading state */
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        .spinner {
            border: 4px solid rgba(255, 255, 255, 0.3);
            border-top: 4px solid white;
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

        /* Select Dropdown Focus Effect (small yellow highlight) */
        select:focus {
            outline: none;
            border-color: yellow;
            box-shadow: 0 0 0 3px rgba(255, 255, 0, 0.2);
        }

        /* Option elements styling (not directly controllable across browsers, but good practice) */
        select option {
            background-color: white;
            color: black;
            font-family: 'Manrope', sans-serif;
            padding: 0.5rem; /* Padding for options within the dropdown */
        }
        select option:hover {
            background-color: #f0f0f0; /* Slight highlight on hover for options (browser dependent) */
        }

        /* Button Hover, Active, and Disabled Effects */
        button {
            transition: all 0.3s ease;
        }
        button:not(:disabled):hover {
            background-color: #333;
            color: yellow;
            border-color: yellow;
            transform: translateY(-2px);
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
        }
        button:not(:disabled):active {
            transform: translateY(0);
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
            background-color: #222;
            border-color: yellow;
        }
        button:disabled {
            opacity: 0.6;
            cursor: not-allowed;
            background-color: #555;
            border-color: #555;
            color: #ccc;
            box-shadow: none;
            transform: none;
        }
    `;

    return (
        <div>
            {/* Inject Google Fonts import and CSS animations/pseudo-classes */}
            <style>{animationStyles}</style>

            <NavBar />

            <div style={containerStyle}>
                <h2 style={titleStyle}>Crypto Sentiment Analyzer</h2>
                <select
                    value={symbol}
                    onChange={(e) => setSymbol(e.target.value)}
                    style={selectStyle}
                >
                    {cryptoSymbols.map((s) => (
                        <option key={s} value={s}>
                            {s.toUpperCase()}
                        </option>
                    ))}
                </select>
                <button onClick={analyze} disabled={loading} style={buttonBaseStyle}>
                    {loading && <div className="spinner"></div>}
                    {loading ? "Analyzing..." : "Analyze"}
                </button>

                {error && <p style={errorStyle}>{error}</p>}

                {result && (
                    <div
                        style={resultBoxStyle}
                        className="result-animated"
                    >
                        <p>
                            <strong style={resultLabelStyle}>Symbol:</strong> {result.symbol}
                        </p>
                        <p>
                            <strong style={resultLabelStyle}>Last Price:</strong> ${result.last_price}
                        </p>
                        <p>
                            <strong style={resultLabelStyle}>Previous Close:</strong> ${result.previous_close}
                        </p>
                        <p>
                            <strong style={resultLabelStyle}>Sentiment:</strong>{" "}
                            <span style={sentimentValueStyle(result.sentiment)}>
                                {result.sentiment}
                            </span>
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}