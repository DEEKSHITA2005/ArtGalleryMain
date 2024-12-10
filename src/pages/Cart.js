import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Cart.css';
import axios from 'axios';
import { init, sendForm } from 'emailjs-com';

const Cart = ({ cartItems, isAuthenticated, userName, email }) => {
  const [images, setImages] = useState({});
  const [loadingImages, setLoadingImages] = useState(false);
  const [loadingOrder, setLoadingOrder] = useState(false);
  const navigate = useNavigate();
  const form = useRef(); // Use this to bind the form for EmailJS

  // Fetch images for cart items
  useEffect(() => {
    const fetchImages = async () => {
      setLoadingImages(true);
      const imagesMap = {};
      try {
        const imagePromises = cartItems.map(async (item) => {
          const response = await fetch(`http://localhost:8081/api/artworks/${item.id}/image`);
          if (response.ok) {
            const blob = await response.blob();
            imagesMap[item.id] = URL.createObjectURL(blob);
          } else {
            console.warn(`Failed to fetch image for item ${item.id}`);
          }
        });
        await Promise.all(imagePromises);
        setImages(imagesMap);
      } catch (error) {
        console.error('Error fetching images:', error);
      } finally {
        setLoadingImages(false);
      }
    };

    if (cartItems.length > 0) {
      fetchImages();
    }
  }, [cartItems]);

  // Calculate cart subtotal
  const calculateSubtotal = () => {
    return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);
  };

  // Handle checkout process
  const handleCheckout = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    const orderData = {
      email,
      username: userName,
      items: cartItems.map((item) => ({
        productId: item.id,
        productName: item.title,
        price: item.price,
        quantity: item.quantity,
      })),
      totalValue: parseFloat(calculateSubtotal()), // Ensure the value is a number
    };

    try {
      setLoadingOrder(true);

      // Save order to the backend
      await axios.post('http://localhost:8084/api/cart', orderData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Generate email content
      const orderDetails = `
        Thank you for your purchase, ${userName}!

        Order Details:
        Order Total: $${calculateSubtotal()}
        Items:
        ${cartItems
          .map(
            (item) =>
              `- ${item.title} | Quantity: ${item.quantity} | Price: $${item.price.toFixed(2)}`
          )
          .join('\n')}

        Your order will be shipped soon!
      `;

      // Send email using EmailJS
      sendForm(
        'service_jo1s7td', // Your EmailJS service ID
        'template_rhxwsdv', // Your EmailJS template ID
        form.current,
        '6t83MR4Ga0yhvW7SJ' // Your EmailJS public key
      )
        .then(() => {
          alert('Order confirmation email sent successfully!');
        })
        .catch((error) => {
          console.error('Failed to send email:', error);
          alert('Failed to send order confirmation email.');
        });

      setLoadingOrder(false);

      // Navigate to the summary page with order details
      navigate('/summary', { state: { cartItems, orderData } });
    } catch (error) {
      setLoadingOrder(false);
      console.error('Error processing checkout:', error);
      alert('Failed to process your order. Please try again later.');
    }
  };

  return (
    <div className="cart-page-container">
      <form ref={form}>
        <div className="cart-items-section">
          <h2>Shopping Cart</h2>
          {cartItems.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <>
              {loadingImages && <p>Loading images...</p>}
              <table className="cart-table">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item) => (
                    <tr key={item.id}>
                      <td className="cart-product-info">
                        <Link to={`/product/${item.id}`}>
                          <img
                            src={images[item.id] || '/placeholder-image.png'}
                            alt={item.title}
                            className="cart-item-image"
                          />
                        </Link>
                        <div className="cart-item-details">
                          <Link to={`/product/${item.id}`}>
                            <h3>{item.title}</h3>
                          </Link>
                          <p>By {item.artist}</p>
                        </div>
                      </td>
                      <td>${item.price.toFixed(2)}</td>
                      <td>{item.quantity}</td>
                      <td>${(item.price * item.quantity).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}
        </div>

        <div className="cart-totals-section">
          <h2>Cart Totals</h2>
          <div className="cart-summary">
            <div className="cart-summary-row">
              <span>Subtotal</span>
              <span>${calculateSubtotal()}</span>
            </div>
            <div className="cart-summary-row">
              <span>Shipping</span>
              <span>Free shipping</span>
            </div>
            <div className="cart-summary-row">
              <span>Total</span>
              <span>${calculateSubtotal()}</span>
            </div>
            <button
              className="checkout-button"
              onClick={handleCheckout}
              disabled={loadingImages || loadingOrder}
            >
              {loadingOrder ? 'Processing...' : 'Proceed to Checkout'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Cart;
