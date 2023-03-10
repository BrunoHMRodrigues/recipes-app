import React, { useState } from 'react';
import CardRecipe from '../components/CardRecipe';
import CardFilters from '../components/CardFilters';
import Header from '../components/Header';
import Footer from '../components/Footer';

// const favoriteRecipes = [
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
// localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));

function FavoriteRecipes() {
  const [filterBy, setFilterBy] = useState('all');

  const localFavoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
  const [favoriteRecipes, setFavoriteRecipes] = useState(localFavoriteRecipes);

  return (
    <>
      <Header />
      <div className="d-flex flex-column justify-content-center align-items-center">
        <CardFilters setFilterBy={ setFilterBy } />

        {
          favoriteRecipes
            .filter((recipe) => (recipe.type === filterBy || filterBy === 'all'))
            .map((recipe, index) => (<CardRecipe
              recipe={ recipe }
              setFavoriteRecipes={ setFavoriteRecipes }
              index={ index }
              key={ recipe.id }
            />))
        }
      </div>
      <Footer />
    </>
  );
}

export default FavoriteRecipes;
