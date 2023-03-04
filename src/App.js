import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Header from './components/Header';
import Meals from './pages/Meals';
import Recipe from './pages/Recipe';
import Drinks from './pages/Drinks';
import Footer from './components/Footer';

function App() {
  return (
    <div className="meals">
      <Header />
      <Switch>
        <Route path="/drinks/:id" component={ Recipe } />
        <Route path="/drinks" component={ Drinks } />
        <Route path="/meals/:id" component={ Recipe } />
        <Route path="/meals" component={ Meals } />
        <Route exact path="/" component={ Login } />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
