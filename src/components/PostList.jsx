import React, { useEffect, useRef } from 'react';
import '../styles/PostList.css';

const PostList = ({
  posts,
  loading,
  error,
  currentPage,
  totalPages,
  goToNextPage,
  goToPreviousPage,
  scrollMode,
  searchTerm,
  selectedTag,
  onTagSelect
}) => {
  const loaderRef = useRef();

  useEffect(() => {
    if (scrollMode !== 'infinite') return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && currentPage < totalPages && !loading) {
          goToNextPage();
        }
      },
      { threshold: 1.0 }
    );

    const loader = loaderRef.current;
    if (loader) observer.observe(loader);
    return () => {
      if (loader) observer.unobserve(loader);
    };
  }, [scrollMode, currentPage, totalPages, loading, goToNextPage]);

  
  const filteredPosts = posts.filter((post) => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTag = selectedTag ? post.tags.includes(selectedTag) : true;
    return matchesSearch && matchesTag;
  });

  return (
    <div className="blog-container">
      <header className="blog-header">
        <h1>Modern Blog</h1>
        <p className="blog-subtitle">Discover the latest articles and insights</p>
      </header>

      <div className="posts-grid">
        {filteredPosts.map((post) => (
          <article key={post.id} className="post-card">
            <div className="post-card-content">
              <h2 className="post-title">{post.title}</h2>
              <p className="post-excerpt">
                {post.body.length > 150 ? `${post.body.substring(0, 150)}...` : post.body}
              </p>
              <div className="post-tags">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className={`tag ${selectedTag === tag ? 'selected' : ''}`}
                    onClick={() => onTagSelect(tag)}
                  >
                    {tag}
                  </span>
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

      {/* Infinite scroll loader */}
      {scrollMode === 'infinite' && currentPage < totalPages && (
        <div ref={loaderRef} className="infinite-loader">
          <div className="loading-spinner">Loading more posts...</div>
        </div>
      )}

      {/* Pagination controls */}
      {scrollMode === 'pagination' && (
        <div className="pagination-controls">
          <button
            className="btn btn-primary me-2"
            onClick={goToPreviousPage}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span>Page {currentPage} / {totalPages}</span>
          <button
            className="btn btn-primary ms-2"
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default PostList;
