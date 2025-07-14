import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Textinput from "./Textinput";
import SelectInput from "./SelectInput";
import UploadImage from "./UploadImage";
import { useAddProductMutation } from "../../../../redux/features/products/productsApi";

// ─────────────────────────────────  constants
const categories = [
  { label: "All", value: "all" },
  { label: "Accessories", value: "accessories" },
  { label: "Dress", value: "dress" },
  { label: "Jewellery", value: "jewellery" },
  { label: "Cosmetics", value: "cosmetics" },
  { label: "Skin Care", value: "skin‑care" },
];

const colors = [
  { label: "All", value: "all" },
  { label: "Black", value: "black" },
  { label: "White", value: "white" },
  { label: "Red", value: "red" },
  { label: "Blue", value: "blue" },
  { label: "Gold", value: "gold" },
  { label: "Silver", value: "silver" },
  { label: "Green", value: "green" },
  { label: "Beige", value: "beige" },
];

const sizeOptions = ["XS", "S", "M", "L", "XL", "XXL"]; // ✅ Added size options

const AddProduct = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    category: "",
    color: "",
    price: "",
    description: "",
    sizes: [], // ✅ Added sizes field to form
  });

  const [image, setImage] = useState("");
  const [addProduct, { isLoading }] = useAddProductMutation();

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSizeChange = (e) => {
    const size = e.target.value;
    const isChecked = e.target.checked;
    setForm((prev) => ({
      ...prev,
      sizes: isChecked
        ? [...prev.sizes, size]
        : prev.sizes.filter((s) => s !== size),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.category || !form.color || !form.price || !image) {
      alert("Please fill all fields (including an image).");
      return;
    }

    try {
      await addProduct({ ...form, image, author: user?._id }).unwrap();
      alert("Product added successfully 🎉");
      setForm({
        name: "",
        category: "",
        color: "",
        price: "",
        description: "",
        sizes: [],
      });
      setImage("");
      navigate("/shop");
    } catch (err) {
      console.error("Error adding product:", err);
      alert("Failed to add product. Please try again.");
    }
  };

  return (
    <div className="mx-auto max-w-[1400px] px-4 py-20">
      <h2 className="mb-6 text-2xl font-bold">Add New Product</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Textinput
          label="Product Name"
          name="name"
          value={form.name}
          onChange={handleChange}
          type="text"
          placeholder="Enter product name"
          icon="ri-shopping-bag-fill"
        />

        <SelectInput
          label="Category"
          name="category"
          value={form.category}
          onChange={handleChange}
          options={categories}
        />

        <SelectInput
          label="Colors"
          name="color"
          value={form.color}
          onChange={handleChange}
          options={colors}
        />

        <Textinput
          label="Price"
          name="price"
          value={form.price}
          onChange={handleChange}
          type="number"
          placeholder="LKR 500"
          icon="ri-price-tag-2-fill"
        />

        {/* 🔥 Sizes Checkboxes */}
        <div>
          <label className="block text-sm font-medium">Sizes</label>
          <div className="mt-2 flex flex-wrap gap-4">
            {sizeOptions.map((size) => (
              <label key={size} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  value={size}
                  checked={form.sizes.includes(size)}
                  onChange={handleSizeChange}
                  className="h-4 w-4"
                />
                <span>{size}</span>
              </label>
            ))}
          </div>
        </div>

        <UploadImage name="image" setImage={setImage} />

        <div>
          <label htmlFor="description" className="block text-sm font-medium">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={form.description}
            onChange={handleChange}
            rows="4"
            className="mt-1 block w-full rounded-md bg-gray-100 py-2.5 px-4 shadow-sm border border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
            placeholder="Enter product description"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="mt-5 inline-flex items-center justify-center rounded-md bg-primary py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-60"
        >
          {isLoading ? "Submitting…" : "Add Product"}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
