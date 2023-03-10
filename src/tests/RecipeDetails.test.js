import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { DETAIL_API_MEAL, DETAIL_API_DRINK } from './helpers/detailsFetchTest';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

const { strMealThumb,
  idMeal,
  strMeal,
  strArea,
  strCategory: mealCategory,
  strIngredient1: mealIngredient,
  strMeasure1: mealMeasure,
  strInstructions: mealInstructions, strYoutube: mealYoutube } = DETAIL_API_MEAL.meals[0];

const { strDrinkThumb,
  idDrink,
  strDrink,
  strCategory: drinkCategory,
  strAlcoholic,
  strIngredient1: drinkIngredient,
  strMeasure1: drinkMeasure,
  strInstructions: drinkInstructions } = DETAIL_API_DRINK.drinks[0];

const photoTestId = 'recipe-photo';
const buttonTestId = 'start-recipe-btn';
const favoriteTestid = 'favorite-btn';
const continueRecipe = 'Continue Recipe';

const testLocalStorageMeal = [{
  id: idMeal,
  type: 'meal',
  nationality: strArea,
  category: mealCategory,
  alcoholicOrNot: '',
  name: strMeal,
  image: strMealThumb }];

const testLocalStorageDrink = [{
  id: idDrink,
  type: 'drink',
  nationality: '',
  category: drinkCategory,
  alcoholicOrNot: strAlcoholic,
  name: strDrink,
  image: strDrinkThumb }];

const inProgress = { meals: { 52770: [] }, drinks: { 11007: [] } };

const favoritecipesMeal = [
  {
    id: idMeal,
    type: 'meal',
    nationality: strArea,
    category: mealCategory,
    alcoholicOrNot: '',
    name: strMeal,
    image: strMealThumb,
  },
];

const doneRecipesMeal = [
  {
    id: idMeal,
    type: 'meal',
    nationality: strArea,
    category: mealCategory,
    alcoholicOrNot: '',
    name: strMeal,
    image: strMealThumb,
    tags: ['italian', 'paste'],
  },
];
const doneRecipesDrink = [
  {
    id: idDrink,
    type: 'drink',
    nationality: '',
    category: drinkCategory,
    alcoholicOrNot: strAlcoholic,
    name: strDrink,
    image: strDrinkThumb,
    tags: [],
  },
];
beforeEach(() => {
  localStorage.clear();
  localStorage.setItem('user', JSON.stringify({ email: 'teste@teste.com' }));
  localStorage.setItem('doneRecipes', JSON.stringify([]));
  localStorage.setItem('favoriteRecipes', JSON.stringify([]));
  localStorage.setItem('inProgressRecipes', JSON.stringify({ drinks: {}, meals: {} }));
});

