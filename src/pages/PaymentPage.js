import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/PaymentPage.css';

const PaymentPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { cartItems, orderDetails } = location.state || {};
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCVV] = useState('');
  const [error, setError] = useState('');

  const validatePayment = () => {
    if (cardNumber.length !== 12) {
      setError('Card number must be 12 digits');
      return false;
    }
    if (!/^\d{2}\/\d{2}$/.test(expiryDate)) {
      setError('Expiry date must be in MM/YY format');
      return false;
    }
    if (cvv.length !== 3) {
      setError('CVV must be 3 digits');
      return false;
    }
    setError('');
    return true;
  };

  const handlePayment = () => {
    if (validatePayment()) {
      navigate('/summary', { state: { cartItems, orderNumber: orderDetails.id } });
    }
  };

  return (
    <div className="payment-container">
      <h1>Payment</h1>
      {error && <p className="error-message">{error}</p>}
      <div className="payment-form">
        <label>
          Card Number:
          <input
            type="text"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            maxLength="12"
          />
        </label>
        <label>
          Expiry Date (MM/YY):
          <input
            type="text"
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
          />
        </label>
        <label>
          CVV:
          <input
            type="password"
            value={cvv}
            onChange={(e) => setCVV(e.target.value)}
            maxLength="3"
          />
        </label>
        <button onClick={handlePayment}>Pay ₹{orderDetails?.totalValue}</button>
      </div>
    </div>
  );
};

export default PaymentPage;
