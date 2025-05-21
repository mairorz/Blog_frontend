import React from 'react';
import PropTypes from 'prop-types';
import { usePost } from '../shared/hooks/usePost';
import { useComments } from '../shared/hooks/useComments';
import { useAddComment } from '../shared/hooks/useAddComment';
import CommentForm from './CommentForm';

const PostDetails = ({ postId, onBack }) => {
  const { post, loading: loadingPost } = usePost(postId);
  const { comments, loading: loadingComments, refresh } = useComments(postId);
  const { add, loading: adding } = useAddComment();

  if (loadingPost) return <p className="text-center py-10 text-gray-500 dark:text-gray-400">Cargando publicación…</p>;
  if (!post) return <p className="text-center py-10 text-gray-500 dark:text-gray-400">Publicación no encontrada.</p>;

  const handleAddComment = async (name, content) => {
    await add(postId, name, content);
    await refresh();
  };

  return (
    <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 my-8 transition-colors">
      <div className="flex justify-end mb-6">
        <button
          onClick={onBack}
          disabled={adding}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg disabled:opacity-50 transition-colors"
        >
          Volver
        </button>
      </div>

      {post.imageUrl && (
        <div className="mb-5 flex justify-center">
          <div className="w-full sm:max-w-xl rounded-md overflow-hidden">
            <img
              src={`http://localhost:3000/images/posts-pictures/${post.imageUrl}`}
              alt={post.title}
              className="w-full object-cover"
            />
          </div>
        </div>
      )}

      <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2 text-center">
        {post.title}
      </h1>
      <p className="text-xl text-gray-700 dark:text-gray-300 mb-6 text-center">
        {post.description}
      </p>

      <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
        Comentarios
      </h2>
      <div className="space-y-4 mb-8">
        {loadingComments ? (
          <p className="text-center text-gray-500 dark:text-gray-400">Cargando comentarios…</p>
        ) : comments.length ? (
          comments.map(c => (
            <div
              key={c._id}
              className="bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg p-4 transition-colors"
            >
              <p className="font-medium text-gray-900 dark:text-gray-100">
                {c.name}{' '}
                <span className="text-gray-500 dark:text-gray-400 text-sm">
                  ({new Date(c.createdAt).toLocaleString()})
                </span>
              </p>
              <p className="text-gray-700 dark:text-gray-200 mt-1">
                {c.content}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-500 dark:text-gray-400">Aún no hay comentarios</p>
        )}
      </div>

      <CommentForm onSubmit={handleAddComment} loading={adding} />
    </div>
  );
};

PostDetails.propTypes = {
  postId: PropTypes.string.isRequired,
  onBack: PropTypes.func.isRequired
};

export default PostDetails;