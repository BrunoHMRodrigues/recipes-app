import React, { useEffect, useCallback, useState } from 'react';
import { act } from 'react-dom/test-utils';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { fetchDrinks, fetchMeals } from '../redux/actions/detailsAction';
import CardIngredient from '../components/CardIngredient';
import './RecipeDetails.css';
import CardDetailsIcons from '../components/CardDetailsIcons';

function RecipeInProgress() {
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

  // const [recipeIsDone, setRecipeIsDone] = useState(false);
  // const [recipeIsInProgress, setRecipeIsInProgress] = useState(false);
  const [linkIsCopied, setLinkIsCopied] = useState(false);
  const [recipeIsFavorited, setRecipeIsFavorited] = useState(false);
  const [ingredientsMarked, setIngredientsMarked] = useState([]);
  const [allIngredientsChecked, setAllIngredientsChecked] = useState(false);

  // Verificar se existe algo no localStorage na chave inProgressRecipes e se não seta um valor inicial
  // Objetivo: Impedir erros caso a chave não exista no localStorage
  useEffect(() => {
    let inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (!inProgressRecipes) {
      inProgressRecipes = {
        drinks: {},
        meals: {},
      };
      localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
    }
  }, []);

  // Verifica se a receita esta favoritada e seta o state de acordo
  // Objetivo: renderização correta do botão de favoritar
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

  const { meals, drinks } = useSelector((state) => state.recipeReducer);

  // Função para criar a lista de ingredientes
  const list = useCallback(() => {
    if (foodOrDrink && (meals || drinks)) {
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
    }
  }, [foodOrDrink, meals, drinks]);

  useEffect(() => {
    const ingredients = list(foodOrDrink, meals, drinks);
    if (foodOrDrink && ingredients && ingredientsMarked.length === ingredients.length) {
      setAllIngredientsChecked(true);
    } else {
      setAllIngredientsChecked(false);
    }
  }, [list, ingredientsMarked, foodOrDrink, meals, drinks]);

  if (meals === null && drinks === null) {
    return <h1>Carregando...</h1>;
  }

  const handleFinishRecipe = () => {
    history.push('/done-recipes');
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
            {list(foodOrDrink, meals, drinks).map((ingredient, index) => (
              <CardIngredient
                ingredient={ ingredient.ingredient }
                measure={ ingredient.measure }
                index={ index }
                key={ index }
                idReceita={ idReceita }
                ingredientsMarked={ ingredientsMarked }
                setIngredientsMarked={ setIngredientsMarked }
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

        <button
          className="btn-start-recipe"
          type="button"
          disabled={ !allIngredientsChecked }
          data-testid="finish-recipe-btn"
          onClick={ handleFinishRecipe }
        >
          FINALIZAR RECIPE
        </button>
      </div>
    )
  );
}

export default RecipeInProgress;
