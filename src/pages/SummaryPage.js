import React, { useEffect, useState, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/SummaryPage.css';

const SummaryPage = ({ orderNumber }) => {
  const location = useLocation();
  const navigate = useNavigate();

  // Memoize cartItems to prevent unnecessary recomputations and dependency issues
  const cartItems = useMemo(() => location.state?.cartItems || [], [location.state]);
  const [images, setImages] = useState({}); // Store fetched images

  useEffect(() => {
    const fetchImages = async () => {
      const imagesMap = {};
      for (const item of cartItems) {
        try {
          const response = await fetch(`artsbackend.railway.internal/api/artworks/${item.id}/image`);
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
  }, [cartItems]); // Depend on memoized cartItems

  // Calculate the total price of all items in the cart
  const calculateTotal = () => {
    return cartItems
      .reduce((acc, item) => acc + item.price * item.quantity, 0)
      .toFixed(2);
  };

  // Handle case where there are no items in the cart
  if (cartItems.length === 0) {
    return (
      <div className="summary-container">
        <div className="summary-card">
          <h1>No Items in Order</h1>
          <p>Please add items to your cart and complete an order to see a summary.</p>
          <button className="back-home-button" onClick={() => navigate('/')}>
            Back to Home
          </button>
        </div>
      </div>
    );
  }

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
            <thead>
              <tr>
                <th>Product</th>
                <th>Title</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
              </tr>
            </thead>
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
                  <td>{item.title}</td>
                  <td>₹ {item.price.toFixed(2)}</td>
                  <td>{item.quantity}</td>
                  <td>₹ {(item.price * item.quantity).toFixed(2)}</td>
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
