import React, { useEffect, useState } from "react";
import { useLocation, useNavigate} from "react-router-dom";
import usePosts from "../../shared/hooks/usePosts.jsx"
import PropTypes from 'prop-types';
import "../../assets/style.css";

export const PostsPage = () => {
  const location = useLocation();
  const [category, setCategory] = useState("");
  const [course, setCourse] = useState("");

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    setCategory(queryParams.get("category") || "");
    setCourse(queryParams.get("course") || "");
  }, [location]);

  const { posts, loading, error } = usePosts(category, course);

  const navigate = useNavigate();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>An error ocurred while loading posts: {error}</p>;
  if (!posts) return <p>There is no POSTS.</p>;

return (
    <div className="posts-container">
        {posts.map((pos) => (
            <article key={pos._id} className="post-card">
            <h2
                    className="post-title"
                    style={{ cursor: 'pointer' }}
                    onClick={() => navigate(`/posts/${pos._id}`)}
                >
                    {pos.title}
                </h2>
                <p className="post-desc">{pos.content}</p>
                <div className="post-meta">
                    <span className="post-author">{pos.course}</span>
                    <span className="post-date">{pos.date}</span>
                    <span className="post-category">{pos.category}</span>
                </div>
            </article>
        ))}
    </div>
);
};

PostsPage.propTypes = {
    category: PropTypes.string,
    course: PropTypes.string
  };

export default PostsPage;