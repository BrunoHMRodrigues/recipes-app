import { SEARCH } from './actionTypes';

export const saveSearch = (payload) => ({
  type: SEARCH,
  payload,
});

export const fetchFood = ({ foodType, endPoint, inputValue }) => async (dispatch) => {
  const searchType = (endPoint === 'i') ? 'filter' : 'search';
  const URL = `https://www.${foodType}.com/api/json/v1/1/${searchType}.php?${endPoint}=${inputValue}`;
  try {
    const response = await fetch(URL);
    console.log(response);
    const data = await response.json();
    console.log(data);
    dispatch(saveSearch(data));
  } catch (error) {
    console.log(error);
  }
};
