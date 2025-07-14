import React, { useState } from 'react';
import { useDeleteProductMutation, useFetchAllProductsQuery } from '../../../../redux/features/products/productsApi';
import Spinner from '../../../../components/Spinner';
import { formatDate } from '../../../../utils/formateDate';
import { Link } from 'react-router-dom';

const ManageProducts = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(12);
  const { data: { products = [], totalPages, totalProducts } = {}, isLoading, error, refetch } =
    useFetchAllProductsQuery({
      category: '',
      color: '',
      minPrice: '',
      maxPrice: '',
      page: currentPage,
      limit: productsPerPage,
    });

  const startProduct = (currentPage - 1) * productsPerPage + 1;
  const endProduct = startProduct + products.length - 1;

  const [deleteProduct] = useDeleteProductMutation();

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleDeleteProduct = async (productId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this product?');
    if (!confirmDelete) return;

    try {
      await deleteProduct(productId).unwrap();
      alert('Product deleted successfully');
      await refetch();
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Failed to delete product');
    }
  };

  return (
    <>
      {isLoading && <Spinner />}
      {error && (
        <div className="text-red-500 text-center py-8">
          <i className="ri-error-warning-line text-3xl mb-2 block"></i>
          Failed to load products.
        </div>
      )}

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">
            <i className="ri-handbag-line text-primary text-2xl"></i> Manage Products
          </h2>
          <p className="text-sm text-gray-500">
            Showing {startProduct} to {endProduct} of {totalProducts} products
          </p>
        </div>

        <div className="overflow-x-auto rounded-lg shadow border border-gray-200">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-100 text-gray-600 text-sm">
              <tr>
                <th className="text-left px-6 py-3">No</th>
                <th className="text-left px-6 py-3">Product Name</th>
                <th className="text-left px-6 py-3">Sizes</th> {/* NEW column */}
                {/* <th className="text-left px-6 py-3">Publish Date</th> */}
                <th className="text-left px-6 py-3">Manage</th>
                <th className="text-left px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 text-sm">
              {products?.map((product, index) => (
                <tr key={product._id} className="border-t hover:bg-gray-50">
                  <td className="px-6 py-4">{index + 1}</td>
                  <td className="px-6 py-4 font-medium">{product.name}</td>

                  {/* Display sizes as comma-separated or "N/A" */}
                  <td className="px-6 py-4">
                    {product.sizes && product.sizes.length > 0
                      ? product.sizes.join(', ')
                      : 'N/A'}
                  </td>

                  {/* <td className="px-6 py-4">{formatDate(product.createdAt)}</td> */}
                  <td className="px-6 py-4">
                    <Link to={`/dashboard/update-products/${product._id}`}>
                      <button className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm text-primary border border-primary hover:bg-blue-50 transition">
                        <i className="ri-edit-line"></i>
                        Edit
                      </button>
                    </Link>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleDeleteProduct(product._id)}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm text-white bg-primary hover:bg-primary-dark transition"
                    >
                      <i className="ri-delete-bin-line"></i>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-8 gap-2">
          <button
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
            className="px-4 py-2 text-sm bg-gray-200 text-gray-700 rounded hover:bg-gray-300 disabled:opacity-50"
          >
            <i className="ri-arrow-left-s-line"></i> Prev
          </button>
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={`px-4 py-2 text-sm rounded ${
                currentPage === index + 1
                  ? 'bg-primary text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {index + 1}
            </button>
          ))}
          <button
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
            className="px-4 py-2 text-sm bg-gray-200 text-gray-700 rounded hover:bg-gray-300 disabled:opacity-50"
          >
            Next <i className="ri-arrow-right-s-line"></i>
          </button>
        </div>
      </div>
    </>
  );
};

export default ManageProducts;
