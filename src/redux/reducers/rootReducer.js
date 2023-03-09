import { combineReducers } from 'redux';
import recipes from './searchReducer';
import recipeReducer from './detailsReducer';

const rootReducer = combineReducers({ recipes, recipeReducer });

export default rootReducer;
