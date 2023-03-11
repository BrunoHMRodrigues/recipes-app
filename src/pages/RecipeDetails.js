import React, { useCallback, useEffect, useState } from 'react';
import { act } from 'react-dom/test-utils';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { fetchDrinks, fetchMeals } from '../redux/actions/detailsAction';
import CardIngredient from '../components/CardIngredient';
import CardDetailsIcons from '../components/CardDetailsIcons';
import './RecipeDetails.css';

// const inProgressRecipes = {
//   drinks: {
//     11008: [],
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

  const [recipeIsDone, setRecipeIsDone] = useState(false);
  const [recipeIsInProgress, setRecipeIsInProgress] = useState(false);
  const [linkIsCopied, setLinkIsCopied] = useState(false);
  const [recipeIsFavorited, setRecipeIsFavorited] = useState(false);

  const { meals, drinks } = useSelector((state) => state.recipeReducer);

  // Verificar se a receita já foi feita
  // Objetivo: Alimentar o valor do setRecipeIsDone para renderização correta do botão
  const checkRecipeIsDone = useCallback((doneRecipes, target) => {
    if (doneRecipes && target) {
      return doneRecipes.some((recipe) => Number(recipe.id) === Number(
        foodOrDrink === FOOD ? target.idMeal : target.idDrink,
      ));
    }
    return false;
  }, [foodOrDrink]);

  // Verifica se receita já foi feita ou se está em progresso e seta de acordo
  // Objetivo: Alterar mensagem do botão de acordo ou não renderizá-lo se necessário
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

    setRecipeIsDone(checkRecipeIsDone(doneRecipes, target));
    setRecipeIsInProgress(checkRecipeIsInProgress());
  }, [drinks, foodOrDrink, meals, checkRecipeIsDone]);

  // Verificar se existe algo no localStorage na chave inProgressRecipes e se não seta um valor inicial
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

  // Verifica se receita está favoritada e seta state de acordo
  // Objetivo: Renderização correta do btão de favoritar
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

  // Função para obter a lista de ingredientes
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
      <div className="container-detail-page app-container">
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
        <div className="d-flex flex-column align-items-center">
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
