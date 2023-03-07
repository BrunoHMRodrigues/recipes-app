import { FETCH_MEALS_SUCCESS, FETCH_DRINKS_SUCCESS } from './actionTypes';

export const fetchMeals = (id) => async (dispatch) => {
  const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
  const data = await res.json();
  dispatch({ type: FETCH_MEALS_SUCCESS, payload: data.meals[0] });
};

export const fetchDrinks = (id) => async (dispatch) => {
  const res = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
  const data = await res.json();
  dispatch({ type: FETCH_DRINKS_SUCCESS, payload: data.drinks[0] });
};
