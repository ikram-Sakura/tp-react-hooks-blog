import React, { useState } from 'react';
import usePosts from '../hooks/usePosts';
import useDebounce from '../hooks/useDebounce';
import '../styles/PostSearch.css';

const PostSearch = ({ onSearch, selectedTag, onTagSelect }) => {
  const { posts, loading, error } = usePosts();
  const [searchTerm, setSearchTerm] = useState('');
  const allTags = Array.from(new Set(posts.flatMap(post => post.tags)));

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const handleTagClick = (tag) => {
    onTagSelect(tag === selectedTag ? null : tag); 
  };

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
      post.body.toLowerCase().includes(debouncedSearchTerm.toLowerCase());
    const matchesTag = selectedTag ? post.tags.includes(selectedTag) : true;
    return matchesSearch && matchesTag;
  });

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
            onChange={(e) => {
              setSearchTerm(e.target.value);
              onSearch(e.target.value);
            }}
            className="search-input"
          />
          <button className="search-button">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
            </svg>
          </button>
        </div>
        <p className="results-count">{filteredPosts.length} articles found</p>
        {selectedTag && (
          <div className="tag-filter-section mb-4">
          <h5 className="mb-2">Filtrer par tag :</h5>
          <div className="tag-list">
          {allTags.map((tag) => (
            <span
              key={tag}
              className={`tag ${selectedTag === tag ? 'active' : ''}`}
              onClick={() => onTagSelect(selectedTag === tag ? null : tag)}
            >
              {tag}
            </span>
          ))}
          {selectedTag && (
            <button
            className="btn btn-sm btn-outline-primary ms-2 px-3"
              onClick={() => onTagSelect(null)}
            >
              Effacer le filtre
            </button>
          )}

          </div>
        </div>
        )}
      </div>

      <div className="search-results">
        {filteredPosts.map((post) => (
          <article key={post.id} className="search-result-card">
          <img
            src={`https://picsum.photos/seed/${post.id}/600/300`}
            alt="Post preview"
            className="post-image"
          />
          <h2 className="result-title">{post.title}</h2>
          <p className="result-content">{post.body.slice(0, 150)}...</p>
          <div className="result-meta">
            <div className="result-tags">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className={`tag ${tag === selectedTag ? 'active' : ''}`}
                  onClick={() => handleTagClick(tag)}
                >
                  {tag}
                </span>
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
