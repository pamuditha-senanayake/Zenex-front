import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css'; // Don't forget to import the CSS file!

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await axios.post(
                `${process.env.REACT_APP_API_URL}/login`,
                { username, password },
                { withCredentials: true }
            );
            // alert('Login successful!');
            navigate('/home');
        } catch (error) {
            // Check if error.response exists and has data/error message
            alert(error.response?.data?.error || 'Login failed. Please try again.');
        }
    };

    return (
        <div className="login-page-container"> {/* Main container for centering and background */}
            <form onSubmit={handleLogin} className="login-form">
                <h2>Welcome Back!</h2> {/* Changed title for a warmer feel */}

                <div className="input-group">
                    <input
                        type="text" // Explicitly set type to text
                        placeholder="Username"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        required
                    />
                </div>

                <div className="input-group">
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                    />
                </div>

                <button type="submit" className="login-button">
                    Login
                </button>

                {/*<p className="register-text">*/}
                {/*    Don't have an account? <Link to="/register" className="register-link">Register here</Link>*/}
                {/*</p>*/}
            </form>
        </div>
    );
}

export default Login;