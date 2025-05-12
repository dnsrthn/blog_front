import { useState, useEffect, useCallback } from 'react';
import { getPostById, addComment as apiAddComments } from '../../services/api.jsx';

const usePost = (id = '') => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchData = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    setError(null);
    try {
      const resp = await getPostById(id);
      if (resp.error) throw new Error(resp.message);
      setPost(resp.post);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleAddComment = useCallback(async ({ author, content }) => {
    if (!id) return false;
    setIsSubmitting(true);
    try {
      const resp = await apiAddComments(id, { author, content });
      if (resp.error) throw new Error(resp.message);
      setPost((prev) => ({
        ...prev,
        comments: [...(prev?.comments || []), resp.comment]
      }));
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setIsSubmitting(false);
    }
  }, [id]);

  return {
    post,
    loading,
    error,
    refetch: fetchData,
    addComment: handleAddComment,
    isSubmitting
  };
};

export default usePost;
