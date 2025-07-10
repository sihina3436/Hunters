
import React, { useRef, useState, useEffect, useCallback } from "react";
import axios from "axios";
import { getBaseURL } from "../../../../utils/baseURL";


const UploadImage = ({ name = "productImage", setImage }) => {
  const inputRef = useRef(null);          
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);   

  
  const uploadFile = useCallback(async (file) => {
    if (!file) return;

 
    const localURL = URL.createObjectURL(file);
    setPreview(localURL);

  
    const formData = new FormData();
    formData.append("image", file);

    try {
      setLoading(true);

     
      const { data } = await axios.post(
        `${getBaseURL()}/uploadImage`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      
      const imageUrl = data?.url ?? data;
      setImage(imageUrl);
    } catch (err) {
      console.error("Error uploading image:", err);
      alert("Image upload failed. Please try again.");
      setPreview(null);
    } finally {
      setLoading(false);
    }
  }, [setImage]);

  const handleChange = (e) => uploadFile(e.target.files?.[0]);


  const handleDrop   = (e) => {
    e.preventDefault();
    uploadFile(e.dataTransfer.files?.[0]);
  };

  const handleDragOver = (e) => e.preventDefault();

 
  useEffect(() => {
    return () => preview && URL.revokeObjectURL(preview);
  }, [preview]);


  return (
    <div className="space-y-2">
    
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        Product image
      </label>

     
      <div
        role="button"
        tabIndex={0}
        onClick={() => inputRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className="group flex h-44 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-100 text-primary transition hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary"
      >
        <i className="ri-image-line ri-2x text-gray-500  transition-transform group-hover:scale-110" />
        <span className="mt-2 text-sm font-semibold tracking-wide text-gray-500 ">
          Click or drop an image
        </span>

        
        <input
          ref={inputRef}
          id={name}
          name={name}
          type="file"
          accept="image/*"
          className="sr-only"
          onChange={handleChange}
        />
      </div>

    
      {loading && (
        <div className="flex items-center gap-2">
          <span className="text-sm text-primary">Uploading…</span>
        </div>
      )}

     
      {preview && !loading && (
        <div className="relative h-44 w-44">
          <img
            src={preview}
            alt="Preview"
            className="h-full w-full rounded-lg object-cover shadow"
          />
          <button
            type="button"
            aria-label="Remove image"
            onClick={() => {
              setPreview(null);
              setImage(null);
              inputRef.current.value = "";
            }}
            className="absolute top-1 right-1 rounded-full bg-white/80 p-1 backdrop-blur hover:bg-white"
          >
            <i className="ri-close-line text-gray-600" />
          </button>
        </div>
      )}
    </div>
  );
};

export default UploadImage;
