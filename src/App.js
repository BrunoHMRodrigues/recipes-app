import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import RecipeDetails from './pages/RecipeDetails';
import RecipeInProgress from './pages/RecipeInProgress';
import DoneRecipes from './pages/DoneRecipes';
import Profile from './pages/Profile';
import FavoriteRecipes from './pages/FavoriteRecipes';

function App() {
  return (
    // <div className="meals">
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route path="/meals/:idReceita" component={ RecipeDetails } />
      <Route path="/drinks/:idReceita" component={ RecipeDetails } />
      <Route path="/meals/:idReceita/in-progress" component={ RecipeInProgress } />
      <Route path="/drinks/:idReceita/in-progress" component={ RecipeInProgress } />
      <Route path="/done-recipes" component={ DoneRecipes } />
      <Route path="/profile" component={ Profile } />
      <Route path="/favorite-recipes" component={ FavoriteRecipes } />
    </Switch>
    // </div
  );
}

export default App;
