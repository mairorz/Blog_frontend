import { useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';
import { getComments } from '../../services/api';

export function useComments(postId) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchComments = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getComments(postId);
      setComments(response.data.comments || []);
    } catch (e) {
      toast.error(e.response?.data?.message || 'Error al cargar comentarios');
    } finally {
      setLoading(false);
    }
  }, [postId]);

  useEffect(() => {
    if (!postId) return;
    fetchComments();
  }, [postId, fetchComments]);

  return { comments, loading, refresh: fetchComments };
}
