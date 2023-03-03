import { SEARCH } from '../actions/actionTypes';

const searchReducer = (state = {}, { type, payload }) => {
  switch (type) {
  case SEARCH:
    return ({ ...state, foods: payload });
  default:
    return state;
  }
};

export default searchReducer;
