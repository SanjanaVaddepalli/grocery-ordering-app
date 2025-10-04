import React from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

const containerStyle = {
  width: "200px",
  height: "150px",
};

const AdminDashboard = () => {
  // Example orders (replace with API data later)
  const orders = [
    {
      
    },
    {
      
    },
  ];

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "YOUR_GOOGLE_MAPS_API_KEY", // 🔑 replace with real API key
  });

  return (
    <div className="admin-dashboard" style={{ padding: "20px" }}>
      <h1>🛒 Admin Dashboard - Orders</h1>
      <table
        className="orders-table"
        style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}
      >
        <thead>
          <tr style={{ background: "#f2f2f2" }}>
            <th style={thStyle}>Order ID</th>
            <th style={thStyle}>Customer</th>
            <th style={thStyle}>Items</th>
            <th style={thStyle}>Total (₹)</th>
            <th style={thStyle}>Address</th>
            <th style={thStyle}>Location</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id} style={{ borderBottom: "1px solid #ddd" }}>
              <td style={tdStyle}>{order.id}</td>
              <td style={tdStyle}>{order.customer}</td>
              <td style={tdStyle}>{order.items}</td>
              <td style={tdStyle}>{order.total}</td>
              <td style={tdStyle}>{order.address}</td>
              <td style={tdStyle}>
                {isLoaded ? (
                  <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={order.location}
                    zoom={12}
                  >
                    <Marker position={order.location} />
                  </GoogleMap>
                ) : (
                  <p>Loading map...</p>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// 🔹 Table cell styles
const thStyle = {
  padding: "10px",
  border: "1px solid #00060cff",
  textAlign: "center",
};

const tdStyle = {
  padding: "10px",
  border: "1px solid #00060cff",
  textAlign: "center",
};

export default AdminDashboard;
