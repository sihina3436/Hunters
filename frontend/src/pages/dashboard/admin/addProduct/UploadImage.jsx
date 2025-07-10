// UploadImage.jsx
import React, { useRef, useState, useEffect, useCallback } from "react";
import axios from "axios";
import Spinner from "../../../../components/Spinner";
import { getBaseURL } from "../../../../utils/baseURL";

/*
  Props
  ────────────────────────────────────────
  name       : HTML name/id for the <input>
  setImage   : (url: string) → void   ← lift the uploaded URL up to parent
*/
const UploadImage = ({ name = "productImage", setImage }) => {
  const inputRef = useRef(null);          // to trigger the hidden input programmatically
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);   // local <img> preview

  /* ───────── File selection / upload ───────── */
  const uploadFile = useCallback(async (file) => {
    if (!file) return;

    // 1️⃣  Local preview
    const localURL = URL.createObjectURL(file);
    setPreview(localURL);

    // 2️⃣  Prepare form data
    const formData = new FormData();
    formData.append("image", file);

    try {
      setLoading(true);

      // 3️⃣  POST multipart/form‑data
      const { data } = await axios.post(
        `${getBaseURL()}/uploadImage`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      // 4️⃣  Handle response shape { url: "…" } OR "…"
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

  /* ───────── Drag‑and‑drop support ───────── */
  const handleDrop   = (e) => {
    e.preventDefault();
    uploadFile(e.dataTransfer.files?.[0]);
  };

  const handleDragOver = (e) => e.preventDefault();

  /* ───────── Cleanup preview URL on unmount / new file ───────── */
  useEffect(() => {
    return () => preview && URL.revokeObjectURL(preview);
  }, [preview]);

  /* ───────── UI ───────── */
  return (
    <div className="space-y-2">
      {/* field label */}
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        Product image
      </label>

      {/* drop‑zone (click + drag‑drop) */}
      <div
        role="button"
        tabIndex={0}
        onClick={() => inputRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className="group flex h-44 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-indigo-300 bg-indigo-50/40 text-indigo-500 transition hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        <i className="ri-image-line ri-2x text-indigo-400 transition-transform group-hover:scale-110" />
        <span className="mt-2 text-sm font-semibold tracking-wide text-indigo-600">
          Click or drop an image
        </span>

        {/* hidden native file input */}
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

      {/* loading indicator */}
      {loading && (
        <div className="flex items-center gap-2">
          <Spinner />
          <span className="text-sm text-indigo-600">Uploading…</span>
        </div>
      )}

      {/* image preview + remove */}
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
