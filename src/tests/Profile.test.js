import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';

const initialEntries = ['/profile'];
beforeEach(() => {
  localStorage.setItem('user', '{"email":"email@mail.com"}');
  localStorage.setItem('doneRecipes', '[]');
  localStorage.setItem('favoriteRecipes', '[]');
  localStorage.setItem('inProgressRecipes', '{}');
});
afterEach(() => {
  localStorage.clear();
});

describe('Verify if Page Profile is rendering as intended', () => {
  it('Verify if the page is rendering as intended', () => {
    const { history } = renderWithRouterAndRedux(<App />, { initialEntries });
    expect(history.location.pathname).toBe('/profile');

    const userEmail = screen.getByText('email@mail.com');
    expect(userEmail).toBeInTheDocument();

    const btnDoneRecipes = screen.getByText('Done Recipes');
    expect(btnDoneRecipes).toBeInTheDocument();

    const btnFavoriteRecipes = screen.getByText('Favorite Recipes');
    expect(btnFavoriteRecipes).toBeInTheDocument();

    const btnLogout = screen.getByText('Logout');
    expect(btnLogout).toBeInTheDocument();
  });
  it('Verify if the route of the buttons are working as intended', async () => {
    const { history } = renderWithRouterAndRedux(<App />, { initialEntries });
    expect(history.location.pathname).toBe('/profile');

    const btnDoneRecipes = screen.getByText('Done Recipes');
    userEvent.click(btnDoneRecipes);
    expect(history.location.pathname).toBe('/done-recipes');

    history.push('/profile');
    expect(history.location.pathname).toBe('/profile');

    const btnFavoriteRecipes = await screen.findByText('Favorite Recipes');
    userEvent.click(btnFavoriteRecipes);
    expect(history.location.pathname).toBe('/favorite-recipes');
  });
  it('Verify if the button Logout is working as intended', async () => {
    const { history } = renderWithRouterAndRedux(<App />, { initialEntries });
    expect(history.location.pathname).toBe('/profile');

    const userBefore = localStorage.getItem('user');
    const doneRecipesBefore = localStorage.getItem('doneRecipes');
    const favoriteRecipesBefore = localStorage.getItem('favoriteRecipes');
    const inProgressRecipesBefore = localStorage.getItem('inProgressRecipes');
    expect(userBefore).toBe('{"email":"email@mail.com"}');
    expect(doneRecipesBefore).toBe('[]');
    expect(favoriteRecipesBefore).toBe('[]');
    expect(inProgressRecipesBefore).toBe('{}');

    const btnLogout = await screen.findByText('Logout');
    userEvent.click(btnLogout);
    expect(history.location.pathname).toBe('/');

    const user = localStorage.getItem('email');
    const doneRecipes = localStorage.getItem('doneRecipes');
    const favoriteRecipes = localStorage.getItem('favoriteRecipes');
    const inProgressRecipes = localStorage.getItem('inProgressRecipes');

    expect(user).toBe(null);
    expect(doneRecipes).toBe(null);
    expect(favoriteRecipes).toBe(null);
    expect(inProgressRecipes).toBe(null);
  });
});
