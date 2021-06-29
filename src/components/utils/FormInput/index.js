import React, { useRef } from "react";
import { patchData } from "../FetchData";
import "./index.css";

let showComments = []

function FormInput(props) {
    const nameRef = useRef();
    const contentRef = useRef();
    const { id, socket, rating } = props;

    const submitComment = () => {
        const username = nameRef.current.value;
        const content = contentRef.current.innerHTML;

        if (!username.trim()) {
            return alert("Not Empty!")
        }

        if (contentRef.current.textContent.trim().length < 10) {
            return alert("Contents too short, must be at least 10 character!")
        }
        const createdAt = new Date().toISOString();

        socket.emit("createComment", {
            username,
            content,
            product_id: id,
            rating,
        });

        if (rating && rating !== 0) {
            patchData(`/api/product/${id}`, { rating })
                .then((res) => {
                    // console.log("res", res);
                }).catch((err) => {
                    console.log("err", err);
                })
        }
        contentRef.current.innerHTML = ''
    }

    return (
        <div className="form_input">
            <p>Name:</p>
            <input type="text" ref={nameRef} />
            <p>Content:</p>
            <div
                ref={contentRef}
                contentEditable="true"
                style={{
                    height: "100px",
                    border: "1px solid gray",
                    padding: "5px 10px",
                    outline: "none",
                }}
            />
            <button onClick={() => submitComment()}>Send</button>
        </div>
    );
}

export default FormInput;
