// src/Pages/ProductList.jsx
import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import "../index.css";
import allProducts from "../data/allProducts";

const ProductList = () => {
  const { addToCart } = useCart();
  const [category, setCategory] = useState("Fruits"); // ✅ Default to "Fruits" instead of "All"

  // ✅ Flatten products with category info
  const products = Object.entries(allProducts).flatMap(([catName, items]) =>
    items.map((p) => ({ ...p, category: catName }))
  );

  const filteredProducts =
    category === "All"
      ? products
      : products.filter((p) => p.category.toLowerCase() === category.toLowerCase());

  return (
    <div style={{ padding: "20px" }}>
      <h2>Products</h2>

      {/* ✅ Category Filter (centered, removed "All") */}
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        {["Fruits", "Vegetables", "Snacks", "ColdDrinks", "Biscuits", "KitchenMaterial", "Icecream", "Shampoos", "Soaps", "Chocolates"].map(
          (cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              style={{
                margin: "5px",
                backgroundColor: category === cat ? "green" : "darkgreen",
                color: "white",
                padding: "8px 15px",
                borderRadius: "5px",
                border: "none",
                cursor: "pointer",
              }}
            >
              {cat}
            </button>
          )
        )}
      </div>

      {/* ✅ Product Cards */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", justifyContent: "center" }}>
        {filteredProducts.map((p) => (
          <div
            key={`${p.category}-${p.id}`}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              width: "200px",
              textAlign: "center",
            }}
          >
            <img
              src={p.image}
              alt={p.name}
              style={{ width: "100%", height: "120px", objectFit: "cover" }}
            />
            <h4>{p.name}</h4>
            <p>₹{p.price}</p>
            <button
              onClick={() => {
                addToCart(p);
                alert("✅ Your Order Added Successfully to your Cart!");
              }}
              style={{
                backgroundColor: "green",
                color: "white",
                padding: "8px 12px",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
