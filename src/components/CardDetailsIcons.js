import React from 'react';
import PropTypes from 'prop-types';
import clipboardCopy from 'clipboard-copy';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function CardDetailsIcons({ idReceita, meals, drinks, foodOrDrink, FOOD, DRINK,
  linkIsCopied, setLinkIsCopied, recipeIsFavorited, setRecipeIsFavorited }) {
  const handleShare = () => {
    const copy = clipboardCopy;
    let type = '';

    if (foodOrDrink === FOOD) {
      type = 'meals';
    }
    if (foodOrDrink === DRINK) {
      type = 'drinks';
    }
    const linkToShare = `http://localhost:3000/${type}/${idReceita}`;
    copy(linkToShare);
    setLinkIsCopied(true);
  };

  const handleFavorite = () => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (recipeIsFavorited) {
      const newFavoriteRecipes = favoriteRecipes
        .filter((getRecipe) => Number(getRecipe.id) !== Number(idReceita));
      localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoriteRecipes));
      setRecipeIsFavorited(false);
    } else {
      let newFavoriteRecipes = favoriteRecipes;
      if (!newFavoriteRecipes) {
        newFavoriteRecipes = [];
      }
      if (foodOrDrink === FOOD) {
        const recipe = {
          id: meals.idMeal,
          type: 'meal',
          nationality: meals.strArea,
          category: meals.strCategory,
          alcoholicOrNot: '',
          name: meals.strMeal,
          image: meals.strMealThumb,
        };
        newFavoriteRecipes.push(recipe);
        localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoriteRecipes));
        setRecipeIsFavorited(true);
      }
      if (foodOrDrink === DRINK) {
        const recipe = {
          id: drinks.idDrink,
          type: 'drink',
          nationality: '',
          category: drinks.strCategory,
          alcoholicOrNot: drinks.strAlcoholic,
          name: drinks.strDrink,
          image: drinks.strDrinkThumb,
        };
        newFavoriteRecipes.push(recipe);
        localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoriteRecipes));
        setRecipeIsFavorited(true);
      }
    }
  };
  return (
    <div className="d-flex">
      <button
        type="button"
        onClick={ handleShare }
        className="d-flex align-items-center
              justify-content-center button-share-icon"
      >
        <img
          src={ shareIcon }
          alt="Share Icon"
          data-testid="share-btn"
        />
      </button>
      {linkIsCopied && <p className="msg-copy">Link copied!</p>}
      <button
        type="button"
        onClick={ handleFavorite }
        className="button-favorite-icon"
      >
        <img
          src={ recipeIsFavorited ? blackHeartIcon : whiteHeartIcon }
          alt="Favorite Icon"
          data-testid="favorite-btn"
        />
      </button>
    </div>
  );
}

CardDetailsIcons.propTypes = {
  idReceita: PropTypes.string.isRequired,
  meals: PropTypes.shape({
    idMeal: PropTypes.string.isRequired,
    strArea: PropTypes.string.isRequired,
    strCategory: PropTypes.string.isRequired,
    strMeal: PropTypes.string.isRequired,
    strMealThumb: PropTypes.string.isRequired,
  }).isRequired,
  drinks: PropTypes.shape({
    idDrink: PropTypes.string.isRequired,
    strCategory: PropTypes.string.isRequired,
    strAlcoholic: PropTypes.string.isRequired,
    strDrink: PropTypes.string.isRequired,
    strDrinkThumb: PropTypes.string.isRequired,
  }).isRequired,
  foodOrDrink: PropTypes.string.isRequired,
  FOOD: PropTypes.string.isRequired,
  DRINK: PropTypes.string.isRequired,
  linkIsCopied: PropTypes.bool.isRequired,
  setLinkIsCopied: PropTypes.func.isRequired,
  recipeIsFavorited: PropTypes.string.isRequired,
  setRecipeIsFavorited: PropTypes.func.isRequired,
};

export default CardDetailsIcons;
