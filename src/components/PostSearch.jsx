import React, { useState } from 'react';
import usePosts from '../hooks/usePosts';
import useDebounce from '../hooks/useDebounce';
import '../styles/PostSearch.css';

const PostSearch = () => {
  
  const { posts, loading, error } = usePosts();
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
    post.body.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
  );
  
  if (loading) return <div className="loading-spinner"></div>;
  if (error) return <div className="error-message">Error: {error}</div>;

  return (
    <div className="search-container">
      <div className="search-header">
        <h1>Search Articles</h1>
        <div className="search-bar-container">
          <input
            type="text"
            placeholder="Search posts by title or content..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <button className="search-button">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
            </svg>
          </button>
        </div>
        <p className="results-count">{filteredPosts.length} articles found</p>
      </div>

      <div className="search-results">
        {filteredPosts.map((post) => (
          <article key={post.id} className="search-result-card">
            <h2 className="result-title">{post.title}</h2>
            <p className="result-content">{post.body}</p>
            <div className="result-meta">
              <div className="result-tags">
                {post.tags.map((tag) => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
              </div>
              <span className="result-reactions">❤️ {post.reactions || 0}</span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default PostSearch;