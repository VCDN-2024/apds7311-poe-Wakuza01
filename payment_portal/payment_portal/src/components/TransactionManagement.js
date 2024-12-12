import React, { useEffect, useState } from 'react';
import axios from 'axios';

function TransactionManagement({ onBack }) { // Accept onBack as a prop
  const [transactions, setTransactions] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Fetch pending transactions
    const fetchTransactions = async () => {
      try {
        const response = await axios.get('/api/transactions/pending');
        setTransactions(response.data);
      } catch (error) {
        setMessage("Error fetching transactions.");
      }
    };
    fetchTransactions();
  }, []);

  const verifyTransaction = async (transactionId) => {
    try {
      await axios.post(`/api/transactions/${transactionId}/verify`);
      setTransactions(transactions.map(t => 
        t._id === transactionId ? { ...t, status: 'verified' } : t
      ));
    } catch (error) {
      setMessage("Error verifying transaction.");
    }
  };

  const forwardToSWIFT = async () => {
    try {
      await axios.post('/api/transactions/forward');
      setMessage("Transactions forwarded to SWIFT.");
      setTransactions([]);
    } catch (error) {
      setMessage("Error forwarding transactions to SWIFT.");
    }
  };

  return (
    <div>
      <button onClick={onBack} className="back-button">Back</button> {/* Back button */}
      <h2>Pending Transactions</h2>
      {message && <p>{message}</p>}
      <ul>
        {transactions.map(transaction => (
          <li key={transaction._id}>
            {transaction.customerId} - {transaction.amount} {transaction.currency} - {transaction.swiftCode}
            {transaction.status === 'pending' && (
              <button onClick={() => verifyTransaction(transaction._id)}>Verify</button>
            )}
          </li>
        ))}
      </ul>
      <button onClick={forwardToSWIFT}>Submit to SWIFT</button>
    </div>
  );
}

export default TransactionManagement;
