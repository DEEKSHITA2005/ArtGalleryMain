import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/SummaryPage.css';

const SummaryPage = ({ orderNumber }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const cartItems = location.state?.cartItems || [];
  const [images, setImages] = useState({}); // Store fetched images

  useEffect(() => {
    const fetchImages = async () => {
      const imagesMap = {};
      for (const item of cartItems) {
        try {
          const response = await fetch(`http://localhost:8081/api/artworks/${item.id}/image`);
          if (response.ok) {
            const blob = await response.blob();
            imagesMap[item.id] = URL.createObjectURL(blob); // Convert blob to object URL
          } else {
            console.error(`Failed to fetch image for artwork ID: ${item.id}`);
          }
        } catch (error) {
          console.error(`Error fetching image for artwork ID: ${item.id}`, error);
        }
      }
      setImages(imagesMap); // Set all fetched images
    };

    if (cartItems.length > 0) {
      fetchImages();
    }
  }, [cartItems]);

  const calculateTotal = () => {
    return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);
  };

  return (
    <div className="summary-container">
      <div className="summary-card">
        <div className="success-icon">✔</div>
        <h1>Thank you for your purchase</h1>
        <p>
          We've received your order and it will ship in 5-7 business days. <br />
          Your order number is <strong>#{orderNumber}</strong>
        </p>

        <div className="order-summary">
          <h2>Order Summary</h2>
          <table>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.id}>
                  <td>
                    <img
                      src={images[item.id] || '/placeholder-image.png'} // Use fetched image or fallback
                      alt={item.title}
                      className="summary-item-image"
                    />
                  </td>
                  <td>
                    <p>{item.title}</p>
                  </td>
                  <td>₹ {item.price.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="summary-total">
            <p>Total</p>
            <p>₹ {calculateTotal()}</p>
          </div>
        </div>
        <button className="back-home-button" onClick={() => navigate('/')}>
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default SummaryPage;
