import React from 'react';
import usePosts from '../hooks/usePosts';
import '../styles/PostList.css';

const PostList = () => {
  const { posts, loading, error, currentPage, totalPages, goToNextPage, goToPreviousPage } = usePosts();
  
const animatedPosts = posts.map((post, index) => ({
  ...post,
  style: {
    '--index': index % 10, 
  }
}));


{animatedPosts.map((post) => (
  <article key={post.id} className="post-card" style={post.style}>
    {/* ... rest of your card content ... */}
  </article>
))}

  if (loading) return <div className="loading-spinner"></div>;
  if (error) return <div className="error-message">Error: {error}</div>;

  return (
    <div className="blog-container">
      <header className="blog-header">
        <h1>Modern Blog</h1>
        <p className="blog-subtitle">Discover the latest articles and insights</p>
      </header>

      <div className="posts-grid">
        {posts.map((post) => (
          <article key={post.id} className="post-card">
            <div className="post-card-content">
              <h2 className="post-title">{post.title}</h2>
              <p className="post-excerpt">{post.body.length > 150 ? `${post.body.substring(0, 150)}...` : post.body}</p>
              <div className="post-tags">
                {post.tags.map((tag) => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
              </div>
              <div className="post-meta">
                <span className="reactions">❤️ {post.reactions || 0} reactions</span>
                <button className="read-more">Read more</button>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="pagination">
        <button 
          onClick={goToPreviousPage} 
          disabled={currentPage === 1}
          className="pagination-button"
        >
          Previous
        </button>
        <span className="page-info">Page {currentPage} of {totalPages}</span>
        <button 
          onClick={goToNextPage} 
          disabled={currentPage === totalPages}
          className="pagination-button"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PostList;