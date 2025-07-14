import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useFetchProductByIdQuery, useUpdateProductMutation } from '../../../../redux/features/products/productsApi';
import { useSelector } from 'react-redux';
import Alert from '../../../../components/Alert';
import Spinner from '../../../../components/Spinner';
import TextInput from '../addProduct/Textinput';
import SelectInput from '../addProduct/SelectInput';
import UploadImage from '../addProduct/UploadImage';

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

const sizeOptions = ["XS", "S", "M", "L", "XL", "XXL"]; // Size options

const UpdateProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const [product, setProduct] = useState({
    name: '',
    category: '',
    color: '',
    description: '',
    image: '',
    price: '',
    sizes: [], // add sizes here
  });

  const [newImage, setNewImage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const {
    data: ProductData,
    isLoading: isProductLoading,
    error: fetchError,
    refetch
  } = useFetchProductByIdQuery(id);

  const [updateProduct, { isLoading, error: updateError }] = useUpdateProductMutation();

  useEffect(() => {
    if (ProductData) {
      const { name, category, color, description, image: imageURL, price, sizes } = ProductData.product;
      setProduct({
        name: name || '',
        category: category || '',
        color: color || '',
        description: description || '',
        image: imageURL || '',
        price: price || '',
        sizes: sizes || [],  // initialize sizes
      });
    }
  }, [ProductData]);

  const handleChange = (e) => {
    setProduct((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // New handler for size checkbox changes
  const handleSizeChange = (e) => {
    const size = e.target.value;
    const checked = e.target.checked;
    setProduct((prev) => {
      if (checked) {
        // add size
        return { ...prev, sizes: [...prev.sizes, size] };
      } else {
        // remove size
        return { ...prev, sizes: prev.sizes.filter(s => s !== size) };
      }
    });
  };

  const handleImageChange = (image) => {
    setNewImage(image);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedProduct = {
      ...product,
      image: newImage ? newImage : product.image,
      auther: user?.id,
    };

    try {
      await updateProduct({ id: id, ...updatedProduct }).unwrap();
      setSuccessMessage("Product updated successfully!");
      await refetch();
      setTimeout(() => {
        navigate('/dashboard/manage-products');
      }, 1500);
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  if (isProductLoading) return <div><Spinner /></div>;
  if (fetchError) return <div>Error fetching product: {fetchError.message}</div>;
  if (isLoading) return <div>Updating product...</div>;

  return (
    <div className='mx-auto max-w-[1400px] px-4 py-20'>
      <h2 className='mb-6 text-2xl font-bold'>Update Product</h2>

      {successMessage && (
        <Alert type="success" message={successMessage} />
      )}

      {updateError && (
        <Alert type="error" message="Failed to update product. Please try again." />
      )}

      <form onSubmit={handleSubmit} className='space-y-4'>
        <TextInput
          label="Product Name"
          name="name"
          value={product.name}
          onChange={handleChange}
          type="text"
        />

        <SelectInput
          label="Category"
          name="category"
          value={product.category}
          onChange={handleChange}
          options={categories}
        />

        <SelectInput
          label="Color"
          name="color"
          value={product.color}
          onChange={handleChange}
          options={colors}
        />

        <TextInput
          label="Price"
          name="price"
          value={product.price}
          onChange={handleChange}
          type="number"
        />

        {/* Sizes checkboxes */}
        <div>
          <label className="block text-sm font-medium">Sizes</label>
          <div className="mt-2 flex flex-wrap gap-4">
            {sizeOptions.map((size) => (
              <label key={size} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  value={size}
                  checked={product.sizes.includes(size)}
                  onChange={handleSizeChange}
                  className="h-4 w-4"
                />
                <span>{size}</span>
              </label>
            ))}
          </div>
        </div>

        <UploadImage name="image" setImage={handleImageChange} />

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={product.description}
            onChange={handleChange}
            rows="4"
            className="mt-1 block w-full rounded-md bg-gray-100 py-2.5 px-4 shadow-sm border border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
          />
        </div>

        <button
          type='submit'
          disabled={isLoading}
          className='mt-5 inline-flex items-center justify-center rounded-md bg-primary py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-60'
        >
          {isLoading ? "Updating…" : "Update Product"}
        </button>
      </form>
    </div>
  );
};

export default UpdateProduct;
