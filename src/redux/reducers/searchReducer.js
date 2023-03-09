import { CATEGORIES, SEARCH } from '../actions/actionTypes';

const recipes = (state = {}, { type, payload, searched }) => {
  switch (type) {
  case SEARCH:
    return ({ ...state, foods: payload, searched });
  case CATEGORIES:
    return ({ ...state, categories: payload });
  default:
    return state;
  }
};

export default recipes;
