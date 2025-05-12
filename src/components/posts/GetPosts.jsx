import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import usePublicacion from "../../shared/hooks/usePublicacion.jsx";
import "../../assets/style.css";
import PropTypes from "prop-types";
 
export default function detailPost() {
  const { id } = useParams();
  const {
    post,
    loading,
    error,
    addComment,
    isSubmitting,
  } = usePublicacion(id);
 
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [commentErr, setCommentErr] = useState("");
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    setCommentErr("");
 
    if (!author.trim() || !content.trim()) {
      setCommentErr("All fields are required");
      return;
    }
 
    const success = await addComment({ author, content });
    if (success) {
      setAuthor("");
      setContent("");
    } else {
      setCommentErr("Failed to add comment");
    }
  };
 
  if (loading) return <p>Post is Loading…</p>;
  if (error) return <p>Error: {error}</p>;
  if (!post) return <p>Post was not found .</p>;
 
  return (
    <div className="detail-post">
      <h1 className="post-title">{post.title}</h1>
      <p className="post-desc">{post.content}</p>
 
      <div className="post-meta">
        <span>Date: {new Date(post.date).toLocaleDateString()}</span>
        <span>Course: {post.course}</span>
        <span>Category: {post.category}</span>
      </div>
      <section className="comentarios-section">
        <h2>Comments: ({post.comments.length})</h2>
        {post.comments.length === 0 ? (
          <p>There are no commets yet, start the conversation!</p>
        ) : (
          <ul className="comments-list">
            {post.comments.map((c) => (
              <li key={c._id} className="comments">
                <strong>{c.author}</strong>
                <p>{c.content}</p>
              </li>
            ))}
          </ul>
        )}
      </section>
 
      <section className="comment-form">
        <h2 className="form-title">Add Comment</h2>
 
        {commentErr && <p className="error-message">{commentErr}</p>}
 
        <form onSubmit={handleSubmit} className="form-container">
          <div className="form-group">
            <label htmlFor="username" className="form-label">
              User
            </label>
            <input
              id="username"
              type="text"
              placeholder="Username@"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              required
              maxLength={30}
              className="form-input"
            />
          </div>
 
          <div className="form-group">
            <label htmlFor="comment" className="form-label">
              Comment
            </label>
            <textarea
              id="comment"
              placeholder="Write your comment here…"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              maxLength={500}
              className="form-textarea"
            />
          </div>
 
          <button
            type="submit"
            disabled={isSubmitting}
            className="submit-button"
          >
            {isSubmitting ? "posting" : "Comment Posted"}
          </button>
        </form>
      </section>
 
      <Link to="/posts" className="back-link">
        Go back to posts
      </Link>
    </div>
  );
}
 
detailPost.propTypes = {
  post: PropTypes.shape({
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    date: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]).isRequired,
    course: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    comments: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string.isRequired,
        author: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
        date: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]).isRequired,
      })
    ),
  }),
  loading: PropTypes.bool,
  error: PropTypes.string,
  refetch: PropTypes.func.isRequired,
  addComment: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool,
};