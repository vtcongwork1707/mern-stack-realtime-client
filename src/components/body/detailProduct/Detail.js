import React, { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { DataContext } from "../../../GlobalState";
import Rating from "../../utils/Rating";
import FormInput from "../../utils/FormInput";
import CommentItem from "../../utils/CommentItem";
import "./index.css";
import { getData } from "../../utils/FetchData";
import Loading from '../../utils/images/loading.gif'

function Detail(props) {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [rating, setRating] = useState(0);
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(false);
    const state = useContext(DataContext);
    const [products] = state.products;
    const socket = state.socket;
    const [page, setPage] = useState(1)
    const pageEnd = useRef();


    useEffect(() => {
        if (id) {
            const data = products.find((x) => x._id === id);
            setProduct(data);
        }
    }, [id, products]);

    // useEffect(() => {
    useState(() => {
        setLoading(true);
        if (id) {
            getData(`/api/comment/${id}?limit=${page * 3}`)
                .then((result) => {
                    // console.log("result", result);
                    setLoading(false);
                    setComments(result.data.data)
                })
                .catch((err) => {
                    console.log("err", err);
                });
        }
    }, [id, page]);

    /**
     * Realtime
     * Join room
     */
    useEffect(() => {
        if (socket) {
            socket.emit("joinRoom", id)
        }

        return () => { }
    }, [socket])


    useEffect(() => {
        if (socket) {
            socket.on('sendCommentToClient', (data) => {
                setComments([data, ...comments]);
            })
            return () => socket.off("sendCommentToClient")
        }
    }, [socket, comments])

    return (
        <div className="detail_product_page">
            {product && (
                <div className="detail_product_card">
                    <img src={product.images.url} alt={product.title} />
                    <div className="detail_product_cart_content">
                        <h2>{product.title}</h2>
                        <span>$ {product.price}</span>
                        <p>{product.description}</p>
                        <button>Buy</button>
                        <div>
                            <h3>Rating: {product.numReviews} reviews</h3>
                            <Rating product={product} />
                        </div>
                    </div>
                    {/* detail_product_cart_content */}
                </div>
                // detail_product_card
            )}
            <div className="comments">
                <h2 className="app_title">
                    Realtime Website (chat, comments ...) with MERN Stack and Socket.io{" "}
                </h2>
                {/* app_title */}
                <div className="reviews">
                    <input
                        type="radio"
                        name="rate"
                        id="rd-5"
                        onChange={() => setRating(5)}
                    />
                    <label htmlFor="rd-5" className="fas fa-star" />

                    <input
                        type="radio"
                        name="rate"
                        id="rd-4"
                        onChange={() => setRating(4)}
                    />
                    <label htmlFor="rd-4" className="fas fa-star" />

                    <input
                        type="radio"
                        name="rate"
                        id="rd-3"
                        onChange={() => setRating(3)}
                    />
                    <label htmlFor="rd-3" className="fas fa-star" />

                    <input
                        type="radio"
                        name="rate"
                        id="rd-2"
                        onChange={() => setRating(2)}
                    />
                    <label htmlFor="rd-2" className="fas fa-star" />

                    <input
                        type="radio"
                        name="rate"
                        id="rd-1"
                        onChange={() => setRating(1)}
                    />
                    <label htmlFor="rd-1" className="fas fa-star" />
                </div>
                {/* reviews */}
                <FormInput id={id} socket={socket} rating={rating} />

                <div className="comments_list">
                    {
                        comments && comments.map((item) => (
                            <CommentItem key={item._id} item={item} socket={socket} />
                        ))
                    }
                </div>
                {/* comments_list */}
            </div>
            {/* comments */}
            {
                loading && (
                    <div>
                        <img src={Loading} alt="loading" />
                    </div>
                )
            }
        </div>
        // detail_product_page
    );
}

export default Detail;
