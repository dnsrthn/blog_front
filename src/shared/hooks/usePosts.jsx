import { useState, useEffect } from 'react';
import { listPosts } from './../../services/api.jsx';

const usePost = (category = '', course = '') => {
  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        setError(null);
        const filters = {};
        if (category) filters.category = category.toUpperCase();
        if (course) filters.course = course.toUpperCase();

        const response = await listPosts(filters);
        
        if (response?.error) {
          setError(response.message || "An error occurred");
        } else {
          setPost(response?.posts || []);
        }
      } catch (err) {
        setError(err.response?.data?.message || err.message || "Connection error");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [category, course]);

  return { post, loading, error };
};

export default usePost;