import React, { useState } from 'react';
import LatestPosts from './LatestPosts';
import PostDetails from './PostDetails';

export const Content = () => {
  const [view, setView] = useState('home');
  const [selectedPostId, setSelectedPostId] = useState(null);

  const handleViewHome = () => setView('home');
  const handleSelectPost = (id) => {
    setSelectedPostId(id);
    setView('details');
  };

  return (
    <main className="bg-gray-700 min-h-screen py-8 back">
      {view === 'home' && <LatestPosts onSelectPost={handleSelectPost} />}
      {view === 'details' && selectedPostId && (
        <PostDetails postId={selectedPostId} onBack={handleViewHome} />
      )}
    </main>
  );
};
