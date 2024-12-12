import React, { useState } from 'react';
import EmployeeLoginForm from './components/EmployeeLoginForm';
import LoginForm from './components/LoginForm';
import TransactionManagement from './components/TransactionManagement';
import PaymentForm from './components/PaymentForm';
import './App.css';

function App() {
  const [view, setView] = useState('landing');

  const onEmployeeLoginSuccess = () => {
    setView('transaction'); 
  };

  const onCustomerLoginSuccess = () => {
    setView('payment'); 
  };

  const showEmployeeLogin = () => setView('employee');
  const showLoginForm = () => setView('customer');

  // Function to navigate back to the landing view
  const goBackToLanding = () => setView('landing');

  return (
    <div className="App">
      <h1>International Payment Portal</h1>
      {view === 'landing' && (
        <div>
          <button onClick={showEmployeeLogin}>Employee</button>
          <button onClick={showLoginForm}>Customer</button>
        </div>
      )}
      {view === 'employee' && (
        <EmployeeLoginForm onLoginSuccess={onEmployeeLoginSuccess} onBack={goBackToLanding} />
      )}
      {view === 'customer' && (
        <LoginForm onLoginSuccess={onCustomerLoginSuccess} onBack={goBackToLanding} />
      )}
      {view === 'transaction' && (
        <TransactionManagement onBack={goBackToLanding} />
      )} {/* Pass onBack to TransactionManagement */}
      {view === 'payment' && <PaymentForm />}
    </div>
  );
}

export default App;
