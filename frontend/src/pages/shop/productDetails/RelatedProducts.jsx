import React from 'react';
import { useFetchRelatedProductsQuery } from '../../../redux/features/products/productsApi';
import ProductGrid from '../ProductGrid';

const RelatedProducts = ({ productId }) => {
const { data: relatedProducts = [], isLoading, error } = useFetchRelatedProductsQuery(productId);

if (isLoading) return null; // or <Spinner />
if (error || relatedProducts.length === 0) return null;

return (
<section className="my-12  px-4 max-w-[1400px] mx-auto">
<h2 className="text-2xl font-semibold text-text-dark mb-6 text-center">
You May Also Like
</h2>
<ProductGrid products={relatedProducts} />
</section>
);
};

export default RelatedProducts;