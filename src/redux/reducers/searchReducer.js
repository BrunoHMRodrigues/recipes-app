import { CATEGORY, SEARCH } from '../actions/actionTypes';

const recipes = (state = {}, { type, payload }) => {
  switch (type) {
  case SEARCH:
    return ({ ...state, foods: payload, searched: true });
  case CATEGORY:
    return ({ ...state, categories: payload });
  default:
    return state;
  }
};

export default recipes;
