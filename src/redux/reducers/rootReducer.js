import { combineReducers } from 'redux';
import recipes from './searchReducer';

const rootReducer = combineReducers({ recipes });

export default rootReducer;
