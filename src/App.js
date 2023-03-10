import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Meals from './pages/Meals';
import Drinks from './pages/Drinks';
import RecipeDetails from './pages/RecipeDetails';
import RecipeInProgress from './pages/RecipeInProgress';
import DoneRecipes from './pages/DoneRecipes';
import Profile from './pages/Profile';
import FavoriteRecipes from './pages/FavoriteRecipes';
import NotFound from './pages/NotFound';

function App() {
  return (
    <div className="meals">
      <Switch>
        <Route exact path="/" component={ Login } />

        <Route path="/meals/:idReceita/in-progress" component={ RecipeInProgress } />
        <Route path="/drinks/:idReceita/in-progress" component={ RecipeInProgress } />

        <Route path="/meals/:idReceita" component={ RecipeDetails } />
        <Route path="/drinks/:idReceita" component={ RecipeDetails } />

        <Route path="/drinks" component={ Drinks } />
        <Route path="/meals" component={ Meals } />

        <Route path="/done-recipes" component={ DoneRecipes } />
        <Route path="/favorite-recipes" component={ FavoriteRecipes } />
        <Route path="/profile" component={ Profile } />

        <Route path="*" component={ NotFound } />
      </Switch>
    </div>
  );
}

export default App;
