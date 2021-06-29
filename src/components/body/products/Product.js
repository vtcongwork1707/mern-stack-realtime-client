import React, { useContext } from 'react'
import { DataContext } from '../../../GlobalState'
import ProductCard from '../../utils/ProductCard';
import './Product.css';

function Product() {
    const state = useContext(DataContext);
    const [products] = state.products;

    return (
        <>
            <h2 className="app_title">Realtime Website (chat, comments ...) with MERN Stack and Socket.io </h2>
            <div className="products_page">
                {
                    products && products.map((item) => (
                        <ProductCard item={item} key={item._id} />
                    ))
                }

            </div>
            {/* products_page */}
        </>
    )
}

export default Product
