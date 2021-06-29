import React from 'react'
import './index.css';
import Rating from '../Rating';
import moment from 'moment'

function CommentCard(props) {
    const { children, comment } = props;
    // console.log("comment", comment);
    return (
        <div className="comment_card">
            <div className="comment_card_row">
                <h3>{comment.name}</h3>
                {
                    comment.rating !== 0 && <Rating product={comment} />
                }
            </div>

            <span>{moment(comment.createdAt).fromNow()}</span>

            <span>{new Date(comment.createdAt).toLocaleString()}</span>

            <p dangerouslySetInnerHTML={{ __html: comment.content }} />

            {children}

        </div>
        // comment_card
    )
}

export default CommentCard
