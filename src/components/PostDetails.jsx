import React from 'react';
import { useTheme } from '../context/ThemeContext';
// TODO: Exercice 3 - Importer useTheme

/**
 * Composant d'affichage détaillé d'un post
 * @param {Object} props - Propriétés du composant
 * @param {Object} props.post - Le post à afficher
 * @param {Function} props.onClose - Fonction pour fermer les détails
 * @param {Function} props.onTagClick - Fonction appelée lors du clic sur un tag
 */
function PostDetails({ post, onClose, onTagClick }) {
  const { theme } = useTheme();

  const themeClasses = useMemo(() => ({
    card: `card mb-4 ${theme === 'dark' ? 'bg-dark text-light' : ''}`,
    badge: `badge me-1 ${theme === 'dark' ? 'bg-secondary' : 'bg-light text-dark border'}`,
    button: `btn btn-${theme === 'dark' ? 'light' : 'dark'} btn-sm`
  }), [theme]);

  if (!post) return null;

  return (
    <div className={themeClasses.card}>
      <div className="card-header d-flex justify-content-between align-items-center">
        <h5 className="card-title mb-0">{post.title}</h5>
        <button className={themeClasses.button} onClick={onClose} aria-label="Fermer">
          <i className="bi bi-x-lg"></i>
        </button>
      </div>

      <div className="card-body">
        <p>{post.body}</p>
        <p><strong>Reactions:</strong> ❤️ {post.reactions}</p>
        <p><strong>User ID:</strong> {post.userId}</p>
        <div>
          <strong>Tags:</strong>{' '}
          {post.tags.map(tag => (
            <span
              key={tag}
              className={themeClasses.badge}
              onClick={() => onTagClick(tag)}
              style={{ cursor: 'pointer' }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default React.memo(PostDetails);