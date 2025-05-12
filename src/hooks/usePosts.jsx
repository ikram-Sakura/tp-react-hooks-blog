import { useState, useEffect } from 'react';

const usePosts = (scrollMode = 'infinite') => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const limit = 10;

  const fetchPosts = async (page) => {
    setLoading(true);
    try {
      const skip = (page - 1) * limit;
      const res = await fetch(`https://dummyjson.com/posts?limit=${limit}&skip=${skip}`);
      const data = await res.json();

      const transformed = data.posts.map(post => ({
        ...post,
        reactions: typeof post.reactions === 'object'
          ? (post.reactions.likes || 0) + (post.reactions.dislikes || 0)
          : post.reactions || 0
      }));

    
      if (scrollMode === 'infinite') {
        setPosts(prev => [...prev, ...transformed]);
      } else {
        setPosts(transformed);
      }

      setTotalPages(Math.ceil(data.total / limit));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts(currentPage);
  }, [currentPage, scrollMode]);

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(p => p + 1);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage(p => p - 1);
  };

  return {
    posts,
    loading,
    error,
    currentPage,
    totalPages,
    goToNextPage,
    goToPreviousPage
  };
};

export default usePosts;
