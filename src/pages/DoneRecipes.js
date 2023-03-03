import React, { useState } from 'react';
import CardRecipe from '../components/CardRecipe';
import './DoneRecipes.css';

// const doneRecipes = [
//   {
//     id: 52770,
//     type: 'meal',
//     nationality: 'Italian',
//     category: 'Beef',
//     alcoholicOrNot: '',
//     name: 'Spaghetti Bolognese',
//     image: 'https://www.themealdb.com/images/media/meals/sutysw1468247559.jpg',
//     doneDate: '20/06/2023',
//     tags: ['italian', 'paste'],
//   },
//   {
//     id: 11007,
//     type: 'drink',
//     nationality: '',
//     category: '',
//     alcoholicOrNot: 'Alcoholic',
//     name: 'Margarita',
//     image: 'https://www.thecocktaildb.com/images/media/drink/5noda61589575158.jpg',
//     doneDate: '20/06/2023',
//     tags: [],
//   },
// ];
// localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));

function DoneRecipes() {
  const [filterBy, setFilterBy] = useState('all');

  const handleFilters = ({ target }) => {
    const { name } = target;
    setFilterBy(name);
  };

  const getDoneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
  return (
    <div className="d-flex flex-column justify-content-center">
      <div className="d-flex justify-content-evenly">
        <button
          type="button"
          data-testid="filter-by-all-btn"
          className="filter-button-done-recipes"
          onClick={ handleFilters }
          name="all"
        >
          All
        </button>

        <button
          type="button"
          data-testid="filter-by-meal-btn"
          className="filter-button-done-recipes"
          onClick={ handleFilters }
          name="meal"
        >
          Meals
        </button>

        <button
          type="button"
          data-testid="filter-by-drink-btn"
          className="filter-button-done-recipes"
          onClick={ handleFilters }
          name="drink"
        >
          Drinks
        </button>
      </div>

      {
        getDoneRecipes
          .filter((recipe) => (recipe.type === filterBy || filterBy === 'all'))
          .map((recipe, index) => (<CardRecipe
            recipe={ recipe }
            index={ index }
            key={ recipe.id }
          />))
      }

      {/* {getDoneRecipes.map((recipe, index) => (<CardRecipe
        recipe={ recipe }
        index={ index }
        key={ recipe.id }
      />))} */}

    </div>
  );
}

export default DoneRecipes;
