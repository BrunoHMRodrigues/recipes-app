import { screen } from '@testing-library/react';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';

const initialEntries = ['/done-recipes'];
const doneRecipes = [
  {
    id: 52770,
    type: 'meal',
    nationality: 'Italian',
    category: 'Beef',
    alcoholicOrNot: '',
    name: 'Spaghetti Bolognese',
    image: 'https://www.themealdb.com/images/media/meals/sutysw1468247559.jpg',
    doneDate: '20/06/2023',
    tags: ['italian', 'paste'],
  },
  {
    id: 11007,
    type: 'drink',
    nationality: '',
    category: '',
    alcoholicOrNot: 'Alcoholic',
    name: 'Margarita',
    image: 'https://www.thecocktaildb.com/images/media/drink/5noda61589575158.jpg',
    doneDate: '20/06/2023',
    tags: [],
  },
];
localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));

describe('Verify if page done-recipes is rendering as intended', () => {
  it('Verify if page is rendering all general elements', () => {
    renderWithRouterAndRedux(<App />, { initialEntries });
    const filterAll = screen.getByTestId('filter-by-all-btn');
    expect(filterAll).toBeInTheDocument();
    const filterMeal = screen.getByTestId('filter-by-meal-btn');
    expect(filterMeal).toBeInTheDocument();
    const filterDrink = screen.getByTestId('filter-by-drink-btn');
    expect(filterDrink).toBeInTheDocument();
  });
  it('Verify if page is rendering all recipes elements as intended', () => {
    renderWithRouterAndRedux(<App />, { initialEntries });
    const mealImage = screen.getByTestId('0-horizontal-image');
    expect(mealImage).toBeInTheDocument();
    const mealName = screen.getByTestId('0-horizontal-name');
    expect(mealName).toBeInTheDocument();
    const mealCategory = screen.getByTestId('0-horizontal-top-text');
    expect(mealCategory).toBeInTheDocument();
    const mealDoneDate = screen.getByTestId('0-horizontal-done-date');
    expect(mealDoneDate).toBeInTheDocument();

    const drinkImage = screen.getByTestId('1-horizontal-image');
    expect(drinkImage).toBeInTheDocument();
    const drinkName = screen.getByTestId('1-horizontal-name');
    expect(drinkName).toBeInTheDocument();
    const drinkAlcoholic = screen.getByTestId('1-horizontal-top-text');
    expect(drinkAlcoholic).toBeInTheDocument();
    const drinkDoneDate = screen.getByTestId('1-horizontal-done-date');
    expect(drinkDoneDate).toBeInTheDocument();
  });
});
