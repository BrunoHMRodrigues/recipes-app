import React from 'react';
import { useHistory } from 'react-router-dom';

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
    <div>
      <p data-testid="profile-email">{user.email}</p>
      <button
        type="button"
        data-testid="profile-done-btn"
        onClick={ handleRoute }
        name="done-recipes"
      >
        Done Recipes
      </button>
      <button
        type="button"
        data-testid="profile-favorite-btn"
        onClick={ handleRoute }
        name="favorite-recipes"
      >
        Favorite Recipes
      </button>
      <button
        type="button"
        data-testid="profile-logout-btn"
        onClick={ handleLogout }
      >
        Logout
      </button>

    </div>
  );
}

export default Profile;
