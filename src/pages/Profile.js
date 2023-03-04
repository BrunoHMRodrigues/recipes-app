import React from 'react';

// localStorage.setItem('user', '{"email":"email@mail.com"}');
function Profile() {
  const user = JSON.parse(localStorage.getItem('user'));
  return (
    <div>
      <p data-testid="profile-email">{user.email}</p>
      <button type="button" data-testid="profile-done-btn">Done Recipes</button>
      <button type="button" data-testid="profile-favorite-btn">Favorite Recipes</button>
      <button type="button" data-testid="profile-logout-btn">Logout</button>

    </div>
  );
}

export default Profile;
