import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';

const initialEntries = ['/profile'];
beforeEach(() => {
  localStorage.setItem('user', '{"email":"email@mail.com"}');
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
});
