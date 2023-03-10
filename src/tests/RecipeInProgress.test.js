import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { DETAIL_API_MEAL, DETAIL_API_DRINK } from './helpers/detailsFetchTest';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';

const { strMealThumb,
  strMeal,
  strCategory: mealCategory,
  strIngredient1: mealIngredient,
  strMeasure1: mealMeasure,
  strInstructions: mealInstructions } = DETAIL_API_MEAL.meals[0];

const { strDrinkThumb,
  strDrink, strAlcoholic,
  strIngredient1: drinkIngredient, strMeasure1: drinkMeasure,
  strInstructions: drinkInstructions } = DETAIL_API_DRINK.drinks[0];

const inProgress = { meals: { 52770: [] }, drinks: { 11007: [] } };

const photoTestId = 'recipe-photo';
const buttonTestId = 'finish-recipe-btn';
const finishRecipe = 'FINALIZAR RECIPE';

describe('Verify if the in-progress page for meals is rendering as intended', () => {
  const initialEntries = ['/meals/52770/in-progress'];
  it('Verify if all elements are rendering', async () => {
    jest.resetAllMocks();
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(DETAIL_API_MEAL),
    });
    renderWithRouterAndRedux(<App />, { initialEntries });
    const recipeImage = await screen.findByTestId(photoTestId);
    expect(recipeImage).toBeInTheDocument();
    expect(recipeImage).toHaveAttribute('src', strMealThumb);
    const btnShare = screen.getByTestId('share-btn');
    expect(btnShare).toBeInTheDocument();
    const btnFavorite = screen.getByTestId('favorite-btn');
    expect(btnFavorite).toBeInTheDocument();
    const recipeName = screen.getByRole('heading', { level: 1, name: 'Spaghetti Bolognese' });
    expect(recipeName).toBeInTheDocument();
    expect(recipeName.textContent).toBe(strMeal);
    const recipeCategory = screen.getByTestId('recipe-category');
    expect(recipeCategory).toBeInTheDocument();
    expect(recipeCategory.textContent).toBe(mealCategory);
    const ingredients = screen.getAllByTestId(/ingredient-step/);
    expect(ingredients).toHaveLength(12);
    expect(ingredients[0].textContent).toBe(`${mealIngredient}${mealMeasure}`);
    const instructions = screen.getByTestId('instructions');
    expect(instructions).toBeInTheDocument();
    expect(instructions.textContent).toBe(mealInstructions);
    const btnFinishRecipe = screen.getByTestId(buttonTestId);
    expect(btnFinishRecipe).toBeInTheDocument();
    expect(btnFinishRecipe.textContent).toBe(finishRecipe);
  });
  it('Verify if checkboxs and button disabled property is working as intended (all checked: button not disabled, >= 1 not checked: button disabled)', async () => {
    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgress));
    jest.resetAllMocks();
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(DETAIL_API_MEAL),
    });
    const { history } = renderWithRouterAndRedux(<App />, { initialEntries });
    const recipeImage = await screen.findByTestId(photoTestId);
    expect(recipeImage).toBeInTheDocument();
    expect(recipeImage).toHaveAttribute('src', strMealThumb);
    const btnFinishRecipe = screen.getByRole('button', { name: finishRecipe });
    expect(btnFinishRecipe).toBeInTheDocument();
    expect(btnFinishRecipe.disabled).toBe(true);
    const ingredients = screen.getAllByTestId(/ingredient-step/);
    expect(ingredients).toHaveLength(12);
    expect(ingredients[0].firstChild.checked).toBe(false);
    ingredients.forEach((ingredient) => userEvent.click(ingredient));
    expect(ingredients[0].firstChild.checked).toBe(true);
    expect(btnFinishRecipe.disabled).toBe(false);
    window.location.reload();
    ingredients.forEach((ingredient) => expect(ingredient.firstChild.checked).toBe(true));
    userEvent.click(ingredients[11]);
    expect(ingredients[11].firstChild.checked).toBe(false);
    userEvent.click(ingredients[11]);
    userEvent.click(btnFinishRecipe);
    expect(history.location.pathname).toBe('/done-recipes');
  });
});

describe('Verify if the in-progress page for drinks is rendering as intended', () => {
  const initialEntries = ['/drinks/11007/in-progress'];
  it('Verify if all elements are rendering', async () => {
    jest.resetAllMocks();
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(DETAIL_API_DRINK),
    });
    renderWithRouterAndRedux(<App />, { initialEntries });
    const recipeImage = await screen.findByTestId(photoTestId);
    expect(recipeImage).toBeInTheDocument();
    expect(recipeImage).toHaveAttribute('src', strDrinkThumb);
    const btnShare = screen.getByTestId('share-btn');
    expect(btnShare).toBeInTheDocument();
    const btnFavorite = screen.getByTestId('favorite-btn');
    expect(btnFavorite).toBeInTheDocument();
    const recipeName = screen.getByRole('heading', { level: 1, name: 'Margarita' });
    expect(recipeName).toBeInTheDocument();
    expect(recipeName.textContent).toBe(strDrink);
    const recipeCategory = screen.getByTestId('recipe-category');
    expect(recipeCategory).toBeInTheDocument();
    expect(recipeCategory.textContent).toBe(strAlcoholic);
    const ingredients = screen.getAllByTestId(/ingredient-step/);
    expect(ingredients).toHaveLength(4);
    expect(ingredients[0].textContent).toBe(`${drinkIngredient}${drinkMeasure}`);
    const instructions = screen.getByTestId('instructions');
    expect(instructions).toBeInTheDocument();
    expect(instructions.textContent).toBe(drinkInstructions);
    const btnFinishRecipe = screen.getByTestId(buttonTestId);
    expect(btnFinishRecipe).toBeInTheDocument();
    expect(btnFinishRecipe.textContent).toBe(finishRecipe);
  });
  it('Verify if checkboxs and button disabled property is working as intended (all checked: button not disabled, >= 1 not checked: button disabled)', async () => {
    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgress));
    jest.resetAllMocks();
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(DETAIL_API_DRINK),
    });
    const { history } = renderWithRouterAndRedux(<App />, { initialEntries });
    const recipeImage = await screen.findByTestId(photoTestId);
    expect(recipeImage).toBeInTheDocument();
    expect(recipeImage).toHaveAttribute('src', strDrinkThumb);
    const btnFinishRecipe = screen.getByRole('button', { name: finishRecipe });
    expect(btnFinishRecipe).toBeInTheDocument();
    expect(btnFinishRecipe.disabled).toBe(true);
    const ingredients = screen.getAllByTestId(/ingredient-step/);
    expect(ingredients).toHaveLength(4);
    expect(ingredients[0].firstChild.checked).toBe(false);
    ingredients.forEach((ingredient) => userEvent.click(ingredient));
    expect(ingredients[0].firstChild.checked).toBe(true);
    expect(btnFinishRecipe.disabled).toBe(false);
    window.location.reload();
    ingredients.forEach((ingredient) => expect(ingredient.firstChild.checked).toBe(true));
    userEvent.click(ingredients[3]);
    expect(ingredients[3].firstChild.checked).toBe(false);
    userEvent.click(ingredients[3]);
    userEvent.click(btnFinishRecipe);
    expect(history.location.pathname).toBe('/done-recipes');
  });
});
