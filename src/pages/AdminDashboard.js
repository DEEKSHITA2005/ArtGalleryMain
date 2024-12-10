import React, { useState, useEffect } from "react";
import "../styles/AdminDashboard.css";
import axios from "axios";

const AdminDashboard = () => {
  const [dashboardStats, setDashboardStats] = useState([
    {
      id: 1,
      title: "Manage Users",
      value: 0,
      color: "#00bcd4",
      api: "http://localhost:8080/api/users", // Correct API URL for users
      details: [],
    },
    {
      id: 2,
      title: "Manage Artworks",
      value: 0,
      color: "#673ab7",
      api: "http://localhost:8081/api/artworks", // Correct API URL for artworks
      details: [],
    },
    {
      id: 3,
      title: "Total Revenue",
      value: 0,
      color: "#4caf50",
      api: "http://localhost:8084/api/cart", // Backend API for total cart items
      details: [],
    },
    {
      id: 4,
      title: "Total Orders",
      value: 0,
      color: "red",
      api: "http://localhost:8081/api/artworks", // Backend API for total cart items
      details: [],
    },
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState({ title: "", details: [] });

  // Fetch data for all dashboard stats on mount
  useEffect(() => {
    const fetchData = async () => {
      const updatedStats = await Promise.all(
        dashboardStats.map(async (stat) => {
          try {
            const response = await axios.get(stat.api);
            return {
              ...stat,
              value: response.data.total || response.data.length || 0, // Use total or array length
              details: Array.isArray(response.data) ? response.data : response.data.items || [], // Ensure details is always an array
            };
          } catch (error) {
            console.error(`Error fetching data for ${stat.title}:`, error);
            return { ...stat, value: 0, details: [] }; // Fallback in case of an error
          }
        })
      );
      setDashboardStats(updatedStats);
    };

    fetchData();
  }, []);

  // Handle delete user
  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:8080/api/users/${userId}`);
      const updatedStats = [...dashboardStats];
      updatedStats[0].details = updatedStats[0].details.filter(
        (user) => user.id !== userId
      );
      setDashboardStats(updatedStats);
      console.log(`User with id ${userId} deleted successfully.`);
    } catch (error) {
      console.error(`Error deleting user with id ${userId}:`, error);
    }
  };

  // Handle delete artwork
  const handleDeleteArtwork = async (artworkId) => {
    try {
      await axios.delete(`http://localhost:8081/api/artworks/${artworkId}`);
      const updatedStats = [...dashboardStats];
      updatedStats[1].details = updatedStats[1].details.filter(
        (artwork) => artwork.id !== artworkId
      );
      setDashboardStats(updatedStats);
      console.log(`Artwork with id ${artworkId} deleted successfully.`);
    } catch (error) {
      console.error(`Error deleting artwork with id ${artworkId}:`, error);
    }
  };

  // Handle delete cart item
  const handleDeleteCartItem = async (itemId) => {
    try {
      await axios.delete(`http://localhost:8084/api/cart/${itemId}`);
      const updatedStats = [...dashboardStats];
      updatedStats[2].details = updatedStats[2].details.filter(
        (item) => item.id !== itemId
      );
      setDashboardStats(updatedStats);
      console.log(`Cart item with id ${itemId} deleted successfully.`);
    } catch (error) {
      console.error(`Error deleting cart item with id ${itemId}:`, error);
    }
  };

  const handleMoreInfo = (stat) => {
    setModalData({
      title: stat.title,
      details: stat.details,
    });
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="admin-dashboard">
      <div className="dashboard-content">
        <h2 className="dashboard-title">
          Dashboard <span className="control-panel">Control Panel</span>
        </h2>
        <div className="stats-grid">
          {dashboardStats.map((stat) => (
            <div
              key={stat.id}
              className="stat-card"
              style={{ backgroundColor: stat.color }}
            >
              <div className="stat-value">{stat.value}</div>
              <div className="stat-title">{stat.title}</div>
              <button
                className="more-info-btn"
                onClick={() => handleMoreInfo(stat)}
              >
                More info
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Modal for detailed data */}
      {modalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>{modalData.title} - Detailed Info</h2>
            <table className="details-table">
              <thead>
                <tr>
                  <th>ID</th>
                  {modalData.title === "Manage Users" && (
                    <>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Role</th>
                      <th>Actions</th>
                    </>
                  )}
                  {modalData.title === "Manage Artworks" && (
                    <>
                      <th>Title</th>
                      <th>Artist</th>
                      <th>Price</th>
                      <th>Actions</th>
                    </>
                  )}
                  {(modalData.title === "Total Cart Items" ||
                    modalData.title === "Total Cart Cost") && (
                    <>
                      <th>Product Name</th>
                      <th>Quantity</th>
                      <th>Price</th>
                      <th>Total</th>
                      <th>Actions</th>
                    </>
                  )}
                </tr>
              </thead>
              <tbody>
                {/* Users Data */}
                {modalData.title === "Manage Users" &&
                  modalData.details.map((user) => (
                    <tr key={user.id}>
                      <td>{user.id}</td>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.role}</td>
                      <td>
                        <button
                          className="delete-btn"
                          onClick={() => handleDeleteUser(user.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}

                {/* Artworks Data */}
                {modalData.title === "Manage Artworks" &&
                  modalData.details.map((artwork) => (
                    <tr key={artwork.id}>
                      <td>{artwork.id}</td>
                      <td>{artwork.title}</td>
                      <td>{artwork.artist}</td>
                      <td>{artwork.price}</td>
                      <td>
                        <button
                          className="delete-btn"
                          onClick={() => handleDeleteArtwork(artwork.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}

                {/* Cart Data */}
                {(modalData.title === "Total Cart Items" ||
                  modalData.title === "Total Cart Cost") &&
                  modalData.details.map((item) => (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.productName}</td>
                      <td>{item.quantity}</td>
                      <td>{item.price}</td>
                      <td>{item.quantity * item.price}</td>
                      <td>
                        <button
                          className="delete-btn"
                          onClick={() => handleDeleteCartItem(item.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            <button className="close-btn" onClick={handleCloseModal}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
