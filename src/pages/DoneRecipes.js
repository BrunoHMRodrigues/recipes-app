import React, { useState } from 'react';
import CardFilters from '../components/CardFilters';
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

  let doneRecipesStored = JSON.parse(localStorage.getItem('doneRecipes'));
  if (!doneRecipesStored) {
    console.log('entrou');
    doneRecipesStored = [];
    localStorage.setItem('doneRecipes', JSON.stringify(doneRecipesStored));
  }

  const getDoneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
  console.log(getDoneRecipes);
  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <CardFilters setFilterBy={ setFilterBy } />

      {
        getDoneRecipes
          .filter((recipe) => (recipe.type === filterBy || filterBy === 'all'))
          .map((recipe, index) => (<CardRecipe
            recipe={ recipe }
            index={ index }
            key={ recipe.id }
          />))
      }
    </div>
  );
}

export default DoneRecipes;
