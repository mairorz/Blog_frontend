import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:3000/blog/v1/post',
  timeout: 5000,
});

export const getLatestPosts = () => {
  return apiClient.get('/getPosts', { params: { limit: 3 } });
};

export const getPostById = (postId) => {
  return apiClient.get(`/getPost/${postId}`);
};

export const getComments = (postId) => {
  return apiClient.get(`/${postId}/getComments`);
};

export const addComment = (postId, { name, content }) => {
  return apiClient.post(`/${postId}/addComment`, { name, content });
};
