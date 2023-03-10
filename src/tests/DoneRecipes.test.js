import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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

    const shareIcons = screen.queryAllByAltText('Share Icon');
    expect(shareIcons).toHaveLength(2);
  });
});

const recipesTestId = 'container-recipes';

describe('Verify if page done-recipes is working as intended', () => {
  it('Verify if the filters are working as intended', () => {
    renderWithRouterAndRedux(<App />, { initialEntries });
    const allRecipes = screen.queryAllByTestId(recipesTestId);
    expect(allRecipes).toHaveLength(2);
    const filterMeal = screen.getByTestId('filter-by-meal-btn');
    userEvent.click(filterMeal);
    const allMeals = screen.queryAllByTestId(recipesTestId);
    expect(allMeals).toHaveLength(1);
    const getMealName = screen.getByText('Spaghetti Bolognese');
    expect(getMealName).toBeInTheDocument();

    const filterDrink = screen.getByTestId('filter-by-drink-btn');
    userEvent.click(filterDrink);
    const allDrink = screen.queryAllByTestId(recipesTestId);
    expect(allDrink).toHaveLength(1);
    const getDrinkName = screen.getByText('Margarita');
    expect(getDrinkName).toBeInTheDocument();

    const filterAll = screen.getByTestId('filter-by-all-btn');
    userEvent.click(filterAll);
    const newAllRecipes = screen.queryAllByTestId(recipesTestId);
    expect(newAllRecipes).toHaveLength(2);
  });

  it('Verify if Image and Name of recipe is moving to detail page', async () => {
    const { history } = renderWithRouterAndRedux(<App />, { initialEntries });
    expect(history.location.pathname).toBe('/done-recipes');
    const mealImages = screen.queryAllByRole('link', { name: /spaghetti bolognese/i });
    expect(mealImages).toHaveLength(2);

    // VERIFICAR MANEIRA PARA TESTAR A MUDANÇA DE PÁGINA
    // const mealImage = mealImages[0];
    // // const mealName = screen.getByTestId('0-horizontal-name');
    // userEvent.click(mealImage);
    // await waitFor(() => {
    //   expect(history.location.pathname).toBe('/meals/52770');
    // });
  });
  it('Verify if page when entering page without key in localStorage it create the key', () => {
    localStorage.removeItem('doneRecipes');
    renderWithRouterAndRedux(<App />, { initialEntries });
    const getDoneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    expect(getDoneRecipes).toEqual([]);
  });
});
