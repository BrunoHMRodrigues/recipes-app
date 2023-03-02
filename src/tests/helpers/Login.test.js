import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen, waitFor } from '@testing-library/react';
import App from '../../App';
import { renderWithRouterAndRedux } from './renderWithRouterAndRedux';

beforeEach(() => {
  // const initialEntries = ['/'];
  renderWithRouterAndRedux(<App />);
});

describe('Verify if Page Login is working as intended', () => {
  it('Verify if the page is rendering as intended', () => {
    const email = screen.getByTestId('email-input');
    expect(email).toBeInTheDocument();
    expect(email).toHaveValue('');
    const password = screen.getByTestId('password-input');
    expect(password).toBeInTheDocument();
    expect(password).toHaveValue('');
    const btnEnter = screen.getByTestId('login-submit-btn');
    expect(btnEnter).toBeInTheDocument();
    expect(btnEnter).toBeDisabled();
  });
  it('Verify if the inputs validations are working as intended', async () => {
    const btnEnter = screen.getByTestId('login-submit-btn');
    expect(btnEnter).toBeInTheDocument();
    expect(btnEnter).toBeDisabled();

    const password = screen.getByTestId('password-input');
    userEvent.type(password, '1234567');
    expect(btnEnter).toBeDisabled();

    const email = screen.getByTestId('email-input');
    userEvent.type(email, 'teste@teste.com');
    await waitFor(() => {
      expect(btnEnter).toBeEnabled();
    });
  });
});
