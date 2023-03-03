import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import RecipeDetails from './pages/RecipeDetails';

function App() {
  return (
    <div className="meals">
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/meals/:idReceita" component={ RecipeDetails } />
        <Route path="/drinks/:idReceita" component={ RecipeDetails } />
      </Switch>
    </div>
  );
}

export default App;
