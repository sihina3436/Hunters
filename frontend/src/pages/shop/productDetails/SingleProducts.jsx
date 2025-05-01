import React from 'react'
import { useDispatch } from 'react-redux';
import { Link ,useParams} from 'react-router-dom'
import { useFetchProductByIdQuery } from '../../../redux/features/products/productsApi.js'; 
import RatingStars from '../../../components/RatingStars';
import { addToCart } from '../../../redux/features/cart/CartReducer.js';


const SingleProducts = () => {
    const {id} = useParams();
    const dispatch = useDispatch();

    const {data, error, isLoading} = useFetchProductByIdQuery(id);
    const singleProduct = data?.product || {};
    console.log(singleProduct);
    const ProductRevies = data?.reviews || [];
    console.log(ProductRevies);

    const handleAddToCart = (product) => {
        dispatch(addToCart(product))
    }


    if(isLoading) {
        return <div className='text-center text-2xl font-medium'>Loading...</div>
    }
    if(error) {
        return <div className='text-center text-2xl font-medium'>Error loading Products details</div>
    }

  return (
    <>
        <section className='max-w-[1400px] m-auto  py-20 px-4 '>
        <h2 className="relative mb-4 text-[42px] font-semibold font-custom text-text-dark text-center after:content-[''] after:block after:w-28 after:h-1 after:bg-primary after:mx-auto after:mt-2">
            Single Product Page
        </h2>
                <div className='max-w-[500px] mx-auto text-text-light text-center space-x-2'>
                    <span className='hover:text-primary'><Link to="/">home</Link></span>
                    <i className="ri-arrow-right-s-line"></i>
                    <span className='hover:text-primary'><Link to="/shop">shop</Link></span>
                    <i className="ri-arrow-right-s-line"></i>
                    <span className='hover:text-primary'>{singleProduct.name}</span>
                </div>
            </section>

            <section className='max-w-[1400px] m-auto  py-20 px-4 mt-8'>
                <div className='flex flex-col items-center md:flex-row gap-8'>
                    {/* product image */}
                    <div className='md:w-1/2 w-full'>
                        <img src={singleProduct?.image} alt="" 
                        className='rounded-md w-full h-auto'
                        />
                    </div>

                    <div className='md:w-1/2 w-full'>
                        <h3 className='text-2xl font-semibold mb-4'>{singleProduct?.name}</h3>
                        <p className='text-xl text-primary mb-4 space-x-1'>
                            ${singleProduct?.price} 
                             {singleProduct?.oldPrice && <s className='ml-1'>${singleProduct?.oldPrice}</s>}
                            </p>
                        <p className='text-gray-400 mb-4'>{singleProduct?.description}</p>

                        {/* additional product info */}
                        <div className='flex flex-col space-y-2'>
                            <p><strong>Category:</strong> {singleProduct?.category}</p>
                            <p><strong>Color:</strong> {singleProduct?.color}</p>
                            <div className='flex gap-1 items-center'>
                                <strong>Rating: </strong>
                                <RatingStars rating={singleProduct?.rating}/>
                            </div>
                           
                        </div>

                        <button 
                        onClick={(e) => {
                            e.stopPropagation();
                            handleAddToCart(singleProduct)
                        }}
                        className='mt-6 px-6 py-3 bg-primary text-white rounded-md'>
                            Add to Cart
                        </button>
                    </div>
                </div>
            </section>

          
    </>
  )
}

export default SingleProducts
