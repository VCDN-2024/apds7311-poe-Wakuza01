import React, { useState } from 'react';

function LoginForm({ onLoginSuccess, onBack }) {
    const [idNumber, setIdNumber] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();

        const dummyIdNumber = '1234567890123';
        const dummyPassword = 'Test@1234';

        if (idNumber === dummyIdNumber && password === dummyPassword) {
            setMessage("Login successful!");
            onLoginSuccess();
        } else {
            setMessage("Invalid credentials.");
        }
    };

    return (
        <div>
            <button onClick={onBack} className="back-button">Back</button> {/* Back button */}
            <h2>Customer Login</h2>
            <form onSubmit={handleLogin}>
                <div>
                    <label>ID Number:</label>
                    <input
                        type="text"
                        value={idNumber}
                        onChange={(e) => setIdNumber(e.target.value)}
                        required
                        placeholder="Enter your 13-digit ID number"
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        placeholder="Enter your password"
                    />
                </div>
                <button type="submit">Login</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}

export default LoginForm;
