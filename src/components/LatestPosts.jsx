import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useLatestPosts } from '../shared/hooks/useLatestPosts';

const LatestPosts = ({ onSelectPost }) => {
  const { posts, loading } = useLatestPosts();

  const [courseFilter, setCourseFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');

  const courses = useMemo(() => {
    if (!posts) return [];
    const uniq = Array.from(new Set(posts.map(p => p.course)));
    return ['all', ...uniq];
  }, [posts]);

  const filteredPosts = useMemo(() => {
    if (!posts) return [];
    const now = Date.now();
    return posts
      .filter(p => {
        if (courseFilter !== 'all' && p.course !== courseFilter) return false;
        if (dateFilter !== 'all') {
          const diff = now - new Date(p.createdAt).getTime();
          if (dateFilter === 'today' && diff > 24 * 60 * 60 * 1000) return false;
          if (dateFilter === 'week' && diff > 7 * 24 * 60 * 60 * 1000) return false;
          if (dateFilter === 'month' && diff > 30 * 24 * 60 * 60 * 1000) return false;
        }
        return true;
      })
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }, [posts, courseFilter, dateFilter]);

  if (loading) {
    return (
      <p className="text-center py-10 text-gray-500 dark:text-gray-400">
        Cargando publicaciones…
      </p>
    );
  }
  if (!posts.length) {
    return (
      <p className="text-center py-10 text-gray-500 dark:text-gray-400">
        No hay publicaciones disponibles.
      </p>
    );
  }

  return (
    <div className="max-w-5xl w-full mx-auto p-4 space-y-4">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6 text-center">
        Publicaciones
      </h1>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div className="flex items-center gap-2">
          <label htmlFor="courseFilter" className="font-medium text-gray-700 dark:text-gray-300">
            Curso:
          </label>
          <select
            id="courseFilter"
            value={courseFilter}
            onChange={e => setCourseFilter(e.target.value)}
            className="border rounded-lg p-2 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100"
          >
            {courses.map(c => (
              <option key={c} value={c}>
                {c === 'all' ? 'Todos' : c}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center gap-2">
          <label htmlFor="dateFilter" className="font-medium text-gray-700 dark:text-gray-300">
            Fecha:
          </label>
          <select
            id="dateFilter"
            value={dateFilter}
            onChange={e => setDateFilter(e.target.value)}
            className="border rounded-lg p-2 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100"
          >
            <option value="all">Todas</option>
            <option value="today">Hoy</option>
            <option value="week">Última semana</option>
            <option value="month">Último mes</option>
          </select>
        </div>
      </div>

      {filteredPosts.map(post => {
        const latestComment = post.comments.length
          ? post.comments.reduce((a, b) =>
              new Date(a.createdAt) > new Date(b.createdAt) ? a : b
            )
          : null;

        return (
          <div
            key={post._id}
            className="relative flex flex-col sm:flex-row bg-white dark:bg-gray-800 rounded-lg shadow-sm dark:shadow-none p-6 hover:shadow-md transition-shadow"
          >
            <button
              onClick={() => onSelectPost(post._id)}
              className="absolute top-4 right-4 bg-blue-600 hover:bg-blue-700 text-white text-sm px-3 py-1 rounded transition-colors"
            >
              Ver detalles
            </button>

            <div className="flex-1 min-w-0 pr-12">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-1 break-words">
                {post.title}
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-2">
                <span className="font-medium text-gray-800 dark:text-gray-200">Curso:</span>{' '}
                {post.course}
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-200 mb-4">
                {post.description.slice(0, 120)}…
              </p>

              {latestComment ? (
                <>
                  <h3 className="text-1xs font-medium text-gray-900 dark:text-gray-100 mb-1">
                    Comentario más reciente
                  </h3>
                  <div className="bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg p-3 mb-2 transition-colors">
                    <p className="font-medium text-gray-900 dark:text-gray-100 text-sm">
                      {latestComment.name}{' '}
                      <span className="text-gray-500 dark:text-gray-400 text-xs">
                        ({new Date(latestComment.createdAt).toLocaleString()})
                      </span>
                    </p>
                    <p className="text-gray-700 dark:text-gray-200 text-sm mt-1">
                      {latestComment.content.length > 80
                        ? latestComment.content.slice(0, 80) + '…'
                        : latestComment.content}
                    </p>
                  </div>
                </>
              ) : (
                <p className="text-1xs text-gray-500 dark:text-gray-400 mb-2">
                  Aún no hay comentarios
                </p>
              )}

              <p className="text-1xs text-gray-500 dark:text-gray-400">
                Publicado el {new Date(post.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

LatestPosts.propTypes = {
  onSelectPost: PropTypes.func.isRequired,
};

export default LatestPosts;
