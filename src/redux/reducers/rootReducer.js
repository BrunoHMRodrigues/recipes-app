import { combineReducers } from 'redux';
import recipeReducer from './detailsReducer';

const rootReducer = combineReducers({ recipeReducer });

export default rootReducer;
