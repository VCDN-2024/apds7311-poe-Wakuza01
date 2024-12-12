import React, { useState } from 'react';
import './PaymentForm.css'; 

const PaymentForm = () => {
  const [formData, setFormData] = useState({
    amount: '',
    currency: 'USD',
    provider: 'SWIFT',
    recipientAccount: '',
    swiftCode: ''
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await makePayment(formData);
    if (response.success) {
      setError(null);
      console.log("Payment successful");
     
    } else {
      setError("Payment failed. Please try again.");
    }
  };

  const makePayment = async (data) => {
    try {
      const response = await fetch('/api/payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      return await response.json();
    } catch (error) {
      console.error("Error processing payment:", error);
      return { success: false };
    }
  };

  return (
    <div className="wrapper">
      <div className="payment">
        <h2>Payment Form</h2>
        <form onSubmit={handleSubmit}>
          <div className="form">
            <div className="card">
              <label className="label">Amount:</label>
              <input
                type="number"
                name="amount"
                className="input"
                placeholder="Amount"
                onChange={handleChange}
                required
              />
            </div>
            <div className="card">
              <label className="label">Currency:</label>
              <select name="currency" className="input" onChange={handleChange} required>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
              </select>
            </div>
            <div className="card">
              <label className="label">Provider:</label>
              <select name="provider" className="input" onChange={handleChange} required>
                <option value="SWIFT">SWIFT</option>
              
              </select>
            </div>
            <div className="card">
              <label className="label">Recipient Account:</label>
              <input
                type="text"
                name="recipientAccount"
                className="input"
                placeholder="Recipient Account"
                onChange={handleChange}
                required
              />
            </div>
            <div className="card">
              <label className="label">SWIFT Code:</label>
              <input
                type="text"
                name="swiftCode"
                className="input"
                placeholder="SWIFT Code"
                onChange={handleChange}
                required
              />
            </div>
            <div className="btn">
              <button type="submit">Pay Now</button>
            </div>
            {error && <p className="error">{error}</p>}
          </div>
        </form>
      </div>
    </div>
  );
};

export default PaymentForm;
