import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import DoneRecipes from './pages/DoneRecipes';
import Profile from './pages/Profile';

function App() {
  return (
    <div className="meals">
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/done-recipes" component={ DoneRecipes } />
        <Route path="/profile" component={ Profile } />
      </Switch>
    </div>
  );
}

export default App;
