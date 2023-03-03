import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <div className="meals">
      <Header />
      <Switch>
        <Route exact path="/" component={ Login } />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
