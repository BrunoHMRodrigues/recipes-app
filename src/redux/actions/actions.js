import { SEARCH } from './actionTypes';

export const saveSearch = (payload) => ({
  type: SEARCH,
  payload,
});

export const fetchFood = ({ foodType, endPoint, inputValue }) => async (dispatch) => {
  const API = foodType === 'meals' ? 'themealdb' : 'thecocktaildb';
  const searchType = (endPoint === 'i') ? 'filter' : 'search';
  const URL = `https://www.${API}.com/api/json/v1/1/${searchType}.php?${endPoint}=${inputValue}`;
  try {
    const response = await fetch(URL);
    const data = await response.json();
    dispatch(saveSearch(data[foodType]));
  } catch (error) {
    console.log(error);
  }
};
