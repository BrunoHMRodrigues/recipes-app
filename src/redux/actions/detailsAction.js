import { FETCH_MEALS_SUCCESS, FETCH_DRINKS_SUCCESS } from './actionTypes';

export const fetchMeals = (id) => async (dispatch) => {
  const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
  const data = await res.json();
  console.log('meals', data);
  // dispatch({ type: 'FETCH_RECIPE_SUCCESS', payload: data.meals[0] }); é responsável por atualizar o estado do Redux com as informações da receita após uma solicitação bem-sucedida à AP
  dispatch({ type: FETCH_MEALS_SUCCESS, payload: data.meals });
};

export const fetchDrinks = (id) => async (dispatch) => {
  const res = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
  const data = await res.json();
  console.log('drinks', data);
  // dispatch({ type: 'FETCH_RECIPE_SUCCESS', payload: data.meals[0] }); é responsável por atualizar o estado do Redux com as informações da receita após uma solicitação bem-sucedida à AP
  dispatch({ type: FETCH_DRINKS_SUCCESS, payload: data.meals });
};