describe('Verificar se a pagina RecipiDetails esta sendo renderizada como devido quando uma comida', () => {
  const initialEntries = ['/meals/52770'];
  it('verifica se os elementos estão sendo renderizados como deveriam', async () => {
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
    const btnFavorite = screen.getByTestId(favoriteTestid);
    expect(btnFavorite).toBeInTheDocument();
    const recipeName = screen.getByRole('heading', { level: 1, name: 'Spaghetti Bolognese' });
    expect(recipeName).toBeInTheDocument();
    expect(recipeName.textContent).toBe(strMeal);
    const recipeCategory = screen.getByTestId('recipe-category');
    expect(recipeCategory).toBeInTheDocument();
    expect(recipeCategory.textContent).toBe(mealCategory);
    const ingredients = screen.getAllByTestId(/ingredient-name-and-measure/);
    expect(ingredients).toHaveLength(12);
    expect(ingredients[0].textContent).toBe(`${mealIngredient} ${mealMeasure}`);
    const instructions = screen.getByTestId('instructions');
    expect(instructions).toBeInTheDocument();
    expect(instructions.textContent).toBe(mealInstructions);
    const video = screen.getByTestId('video');
    expect(video).toBeInTheDocument();
    expect(video).toHaveAttribute('src', mealYoutube);
    // Acrescentar testes para recomendações
    const btnStartRecipe = screen.getByTestId(buttonTestId);
    expect(btnStartRecipe).toBeInTheDocument();
    expect(btnStartRecipe.textContent).toBe('Start Recipe');
  });
  it('Verificar se a página RecipeDetails está funcionando como deveria', async () => {
    jest.resetAllMocks();
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(DETAIL_API_MEAL),
    });
    const { history } = renderWithRouterAndRedux(<App />, { initialEntries });
    const recipeImage = await screen.findByTestId(photoTestId);
    expect(recipeImage).toBeInTheDocument();
    expect(recipeImage).toHaveAttribute('src', strMealThumb);

    const btnShare = screen.getByTestId('share-btn');
    expect(btnShare).toBeInTheDocument();
    // Testar Click do botão Share
    // userEvent.click(btnShare);
    // const linkCopied = screen.findByText('Link copied!');
    // expect(linkCopied).toBeInTheDocument();
    // const clipboardContent = await navigator.clipboard.readText();
    // expect(clipboardContent).toBe('http://localhost:3000/meals/52770');

    const btnFavorite = screen.getByTestId(favoriteTestid);
    expect(btnFavorite).toBeInTheDocument();
    expect(btnFavorite).toHaveAttribute('src', whiteHeartIcon);
    const initialLocalStorage = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    expect(initialLocalStorage).toEqual([]);
    userEvent.click(btnFavorite);
    const newLocalStorage = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    expect(newLocalStorage).toHaveLength(1);
    expect(newLocalStorage).toEqual(testLocalStorageMeal);
    expect(btnFavorite).toHaveAttribute('src', blackHeartIcon);

    const btnStartRecipe = screen.getByTestId(buttonTestId);
    expect(btnStartRecipe).toBeInTheDocument();
    userEvent.click(btnStartRecipe);
    expect(history.location.pathname).toBe('/meals/52770/in-progress');
  });
  it('Verifica se o botão muda a mensagem quando a receita está salvo como em progresso', async () => {
    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgress));
    jest.resetAllMocks();
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(DETAIL_API_MEAL),
    });
    renderWithRouterAndRedux(<App />, { initialEntries });
    const recipeImage = await screen.findByTestId(photoTestId);
    expect(recipeImage).toBeInTheDocument();
    expect(recipeImage).toHaveAttribute('src', strMealThumb);
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    expect(inProgressRecipes).toEqual(inProgress);
    const btnContinueRecipe = await screen.findByText(continueRecipe);
    expect(btnContinueRecipe).toBeInTheDocument();
  });
  it('Verifica se o botão não existe quando a receita já foi feita', async () => {
    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgress));
    localStorage.setItem('doneRecipes', JSON.stringify(doneRecipesMeal));
    jest.resetAllMocks();
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(DETAIL_API_MEAL),
    });
    renderWithRouterAndRedux(<App />, { initialEntries });
    const recipeImage = await screen.findByTestId(photoTestId);
    expect(recipeImage).toBeInTheDocument();
    expect(recipeImage).toHaveAttribute('src', strMealThumb);
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    expect(inProgressRecipes).toEqual(inProgress);
    const btnContinueRecipe = await screen.queryByText(continueRecipe);
    expect(btnContinueRecipe).not.toBeInTheDocument();
  });
  it('Testa comportamento caso não exista chave inProgressRecipes', async () => {
    localStorage.removeItem('inProgressRecipes');
    jest.resetAllMocks();
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(DETAIL_API_MEAL),
    });
    renderWithRouterAndRedux(<App />, { initialEntries });
    const recipeImage = await screen.findByTestId(photoTestId);
    expect(recipeImage).toBeInTheDocument();
    expect(recipeImage).toHaveAttribute('src', strMealThumb);

    const favoriteRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    expect(favoriteRecipes).toEqual({ drinks: {}, meals: {} });
  });
  it('Testa se a página esta renderizando de acordo com o chave favoriteRecipes do localStorage', async () => {
    // DEVERIA COBRIR LINHA 98 DO RECIPEDETAILS, MAS NÃO ESTÁ
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoritecipesMeal));
    jest.resetAllMocks();
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(DETAIL_API_MEAL),
    });
    renderWithRouterAndRedux(<App />, { initialEntries });

    const recipeImage = await screen.findByTestId(photoTestId);
    expect(recipeImage).toBeInTheDocument();
    expect(recipeImage).toHaveAttribute('src', strMealThumb);

    const btnFavorite = await screen.findByRole('img', { name: /favorite icon/i, src: blackHeartIcon });
    expect(btnFavorite).toBeInTheDocument();
    expect(btnFavorite).toHaveAttribute('src', blackHeartIcon);
  });
});

