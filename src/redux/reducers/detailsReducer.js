import { FETCH_MEALS_SUCCESS, FETCH_DRINKS_SUCCESS } from '../actions/actionTypes';

const initialState = {
  meals: null,
  drinks: null,
};

const recipeReducer = (state = initialState, action) => {
  switch (action.type) {
  case FETCH_MEALS_SUCCESS:
    return {
      ...state,
      meals: action.payload,
    };
  case FETCH_DRINKS_SUCCESS:
    return {
      ...state,
      drinks: action.payload,
    };
  default:
    return state;
  }
};

export default recipeReducer;
