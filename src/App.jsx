import React, { useState, useEffect } from 'react';
import './App.css';
import PostList from './components/PostList';
import PostSearch from './components/PostSearch';
import ThemeToggle from './components/ThemeToggle';
import { useTheme } from './context/ThemeContext'; 
import usePosts from './hooks/usePosts';
import useLocalStorage from './hooks/useLocalStorage';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState(null);
  const [scrollMode, setScrollMode] = useLocalStorage('scrollMode', 'pagination');

  const { theme } = useTheme(); 

  const {
    posts,
    loading,
    error,
    currentPage,
    totalPages,
    goToNextPage,
    goToPreviousPage
  } = usePosts(scrollMode); 

 

  return (
    <div className={`container py-4 ${scrollMode === 'pagination' ? 'pagination-mode' : 'infinite-mode'}`} style={{ maxWidth: '1400px' }}>
      <header className="pb-3 mb-4 border-bottom">
        <div className="d-flex justify-content-between align-items-center">
          <h1 className="display-5 fw-bold">Blog</h1>
          <ThemeToggle />
          <div className="ms-3">
            <label htmlFor="scrollModeSelect" className="me-2">Scroll Mode:</label>
            <select
              id="scrollModeSelect"
              value={scrollMode}
              onChange={(e) => setScrollMode(e.target.value)}
              className="form-select"
              style={{ width: '160px', display: 'inline-block' }}
            >
              <option value="pagination">Pagination</option>
              <option value="infinite">Infinite Scroll</option>
            </select>
          </div>
        </div>
      </header>

      <main>
        <PostSearch onSearch={setSearchTerm} />

        {error && <div className="alert alert-danger">Erreur: {error}</div>}
        {loading && posts.length === 0 && <div className="alert alert-info">Chargement des articles...</div>}

        <PostList
          posts={posts}
          loading={loading}
          error={error}
          scrollMode={scrollMode}
          currentPage={currentPage}
          totalPages={totalPages}
          goToNextPage={goToNextPage}
          goToPreviousPage={goToPreviousPage}
          searchTerm={searchTerm}
          selectedTag={selectedTag}
          onTagSelect={setSelectedTag}
        />
      </main>

      <footer className="pt-3 mt-4 text-center border-top">
        <p>TP React Hooks - Blog &middot; {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}

export default App;
