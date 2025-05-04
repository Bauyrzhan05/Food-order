import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

export default function CommentPage() {

    const user = useSelector((state) => state.auth.user); 

    const { id } = useParams();
    const [food, setFood] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");

    useEffect(() => {
        fetch(`http://localhost:3030/api/food/${id}`)
            .then((res) => res.json())
            .then((data) => setFood(data.data));

        fetch(`http://localhost:8080/comments?foodId=${id}`)
            .then((res) => res.json())
            .then((data) => setComments(data));  
            
    }, [id]);

    const handleCommentSubmit = async () => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user) return toast.warn("You should log in!");

        const newCommentObj = {
            userId: user.id,
            userName: user.name,
            foodId: id,
            comment: newComment,
            date: new Date().toISOString(),
        };

        const res = await fetch("http://localhost:8080/comments", {
            method: "POST",
            headers: {"Content-Type": "application/json",},
            body: JSON.stringify(newCommentObj),
        });

        if (res.ok) {
            const savedComment = await res.json(); 
            setComments([...comments, savedComment]);
            setNewComment("");
        }
    };


    const deleteComment = async (id) => {
        const response = await fetch(`http://localhost:8080/comments/${id}`, {
            method: "DELETE"
        });

        if (response.ok){
            const updatedComments = comments.filter(comment => comment.id !== id);
            setComments(updatedComments);
        }
    }

    if (!food) return <div className="loading">Loading...</div>;

    return (
        <div className="food-detail-container">
            <div className="food-info">
                <img src={`http://localhost:3030/images/${food.image}`} alt={food.name} />
                <h2>{food.name}</h2>
                <p>{food.description}</p>
                
                <div className="food-meta">
                    <div className="food-meta-item">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                        </svg>
                        <span>Safe</span>
                    </div>
                    <div className="food-meta-item">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <circle cx="12" cy="12" r="10"></circle>
                            <path d="M12 8v4l3 3"></path>
                        </svg>
                        <span>15-20 min</span>
                    </div>
                    <div className="food-meta-item">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                        </svg>
                        <span>kall</span>
                    </div>
                </div>
            </div>

            <div className="comments-section">
                <div className="comments-header">
                    <h3>Reviews</h3>
                    <span className="comments-count">{comments.length} comment</span>
                </div>

                <div className="comments-list">
                    {comments.length > 0 ? (
                        comments.map((comment) => (
                            <div key={comment.id} className={`comment ${comment.new ? 'new-comment' : ''}`}>
                                <div className="comment-header">
                                    <div className="user-avatar">
                                        {comment.userName.charAt(0).toUpperCase()}
                                    </div>
                                    <div>
                                        <span className="user-name">{comment.userName}</span>
                                        <span className="comment-date">
                                            {new Date(comment.date).toLocaleString()}
                                        </span>
                                    </div>
                                    {
                                        user && user.role === 'admin' 
                                        ?<p onClick={() => deleteComment(comment.id)} className="curser">X</p>
                                        : <></>
                                    }
                                </div>
                                <p className="comment-content">{comment.comment}</p>
                                <div className="comment-actions">
                                    <button className="comment-action">
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                            <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
                                        </svg>
                                        like
                                    </button>
                                    <button className="comment-action">
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                                        </svg>
                                        Answer
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="empty-comments">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                            </svg>
                            <p>Be the author of the first comment you!</p>
                        </div>
                    )}
                </div>

                <div className="add-comment">
                    <h4>Leave a comment</h4>
                    <textarea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Write your feedback here..."
                        maxLength="500"
                    />
                    <div className="add-comment-footer">
                        <span className="character-count">{newComment.length}/500</span>
                        <button 
                            onClick={handleCommentSubmit}
                            disabled={!newComment.trim()}
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <line x1="22" y1="2" x2="11" y2="13"></line>
                                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                            </svg>
                            Send
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}