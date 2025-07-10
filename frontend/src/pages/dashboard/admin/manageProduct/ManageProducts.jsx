import React from 'react'
import { useState } from 'react'
import { useDeleteProductMutation, useFetchAllProductsQuery } from '../../../../redux/features/products/productsApi'
import Spinner from '../../../../components/Spinner';
import { formatDate } from '../../../../utils/formateDate';
import { Link } from 'react-router-dom';

const ManageProducts = () => {
    const [currentPage, setCurrentPage] =useState(1);
    const [productsPerPage] = useState(12);
    const {data :{products=[], totalPages, totalProducts } ={},isLoading, error, refetch} = useFetchAllProductsQuery({
        category : '',
        color : '',
        minPrice:"" ,
        maxPrice:"",
        page: currentPage,
        limit: productsPerPage,
        
    });

    const startProduct = (currentPage - 1) * productsPerPage + 1;
    const endProduct = startProduct + products.length - 1;
    const handlePageChange = (page) => {
        if(page > 0 && page <= totalPages) {
            setCurrentPage(page);
        }
    }
    
    const [deleteProduct] = useDeleteProductMutation();
    const handleDeleteProduct = async (productId) => {
        try {
            const responce = await deleteProduct(productId).unwrap();
            alert("Product deleted successfully");
            await refetch(); // Refetch products after deletion
        } catch (error) {
            console.error("Error deleting product:", error);
            
        }
    }

  return (
    <>
    {
        isLoading && <Spinner/>
    }
    {
        error && <div classNameName='text-red-500 text-center'>Error Loading Product</div>
    }
    <section className="py-1 bg-blueGray-50">
<div className="w-full  mb-12 xl:mb-0 px-4 mx-auto">
  <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
    <div className="rounded-t mb-0 px-4 py-3 border-0">
      <div className="flex flex-wrap items-center">
        <div className="relative w-full px-4 max-w-full flex-grow flex-1">
          <h3 className="font-semibold text-base text-blueGray-700">All Products</h3>
        </div>
        {/* <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
          <button className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">See all</button>
        </div> */}
      </div>
      <h3 className='my-4 text-sm'>Showing {startProduct} to {endProduct} of {totalProducts} products</h3>
    </div>

    <div className="block w-full overflow-x-auto">
      <table className="items-center bg-transparent w-full border-collapse ">
        <thead>
          <tr>
            <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                          No
                        </th>
          <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                         Product Name
                        </th>
           <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                          Publish Date
                        </th>
          <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                          Edit or Manage
                        </th>
           <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                          Actions
                        </th>             
          </tr>
        </thead>

        <tbody>
            {
                products && products.map((product, index) => (
                    <tr>
                        <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4 text-left text-blueGray-700 font-semibold">
                        {index+1}
                        </th>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4 font-semibold">
                        {product.name}
                        </td>
                        <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-sm whitespace-nowrap p-4">
                       {formatDate(product.createdAt)}
                        </td>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4">
                            <Link to={`/dashboard/update-products/${product._id}`}>
                                <button
                                    type="button"
                                    className="inline-flex items-center gap-2 rounded-lg border border-primary bg-white px-4 py-2 text-sm font-medium text-primary transition hover:bg-primary-light focus:outline-none focus:ring-2 focus:ring-indigo-500">
                                    <i className="ri-edit-2-line text-base"></i>
                                    Edit
                                </button>
                            </Link>
                        </td>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            <button
                                type="button"
                                onClick={() => handleDeleteProduct(product._id)}
                                className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-red-500">
                                <i className="ri-delete-bin-6-line text-base"></i>
                                Delete
                            </button>
                        </td>
                    </tr>
            ))
            }
       
        </tbody>

      </table>
    </div>
  </div>
</div>

{/* pagination */}
<div className='flex justify-center items-center mt-6'>
    <button  disabled={currentPage == 1} onClick={() => handlePageChange (currentPage -1)} className='px-4 py-2 bg-gray-300 text-gray-700 rounded-md mx-1'>Previous</button>
    {
        [...Array(totalPages)].map((_, index) => (
            <button
            onClick={() => handlePageChange(index + 1)}
            className={`px-4 py-2 ${currentPage === index + 1 ? 'bg-primary text-white' : 'bg-gray-300 text-gray-700' } rounded-md mx-1 `}>{index + 1}</button>
        ))
    }
    <button disabled={currentPage == totalPages}  onClick={() => handlePageChange (currentPage + 1)}className='px-4 py-2 bg-gray-300 text-gray-700 rounded-md mx-1'>Next</button>
</div>

<footer className="relative pt-8 pb-6 mt-16">
  <div className="container mx-auto px-4">
    <div className="flex flex-wrap items-center md:justify-between justify-center">
      <div className="w-full md:w-6/12 px-4 mx-auto text-center">
        <div className="text-sm text-blueGray-500 font-semibold py-1">
          Made with ZeroZCloths.
        </div>
      </div>
    </div>
  </div>
</footer>
</section>
    </>
  )
}

export default ManageProducts
