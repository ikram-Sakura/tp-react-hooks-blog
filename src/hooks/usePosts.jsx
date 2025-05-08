import { useState, useEffect } from 'react';

const usePosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(10);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await fetch(`https://dummyjson.com/posts?limit=${limit}&skip=${(currentPage - 1) * limit}`);
      const data = await response.json();
      
    
      const transformedPosts = data.posts.map(post => ({
        ...post,
        reactions: typeof post.reactions === 'object' 
          ? (post.reactions.likes || 0) + (post.reactions.dislikes || 0)
          : post.reactions || 0
      }));
      
      setPosts(transformedPosts);
      setTotalPages(Math.ceil(data.total / limit));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [currentPage, limit]);

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return { posts, loading, error, currentPage, totalPages, goToNextPage, goToPreviousPage };
};

export default usePosts;