import { SEARCH } from '../actions/actionTypes';

const recipes = (state = {}, { type, payload }) => {
  switch (type) {
  case SEARCH:
    return ({ ...state, foods: payload, searched: true });
  default:
    return state;
  }
};

export default recipes;
