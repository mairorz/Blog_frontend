import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { getPostById } from '../../services/api';

export function usePost(postId) {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!postId) return;
    let isMounted = true;
    (async () => {
      try {
        const response = await getPostById(postId);
        if (isMounted) setPost(response.data.post || null);
      } catch (e) {
        toast.error(e.response?.data?.message || 'Error al cargar publicación');
      } finally {
        if (isMounted) setLoading(false);
      }
    })();
    return () => { isMounted = false; };
  }, [postId]);

  return { post, loading };
}