describe('Verificar se a pagina RecipiDetails esta sendo renderizada como devido quando uma bebida', () => {
  const initialEntries = ['/drinks/11007'];
  it('verifica se os elementos estão sendo renderizados como deveriam', async () => {
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
    const btnFavorite = screen.getByTestId(favoriteTestid);
    expect(btnFavorite).toBeInTheDocument();
    const recipeName = screen.getByRole('heading', { level: 1, name: 'Margarita' });
    expect(recipeName).toBeInTheDocument();
    expect(recipeName.textContent).toBe(strDrink);
    const recipeCategory = screen.getByTestId('recipe-category');
    expect(recipeCategory).toBeInTheDocument();
    expect(recipeCategory.textContent).toBe(strAlcoholic);
    const ingredients = screen.getAllByTestId(/ingredient-name-and-measure/);
    expect(ingredients).toHaveLength(4);
    expect(ingredients[0].textContent).toBe(`${drinkIngredient} ${drinkMeasure}`);
    const instructions = screen.getByTestId('instructions');
    expect(instructions).toBeInTheDocument();
    expect(instructions.textContent).toBe(drinkInstructions);
    // Acrescentar testes para recomendações
    const btnStartRecipe = screen.getByTestId(buttonTestId);
    expect(btnStartRecipe).toBeInTheDocument();
    expect(btnStartRecipe.textContent).toBe('Start Recipe');
  });
  it('Verificar se a página RecipeDetails está funcionando como deveria', async () => {
    localStorage.removeItem('favoriteRecipes');
    jest.resetAllMocks();
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(DETAIL_API_DRINK),
    });
    const { history } = renderWithRouterAndRedux(<App />, { initialEntries });
    const recipeImage = await screen.findByTestId(photoTestId);
    expect(recipeImage).toBeInTheDocument();
    expect(recipeImage).toHaveAttribute('src', strDrinkThumb);

    const btnFavorite = screen.getByTestId(favoriteTestid);
    expect(btnFavorite).toBeInTheDocument();
    expect(btnFavorite).toHaveAttribute('src', whiteHeartIcon);
    const initialLocalStorage = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    expect(initialLocalStorage).toEqual([]);
    userEvent.click(btnFavorite);
    const newLocalStorage = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    expect(newLocalStorage).toHaveLength(1);
    expect(newLocalStorage).toEqual(testLocalStorageDrink);
    expect(btnFavorite).toHaveAttribute('src', blackHeartIcon);

    const btnStartRecipe = screen.getByTestId(buttonTestId);
    expect(btnStartRecipe).toBeInTheDocument();
    userEvent.click(btnStartRecipe);
    expect(history.location.pathname).toBe('/drinks/11007/in-progress');
  });
  it('Verifica se o botão muda a mensagem quando a receita está salvo como em progresso', async () => {
    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgress));
    jest.resetAllMocks();
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(DETAIL_API_DRINK),
    });
    renderWithRouterAndRedux(<App />, { initialEntries });
    const recipeImage = await screen.findByTestId(photoTestId);
    expect(recipeImage).toBeInTheDocument();
    expect(recipeImage).toHaveAttribute('src', strDrinkThumb);
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    expect(inProgressRecipes).toEqual(inProgress);
    const btnContinueRecipe = await screen.findByText(continueRecipe);
    expect(btnContinueRecipe).toBeInTheDocument();
  });
  it('Verifica se o botão não existe quando a receita já foi feita', async () => {
    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgress));
    localStorage.setItem('doneRecipes', JSON.stringify(doneRecipesDrink));
    jest.resetAllMocks();
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(DETAIL_API_DRINK),
    });
    renderWithRouterAndRedux(<App />, { initialEntries });
    const recipeImage = await screen.findByTestId(photoTestId);
    expect(recipeImage).toBeInTheDocument();
    expect(recipeImage).toHaveAttribute('src', strDrinkThumb);
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    expect(inProgressRecipes).toEqual(inProgress);
    const btnContinueRecipe = screen.queryByText(continueRecipe);
    expect(btnContinueRecipe).not.toBeInTheDocument();
  });
});
