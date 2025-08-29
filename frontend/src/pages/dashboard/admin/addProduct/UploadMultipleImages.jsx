import React, { useRef, useState } from "react";
import axios from "axios";
import { getBaseURL } from "../../../../utils/baseURL";

const UploadMultipleImages = ({ setImages }) => {
  const inputRef = useRef(null);
  const [previews, setPreviews] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    // Append new previews to existing previews
    setPreviews((prev) => [...prev, ...files.map(file => URL.createObjectURL(file))]);

    const formData = new FormData();
    files.forEach(file => formData.append("images", file));

    try {
      setLoading(true);
      const { data } = await axios.post(
        `${getBaseURL()}/uploadMultipleImages`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      // Append new uploaded image URLs to existing images array
      setImages((prev) => [...prev, ...data.urls]);
    } catch (err) {
      console.error("Error uploading images:", err);
      alert("Image upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium">Product Images</label>

      <div
        role="button"
        tabIndex={0}
        onClick={() => inputRef.current?.click()}
        className="group flex h-44 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-100 text-primary transition hover:bg-gray-100"
      >
        <i className="ri-image-add-line ri-2x text-gray-500 group-hover:scale-110" />
        <span className="mt-2 text-sm text-gray-500">Click or drop images</span>
        <input
          ref={inputRef}
          type="file"
          multiple
          accept="image/*"
          onChange={handleChange}
          className="sr-only"
        />
      </div>

      {loading && <p className="text-primary">Uploading…</p>}

      <div className="flex gap-2 mt-2 flex-wrap">
        {previews.map((src, idx) => (
          <img
            key={idx}
            src={src}
            alt={`preview-${idx}`}
            className="h-20 w-20 object-cover rounded"
          />
        ))}
      </div>
    </div>
  );
};

export default UploadMultipleImages;
