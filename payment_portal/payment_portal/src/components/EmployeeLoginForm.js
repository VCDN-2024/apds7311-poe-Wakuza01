import React, { useState } from 'react';

function EmployeeLoginForm({ onLoginSuccess, onBack }) {
    const [employeeId, setEmployeeId] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();

        if (employeeId === "EMP001" && password === "Password@123") {
            setMessage("Login successful!");
            onLoginSuccess(); 
        } else {
            setMessage("Invalid credentials.");
        }
    };

    return (
        <div>
            <button onClick={onBack} className="back-button">Back</button> {/* Back button */}
            <h2>Employee Login</h2>
            <form onSubmit={handleLogin}>
                <div>
                    <label>Employee ID:</label>
                    <input
                        type="text"
                        value={employeeId}
                        onChange={(e) => setEmployeeId(e.target.value)}
                        required
                        placeholder="Enter your Employee ID"
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
            {message && <p style={{ color: message === "Login successful!" ? 'green' : 'red' }}>{message}</p>}
        </div>
    );
}

export default EmployeeLoginForm;
