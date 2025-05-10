import React, { useState } from 'react';
import PropTypes from 'prop-types';

const CommentForm = ({ onSubmit, loading }) => {
  const [name, setName] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    if (!name.trim() || !content.trim()) return;
    await onSubmit(name.trim(), content.trim());
    setName('');
    setContent('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
        Únete a la conversación
      </h2>
      <input
        type="text"
        placeholder="Tu nombre"
        value={name}
        onChange={e => setName(e.target.value)}
        disabled={loading}
        className="
          w-full
          border border-gray-300 dark:border-gray-600
          bg-white dark:bg-gray-700
          text-gray-900 dark:text-gray-100
          rounded-lg p-3
          focus:outline-none focus:ring-2 focus:ring-blue-500
          transition-colors
        "
      />
      <textarea
        placeholder="Tu comentario"
        value={content}
        onChange={e => setContent(e.target.value)}
        disabled={loading}
        className="
          w-full
          border border-gray-300 dark:border-gray-600
          bg-white dark:bg-gray-700
          text-gray-900 dark:text-gray-100
          rounded-lg p-3
          h-24 resize-none
          focus:outline-none focus:ring-2 focus:ring-blue-500
          transition-colors
        "
      />
      <button
        type="submit"
        disabled={loading}
        className="
          bg-blue-600 hover:bg-blue-700
          text-white
          px-6 py-2 rounded-lg
          disabled:opacity-50
          transition-colors
        "
      >
        {loading ? 'Enviando…' : 'Enviar comentario'}
      </button>
    </form>
  );
};

CommentForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool
};

export default CommentForm;
