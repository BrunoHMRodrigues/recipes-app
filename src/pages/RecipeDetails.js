import React, { useEffect, useState } from 'react';
import { act } from 'react-dom/test-utils';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { fetchDrinks, fetchMeals } from '../redux/actions/detailsAction';
import CardIngredient from '../components/CardIngredient';
import './RecipeDetails.css';
import CardDetailsIcons from '../components/CardDetailsIcons';

// const inProgressRecipes = {
//   meals: {
//     52770: [],
//   },
// };
// localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));

function RecipeDetails() {
  const [foodOrDrink, setFoodOrDrink] = useState('');
  const FOOD = 'Meal';
  const DRINK = 'Drink';

  const { idReceita } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    const { location: { pathname } } = history;
    if (pathname.includes('/meals/')) {
      act(() => {
        dispatch(fetchMeals(idReceita));
      });
      setFoodOrDrink(FOOD);
    } else {
      dispatch(fetchDrinks(idReceita));
      setFoodOrDrink(DRINK);
    }
  }, [idReceita, dispatch, history]);

  const [recipeIsDone, setRecipesDone] = useState(false);
  const [recipeIsInProgress, setRecipeIsInProgress] = useState(false);
  const [linkIsCopied, setLinkIsCopied] = useState(false);
  const [recipeIsFavorited, setRecipeIsFavorited] = useState(false);

  const { meals, drinks } = useSelector((state) => state.recipeReducer);

  const checkRecipeIsDone = (doneRecipes, target) => {
    if (doneRecipes && target) {
      return doneRecipes.some((recipe) => recipe.id === target.id);
    }
    return false;
  };

  useEffect(() => {
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const target = foodOrDrink === FOOD ? meals : drinks;

    const checkRecipeIsInProgress = () => {
      if (inProgressRecipes && target) {
        if (foodOrDrink === FOOD && inProgressRecipes.meals) {
          return Object.keys(inProgressRecipes.meals).includes(target.idMeal);
        }
        if (foodOrDrink === DRINK && inProgressRecipes.drinks) {
          return Object.keys(inProgressRecipes.drinks).includes(target.idDrink);
        }
      }
      return false;
    };

    setRecipesDone(checkRecipeIsDone(doneRecipes, target));
    setRecipeIsInProgress(checkRecipeIsInProgress());
  }, [drinks, foodOrDrink, meals]);

  useEffect(() => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (favoriteRecipes) {
      for (let index = 0; index < favoriteRecipes.length; index += 1) {
        if (favoriteRecipes[index].id === idReceita) {
          setRecipeIsFavorited(true);
          return;
        }
      }
      setRecipeIsFavorited(false);
    }
  }, [idReceita]);

  const list = () => {
    const target = foodOrDrink === FOOD ? meals : drinks;
    const ingredients = [];
    const maxLength = 20;
    for (let index = 1; index < maxLength; index += 1) {
      const ingredient = target[`strIngredient${index}`];
      const measure = target[`strMeasure${index}`];
      if (ingredient) {
        ingredients.push({ ingredient, measure });
      }
    }
    return ingredients.filter((ingredient) => ingredient);
  };

  if (meals === null && drinks === null) {
    return <h1>Carregando...</h1>;
  }

  const handleStartRecipe = () => {
    const { location: { pathname } } = history;
    history.push(`${pathname}/in-progress`);
  };

  return (
    foodOrDrink && (
      <div className="container-detail-page app-container pb-5">
        <div className="recipe-photo">
          <img
            src={ foodOrDrink === FOOD ? meals.strMealThumb : drinks.strDrinkThumb }
            alt={ foodOrDrink === FOOD ? meals.strMeal : drinks.strDrink }
            data-testid="recipe-photo"
          />
        </div>
        <CardDetailsIcons
          idReceita={ idReceita }
          meals={ meals }
          drinks={ drinks }
          foodOrDrink={ foodOrDrink }
          FOOD={ FOOD }
          DRINK={ DRINK }
          linkIsCopied={ linkIsCopied }
          setLinkIsCopied={ setLinkIsCopied }
          recipeIsFavorited={ recipeIsFavorited }
          setRecipeIsFavorited={ setRecipeIsFavorited }
        />
        <div>
          <h1 data-testid="recipe-title">
            { foodOrDrink === FOOD ? meals.strMeal : drinks.strDrink }
          </h1>
          <p data-testid="recipe-category">
            {
              foodOrDrink === FOOD ? meals.strCategory : drinks.strAlcoholic
            }
          </p>
        </div>
        <div>
          <h3 className="subtitle-details">Ingredientes:</h3>
          <div className="container-ingredients font-14 height-ingredient">
            {list().map((ingredient, index) => (
              <CardIngredient
                ingredient={ ingredient.ingredient }
                measure={ ingredient.measure }
                index={ index }
                key={ index }
              />
            ))}
          </div>
        </div>
        <div>
          <h3 className="subtitle-details">Instructions:</h3>
          <article
            data-testid="instructions"
            className="container-ingredients font-14 p-3 height-instructions"
          >
            {
              foodOrDrink === FOOD ? meals.strInstructions : drinks.strInstructions
            }

          </article>
        </div>
        {foodOrDrink === FOOD
        && (
          <div>
            <h3 className="subtitle-details">Video:</h3>
            <iframe
              // frameBorder="0"
              allow="accelerometer;
            clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              width="320"
              height="240"
              title={ `videoYoutube ${meals.strMeal}` }
              src={ meals.strYoutube }
              data-testid="video"
            />
          </div>
        )}
        {/* Espaço para recomendações  */}
        <div>
          <h3 className="subtitle-details">Recommended:</h3>

        </div>
        {!recipeIsDone && (
          <button
            className="btn-start-recipe"
            type="button"
            data-testid="start-recipe-btn"
            onClick={ handleStartRecipe }
          >
            { recipeIsInProgress ? 'Continue Recipe' : 'Start Recipe' }
          </button>
        )}
      </div>
    )
  );
}

export default RecipeDetails;
