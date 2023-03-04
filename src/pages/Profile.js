import React from 'react';

function Profile() {
  return (
    <div>
      <p data-testid="profile-email" />
      <button type="button" data-testid="profile-done-btn">Done Recipes</button>
      <button type="button" data-testid="profile-favorite-btn">Favorite Recipes</button>
      <button type="button" data-testid="profile-logout-btn">Logout</button>

    </div>
  );
}

export default Profile;
