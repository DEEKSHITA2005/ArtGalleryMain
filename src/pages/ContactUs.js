import React, { useRef } from 'react';
import { init, sendForm } from 'emailjs-com';
import '../styles/ContactUs.css'; // Ensure this file contains your CSS for the component

const ContactUs = () => {
  const form = useRef();

  const backgroundImage = process.env.PUBLIC_URL + '/images/artwork1.jpg'; // Dynamic path for the image in the public folder

  const submitHandler = (e) => {
    e.preventDefault();

    sendForm(
      'service_jo1s7td', // Your EmailJS service ID
      'template_rhxwsdv', // Your EmailJS template ID
      form.current,
      '6t83MR4Ga0yhvW7SJ' // Your EmailJS public key
    )
      .then(
        () => {
          console.log('SUCCESS!');
          alert('Message sent successfully!');
        },
        (error) => {
          console.log('FAILED...', error.text);
          alert('Failed to send message. Please try again.');
        }
      );
  };

  return (
    <div
      className="contact-us"
      style={{
        backgroundImage: `url(${backgroundImage})`, // Corrected syntax for background image
        backgroundSize: 'cover', // Ensure the background covers the div
        backgroundPosition: 'center',
      }}
    >
      {/* Contact Info Section */}
      <div className="contact-info">
        <h1>Contact Us</h1>
        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
        <div className="info-box">
          <div className="info-item">
            <i className="fas fa-home"></i>
            <div>
              <h3>Address</h3>
              <p>4671 Sugar Camp Road, Owatonna, Minnesota, 55060</p>
            </div>
          </div>
          <div className="info-item">
            <i className="fas fa-phone"></i>
            <div>
              <h3>Phone</h3>
              <p>571-457-2321</p>
            </div>
          </div>
          <div className="info-item">
            <i className="fas fa-envelope"></i>
            <div>
              <h3>Email</h3>
              <p>ntamerrwael@mfono.ga</p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Form Section */}
      <div className="contact-form">
        <h2>Send Message</h2>
        <form ref={form} onSubmit={submitHandler}>
          <input type="text" name="from_name" placeholder="Full Name" required />
          <input type="email" name="reply_to" placeholder="Email" required />
          <textarea name="message" placeholder="Type your Message..." required></textarea>
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
