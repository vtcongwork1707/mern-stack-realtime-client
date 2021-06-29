import React, { useEffect, useState } from 'react';
import './index.css';
import CommentCard from './CommentCard';
import FormInput from '../FormInput'

let showComments = []

function CommentItem(props) {
    const { item, socket } = props;
    const [reply, setReply] = useState(false)
    const [name, setName] = useState('')

    const [replyComment, setReplyComment] = useState([])
    const [hideReplyComment, setHideReplyComment] = useState([])
    const [next, setNext] = useState(3)


    const loadMore = () => {
        setNext(next + 3)
    }

    useEffect(() => {
        const loopWithSlice = () => {
            let start = item.reply.length - next < 0 ? 0 : item.reply.length - next

            showComments = item.reply.slice(start, item.reply.length)

            setHideReplyComment(start)
            setReplyComment(showComments)
        }

        loopWithSlice(next)
    }, [item.reply, next])



    const handleReply = (username) => {
        setReply(true)
        setName(username)
    }

    const hideReply = () => {
        setReply(false)
        setNext(3)
    }
    return (
        <>
            <CommentCard comment={item}>
                <div className="nav_comment">
                    <p onClick={() => handleReply(item.username)}>Reply</p>
                    {
                        hideReplyComment > 0 &&
                        <p onClick={loadMore}>Load more {hideReplyComment} comments</p>
                    }

                    <p onClick={hideReply}>Hide Reply</p>
                </div>

                <div className="reply_comment">
                    {
                        replyComment.map(rep => (
                            <CommentCard comment={rep} key={rep._id}>
                                <div className="nav_comment">
                                    <p onClick={() => handleReply(rep.username)}>Reply</p>
                                </div>
                            </CommentCard>
                        ))
                    }
                </div>

                {
                    reply &&
                    <FormInput
                        id={item._id}
                        socket={socket}
                        name={name}
                        setReply={setReply}
                        send="replyComment"
                    />
                }
            </CommentCard>
        </>
    )
}

export default CommentItem
