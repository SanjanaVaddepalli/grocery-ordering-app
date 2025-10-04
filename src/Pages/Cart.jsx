import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "300px",
};

const defaultCenter = {
  lat: 28.6139, // Default: New Delhi
  lng: 77.209, 
};

const Cart = () => {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const [address, setAddress] = useState("");
  const [location, setLocation] = useState(defaultCenter);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "YOUR_GOOGLE_MAPS_API_KEY", // 🔑 replace with your API key
  });

  const total = cart.reduce(
    (sum, item) => sum + Number(item.price) * item.quantity,
    0
  );

  const placeOrder = () => {
    if (!address && !location) {
      alert("⚠️ Please enter address or select a location on map.");
      return;
    }

    // Example order data
    const orderData = {
      items: cart,
      total: total,
      deliveryAddress: address,
      latitude: location.lat,
      longitude: location.lng,
    };

    console.log("Order placed:", orderData);
    alert("✅ Order Placed Successfully!\nCheck console for details.");
  };

  return (
    <div style={{ padding: "20px", paddingBottom: "120px" }}>
      <h2>🛒 Checkout</h2>

      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          {cart.map((item) => (
            <div
              key={item.id}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                borderBottom: "1px solid #ddd",
                padding: "10px 0",
              }}
            >
              {/* Product image */}
              <img
                src={item.image}
                alt={item.name}
                style={{ width: "60px", height: "60px", borderRadius: "8px" }}
              />

              {/* Name + weight */}
              <div style={{ flex: 1, marginLeft: "15px" }}>
                <h4 style={{ margin: "0 0 5px 0" }}>{item.name}</h4>
                <p style={{ margin: 0, fontSize: "14px", color: "#555" }}>
                  {item.weight}
                </p>
              </div>

              {/* Quantity controls */}
              <div style={{ display: "flex", alignItems: "center" }}>
                <button
                  onClick={() =>
                    updateQuantity(item.id, Math.max(1, item.quantity - 1))
                  }
                  style={btnStyle}
                >
                  -
                </button>
                <span style={{ margin: "0 10px" }}>{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  style={btnStyle}
                >
                  +
                </button>
              </div>

              {/* Price */}
              <p style={{ width: "60px", textAlign: "right", margin: 0 }}>
                ₹{Number(item.price) * item.quantity}
              </p>

              {/* Remove button */}
              <button
                onClick={() => removeFromCart(item.id)}
                style={{
                  marginLeft: "10px",
                  background: "red",
                  color: "white",
                  border: "none",
                  padding: "6px 10px",
                  cursor: "pointer",
                  borderRadius: "4px",
                }}
              >
                🗑️
              </button>
            </div>
          ))}

          {/* Address Input */}
          <div style={{ marginTop: "20px" }}>
            <label style={{ fontWeight: "bold" }}>Delivery Address:</label>
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter your delivery address"
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "6px",
                border: "1px solid #ccc",
                marginTop: "5px",
              }}
            />
          </div>

          {/* Google Map */}
          <div style={{ marginTop: "20px" }}>
            <h4>Select Location on Map</h4>
            {isLoaded && (
              <GoogleMap
                mapContainerStyle={containerStyle}
                center={location}
                zoom={12}
                onClick={(e) =>
                  setLocation({ lat: e.latLng.lat(), lng: e.latLng.lng() })
                }
              >
                <Marker position={location} />
              </GoogleMap>
            )}
          </div>

          {/* Fixed bottom bar */}
          <div style={bottomBarStyle}>
            <div>
              <p style={{ margin: 0, fontSize: "14px", color: "#555" }}>
                TOTAL
              </p>
              <h3 style={{ margin: 0 }}>₹{total}</h3>
            </div>

            <button style={placeOrderBtn} onClick={placeOrder}>
              Place Order →
            </button>
          </div>
        </>
      )}
    </div>
  );
};

// 🔹 Button Style
const btnStyle = {
  background: "#028427",
  color: "white",
  border: "none",
  padding: "5px 10px",
  cursor: "pointer",
  borderRadius: "4px",
};

// 🔹 Bottom Bar Style
const bottomBarStyle = {
  position: "fixed",
  bottom: 0,
  left: 0,
  width: "100%",
  background: "#fff",
  borderTop: "1px solid #ddd",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "15px 20px",
  boxShadow: "0 -2px 5px rgba(0,0,0,0.1)",
};

// 🔹 Place Order Button
const placeOrderBtn = {
  background: "green",
  color: "white",
  border: "none",
  padding: "12px 25px",
  borderRadius: "5px",
  fontSize: "16px",
  cursor: "pointer",
};

export default Cart;
