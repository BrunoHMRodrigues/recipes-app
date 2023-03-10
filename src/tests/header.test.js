import { fireEvent, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';

describe('', () => {
  it('Verify if the page is rendering as intended', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    act(() => {
      history.push('/meals');
    });

    console.log(localStorage.getItem('gio'));

    const lupa = screen.getByRole('img', { name: /search icon/i });
    const titleMeals = screen.getByRole('heading', { name: /meals/i });
    const titleDrinks = screen.getByRole('heading', { name: /drinks/i });

    expect(titleMeals).toBeInTheDocument();

    fireEvent.click(screen.getByRole('img', { name: /drinks bottom button/i }));

    expect(titleDrinks).toBeInTheDocument();

    act(() => {
      history.push('/profile');
    });

    expect(lupa).not.toBeInTheDocument();

    act(() => {
      history.push('/nadaaa');
    });

    expect(titleDrinks).not.toBeInTheDocument();
  });
});
