import React from 'react'
import './index.css';

let rate = 0;
function Rating(props) {
    const { product } = props;

    if (props.numReviews) {
        rate = 100 - (product.rating / product.numReviews * 20)
    } else {
        rate = 100 - (product.rating * 20)
    }

    const style_star = {
        clipPath: product.rating === 0 ? `inset(0 100% 0 0)` : `inset(0 ${rate}% 0 0)`
    }
    // console.log("product in Rating", product);
    // const rate = 100 - (product.rating / product.numReviews * 20);
    // console.log("rate", rate);
    return (
        <div className="rating">
            <div className="star">
                <i className="far fa-star"></i>
                <i className="far fa-star"></i>
                <i className="far fa-star"></i>
                <i className="far fa-star"></i>
                <i className="far fa-star"></i>

                <div className="star-1" style={style_star}>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                </div>
            </div>
        </div>
    )
}

export default Rating
