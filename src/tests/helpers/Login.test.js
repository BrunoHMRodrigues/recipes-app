import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen, waitFor } from '@testing-library/react';
import App from '../../App';
import { renderWithRouterAndRedux } from './renderWithRouterAndRedux';

const emailTestId = 'email-input';
const passwordTestId = 'password-input';
const buttonTestId = 'login-submit-btn';

describe('Verify if Page Login is working as intended', () => {
  it('Verify if the page is rendering as intended', () => {
    renderWithRouterAndRedux(<App />);
    const email = screen.getByTestId(emailTestId);
    expect(email).toBeInTheDocument();
    expect(email).toHaveValue('');
    const password = screen.getByTestId(passwordTestId);
    expect(password).toBeInTheDocument();
    expect(password).toHaveValue('');
    const btnEnter = screen.getByTestId(buttonTestId);
    expect(btnEnter).toBeInTheDocument();
    expect(btnEnter).toBeDisabled();
  });
  it('Verify if the inputs validations are working as intended', async () => {
    renderWithRouterAndRedux(<App />);
    const btnEnter = screen.getByTestId(buttonTestId);
    expect(btnEnter).toBeInTheDocument();
    expect(btnEnter).toBeDisabled();

    const password = screen.getByTestId(passwordTestId);
    userEvent.type(password, '1234567');
    expect(btnEnter).toBeDisabled();

    const email = screen.getByTestId(emailTestId);
    userEvent.type(email, 'teste@teste.com');
    await waitFor(() => {
      expect(btnEnter).toBeEnabled();
    });
  });
  it('Verify if the Enter button working as intended', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const btnEnter = screen.getByTestId(buttonTestId);
    const password = screen.getByTestId(passwordTestId);
    userEvent.type(password, '1234567');
    const email = screen.getByTestId(emailTestId);
    userEvent.type(email, 'teste@teste.com');
    await waitFor(() => {
      expect(btnEnter).toBeEnabled();
    });
    userEvent.click(btnEnter);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/meals');
  });
});
