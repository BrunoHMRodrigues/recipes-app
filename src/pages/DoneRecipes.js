import React from 'react';
import CardRecipe from '../components/CardRecipe';
import './DoneRecipes.css';

// const doneRecipes = [{
//   id: 52770,
//   type: 'meal',
//   nationality: 'Italian',
//   category: 'Beef',
//   alcoholicOrNot: '',
//   name: 'Spaghetti Bolognese',
//   image: 'https://www.themealdb.com/images/media/meals/sutysw1468247559.jpg',
//   doneDate: '20/06/2023',
//   tags: ['italian', 'paste'],
// }];
// localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
function DoneRecipes() {
  const getDoneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
  return (
    <div className="d-flex flex-column justify-content-center">
      <div className="d-flex justify-content-evenly">
        <button
          type="button"
          data-testid="filter-by-all-btn"
          className="filter-button-done-recipes"
        >
          All
        </button>

        <button
          type="button"
          data-testid="filter-by-meal-btn"
          className="filter-button-done-recipes"
        >
          Meals
        </button>

        <button
          type="button"
          data-testid="filter-by-drink-btn"
          className="filter-button-done-recipes"
        >
          Drinks
        </button>
      </div>

      {getDoneRecipes.map((recipe, index) => (<CardRecipe
        recipe={ recipe }
        index={ index }
        key={ recipe.id }
      />))}

    </div>
  );
}

export default DoneRecipes;
