import { screen } from '@testing-library/react';
import App from '../App';
import DETAIL_API from './helpers/detailsFetchTest';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';

const initialEntries = ['/meals/52770'];

describe('Verificar se a pagina RecipiDetails esta sendo renderizada como devido', () => {
  it('verifica se os elementos estão sendo renderizados como deveriam', async () => {
    jest.resetAllMocks();
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(DETAIL_API),
    });
    renderWithRouterAndRedux(<App />, { initialEntries });
    const recipeImage = await screen.getByTestId('recipe-photo');
    expect(recipeImage).toBeInTheDocument();
    expect(recipeImage).toHaveAttribute('src', 'https://www.themealdb.com/images/media/meals/sutysw1468247559.jpg');
    // const recipeName = await screen.findByTestId('recipe-title');
    // expect(recipeName).toBeInTheDocument();
    // expect(recipeName.innerText).toBe('Spaghetti Bolognese');
    // const recipeCategory = screen.getByText('Beef');
    // expect(recipeCategory).toBeInTheDocument();
  });
});
