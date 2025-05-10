import { useState } from 'react';
import toast from 'react-hot-toast';
import { addComment } from '../../services/api';

export function useAddComment() {
  const [loading, setLoading] = useState(false);

  const add = async (postId, name, content) => {
    setLoading(true);
    try {
      const response = await addComment(postId, { name, content });
      toast.success('Comentario agregado');
      return response.data.comment;
    } catch (e) {
      toast.error(e.response?.data?.message || 'Error al agregar comentario');
      throw e;
    } finally {
      setLoading(false);
    }
  };

  return { add, loading };
}