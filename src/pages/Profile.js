import React from 'react';
import { useHistory } from 'react-router-dom';
import '../styles/genericStyles.css';
import './Profile.css';
import checkIcon from '../images/checkIcon.png';
import heartIcon from '../images/heartIcon.png';
import logoutIcon from '../images/logoutIcon.png';

// localStorage.setItem('user', '{"email":"email@mail.com"}');
function Profile() {
  const user = JSON.parse(localStorage.getItem('user'));
  const history = useHistory();

  const handleRoute = ({ target }) => {
    history.push(`/${target.name}`);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('doneRecipes');
    localStorage.removeItem('favoriteRecipes');
    localStorage.removeItem('inProgressRecipes');
    history.push('/');
  };
  return (
    <div className="app-container">
      <p data-testid="profile-email" className="profile-email">{user.email}</p>

      <div className="d-flex flex-column">
        <div className="container-profile-button">
          <div className="container-icon">
            <img src={ checkIcon } alt="Check Icon" className="check-icon" />
          </div>
          <button
            type="button"
            data-testid="profile-done-btn"
            className="profile-button"
            onClick={ handleRoute }
            name="done-recipes"
          >
            Done Recipes
          </button>
        </div>

        <hr />

        <div className="container-profile-button">
          <div className="container-icon">
            <img src={ heartIcon } alt="Check Icon" className="heart-icon" />
          </div>
          <button
            type="button"
            data-testid="profile-favorite-btn"
            className="profile-button"
            onClick={ handleRoute }
            name="favorite-recipes"
          >
            Favorite Recipes
          </button>
        </div>

        <hr />

        <div className="container-profile-button">
          <div className="container-icon">
            <img src={ logoutIcon } alt="Logout Icon" className="logout-icon" />
          </div>
          <button
            type="button"
            data-testid="profile-logout-btn"
            className="profile-button"
            onClick={ handleLogout }
          >
            Logout
          </button>
        </div>
      </div>

    </div>
  );
}

export default Profile;
