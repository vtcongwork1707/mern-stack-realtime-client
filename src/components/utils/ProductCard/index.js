import React from 'react';
import { Link } from 'react-router-dom';
import './index.css';

function ProductCard(props) {
    const { item } = props;
    return (
        <div className="product_card">
            <img src={item.images.url} alt={item.title} />
            <h3>{item.title}</h3>
            <span>$ {item.price}</span>
            <p>{item.description}</p>
            <div className="product_card_row">
                <Link to={`/product/${item._id}`}>View</Link>
                <button>Buy Now</button>
            </div>
            {/* product_card_row */}
        </div>
        // product_card
    )
}

export default ProductCard
