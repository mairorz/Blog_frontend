import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { getLatestPosts } from '../../services/api';

export function useLatestPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        const response = await getLatestPosts();
        if (isMounted) setPosts(response.data.posts || []);
      } catch (e) {
        toast.error(e.response?.data?.message || 'Error al cargar publicaciones');
      } finally {
        if (isMounted) setLoading(false);
      }
    })();
    return () => { isMounted = false; };
  }, []);

  return { posts, loading };
}