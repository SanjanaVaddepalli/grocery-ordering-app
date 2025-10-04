// src/pages/Categories.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const Categories = () => {
  const navigate = useNavigate();

  const categories = [
    { id: "fruits", name: "Fruits", imageUrl: "https://via.placeholder.com/100?text=Fruits" },
    { id: "vegetables", name: "Vegetables", imageUrl: "https://via.placeholder.com/100?text=Vegetables" },
    { id: "dairy", name: "Dairy", imageUrl: "https://via.placeholder.com/100?text=Dairy" },
    { id: "snacks", name: "Snacks", imageUrl: "https://via.placeholder.com/100?text=Snacks" },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-center mb-6">Categories</h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {categories.map((cat) => (
          <div
            key={cat.id}
            onClick={() => navigate(`/products/${cat.id}`)}
            className="cursor-pointer border rounded-lg shadow hover:shadow-lg p-4 flex flex-col items-center"
          >
            <img src={cat.imageUrl} alt={cat.name} className="w-20 h-20 object-cover mb-3" />
            <h2 className="text-lg font-semibold">{cat.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
