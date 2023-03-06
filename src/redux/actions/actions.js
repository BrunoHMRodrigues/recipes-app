import { CATEGORIES, SEARCH } from './actionTypes';

export const saveSearch = (payload, searched) => ({
  type: SEARCH,
  payload,
  searched,
});

export const fetchFood = ({
  foodType,
  endPoint,
  inputValue = '',
}) => async (dispatch) => {
  const API = foodType === 'meals' ? 'themealdb' : 'thecocktaildb';
  const searchType = (endPoint === 'i') ? 'filter' : 'search';
  const URL = `https://www.${API}.com/api/json/v1/1/${searchType}.php?${endPoint}=${inputValue}`;
  try {
    const response = await fetch(URL);
    const data = await response.json();
    dispatch(saveSearch(data[foodType], true));
  } catch (error) {
    console.log(error);
  }
};

export const fetchByCategory = ({ foodType, category }) => async (dispatch) => {
  const API = foodType === 'meals' ? 'themealdb' : 'thecocktaildb';
  const URL = `https://www.${API}.com/api/json/v1/1/filter.php?c=${category}`;
  try {
    const response = await fetch(URL);
    const data = await response.json();
    dispatch(saveSearch(data[foodType], false));
  } catch (error) {
    console.log(error);
  }
};

export const saveCategories = (payload) => ({
  type: CATEGORIES,
  payload,
});

export const fetchCategories = (foodType) => async (dispatch) => {
  const API = foodType === 'meals' ? 'themealdb' : 'thecocktaildb';
  const URL = `https://www.${API}.com/api/json/v1/1/list.php?c=list`;
  try {
    const response = await fetch(URL);
    const data = await response.json();
    dispatch(saveCategories(data[foodType]));
  } catch (error) {
    console.log(error);
  }
};
