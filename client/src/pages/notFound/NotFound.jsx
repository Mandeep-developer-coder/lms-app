import { useNavigate } from 'react-router-dom';
import { FaExclamationTriangle } from 'react-icons/fa';

import './notFound.css';

export const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="not-found-wrapper">
      <div className="not-found-card">
        <div className="not-found-icon">
          <FaExclamationTriangle size={45} color="red" />
        </div>
        <h1 className="not-found-heading">404</h1>
        <p className="not-found-message">Oops! The page you’re looking for doesn’t exist.</p>
        <button onClick={() => navigate('/')} className="not-found-btn">
          Back to Home
        </button>
      </div>
    </div>
  );
};