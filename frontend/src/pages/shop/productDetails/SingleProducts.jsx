import React ,{ useState }from 'react'
import { useDispatch } from 'react-redux';
import { Link ,useParams} from 'react-router-dom'
import { useFetchProductByIdQuery } from '../../../redux/features/products/productsApi.js'; 
import RatingStars from '../../../components/RatingStars';
import { addToCart } from '../../../redux/features/cart/CartReducer.js';
import ReviewsCart from '../reviews/ReviewsCart.jsx';
import RelatedProducts from './RelatedProducts.jsx';

const SingleProducts = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [selectedSize, setSelectedSize] = useState("");
  const { data, error, isLoading } = useFetchProductByIdQuery(id);
  const singleProduct = data?.product || {};
  const ProductRevies = data?.reviews || [];

  const handleAddToCart = (product) => {
    if (!selectedSize) {
      alert("Please select a size before adding to cart.");
      return;
    }
    dispatch(addToCart({ ...product, size: selectedSize }));
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading product</div>;

  return (
    <>
      {/* ...breadcrumb... */}

      <section className='max-w-[1400px] m-auto py-20 px-4 mt-8'>
        <div className='flex flex-col items-center md:flex-row gap-8'>
          <div className='md:w-1/2 w-full'>
            <img src={singleProduct?.image} alt="" className='rounded-md w-full h-auto' />
          </div>

          <div className='md:w-1/2 w-full'>
            <h3 className='text-2xl font-semibold mb-4'>{singleProduct?.name}</h3>
            <p className='text-xl text-primary mb-4'>
              LKR {singleProduct?.price}
              {singleProduct?.oldPrice && <s className='ml-1'>LKR {singleProduct?.oldPrice}</s>}
            </p>
            <p className='text-gray-400 mb-4'>{singleProduct?.description}</p>

            {/* ✅ Size Selection */}
            {singleProduct?.sizes?.length > 0 && (
              <div className="my-4">
                <label className="font-semibold">Size: </label>
                <select
                  className="ml-2 px-3 py-2 border rounded-md"
                  value={selectedSize}
                  onChange={(e) => setSelectedSize(e.target.value)}
                >
                  <option value="">Select size</option>
                  {singleProduct.sizes.map((s, index) => (
                    <option key={index} value={s}>{s}</option>
                  ))}
                </select>
              </div>
            )}

            <div className='flex flex-col space-y-2'>
              <p><strong>Category:</strong> {singleProduct?.category}</p>
              <p><strong>Color:</strong> {singleProduct?.color}</p>
              <div className='flex gap-1 items-center'>
                <strong>Rating: </strong>
                <RatingStars rating={singleProduct?.rating} />
              </div>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleAddToCart(singleProduct);
              }}
              className='mt-6 px-6 py-3 bg-primary text-white rounded-md'>
              Add to Cart
            </button>
          </div>
        </div>
      </section>

      <section className='section_container mt-8'>
        <ReviewsCart ProductRevies={ProductRevies} />
      </section>
      <RelatedProducts productId={id} />
    </>
  );
};
export default SingleProducts;
