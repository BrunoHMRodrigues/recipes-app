import React, { useEffect, useState } from 'react';
import { act } from 'react-dom/test-utils';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { fetchDrinks, fetchMeals } from '../redux/actions/detailsAction';
import CardIngredient from '../components/CardIngredient';
import './RecipeDetails.css';

function RecipeDetails() {
  const [foodOrDrink, setFoodOrDrink] = useState('');
  const FOOD = 'Meal';
  const DRINK = 'Drink';

  // useParams serve para extrair o id da rota
  const { idReceita } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    const { location: { pathname } } = history;
    console.log(pathname);
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

  const abc = useSelector((state) => state.recipeReducer);
  console.log(abc);
  const { meals, drinks } = abc;

  // list é uma função auxiliar que itera sobre os atributos strIngredient1, strIngredient2, ..., strIngredient20 do objeto meals e extrai os ingredientes da receita em um array. Essa função é utilizada posteriormente para renderizar a lista de ingredientes na página.
  const list = () => {
    const ingredients = [];
    const maxLength = 20;
    for (let index = 1; index < maxLength; index += 1) {
      const ingredient = meals[`strIngredient${index}`];
      const measure = meals[`strMeasure${index}`];
      // const measure = meals[strMeasure${index}];: Cria uma constante measure que contém o valor da chave "strMeasureX" em meals, onde X é o valor de index.
      if (ingredient) {
        ingredients.push({ ingredient, measure });
      }
    } console.log(ingredients);
    return ingredients.filter((ingredient) => ingredient);
  };

  // O trecho de código "if (meals === null && drinks === null)" verifica se a variável "meals" e "drinks" são nulas. Caso ambas as variáveis sejam nulas, a função retorna uma tag "h1" com o texto "Carregando...".

  if (meals === null && drinks === null) {
    return <h1>Carregando...</h1>;
  }

  return (
    foodOrDrink && (
      <div className="container-detail-page">
        <div className="recipe-photo">
          <img
            src={ foodOrDrink === FOOD ? meals.strMealThumb : drinks.strDrinkThumb }
            alt={ foodOrDrink === FOOD ? meals.strMeal : drinks.strDrink }
            data-testid="recipe-photo"
          />
        </div>
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
          <h3>Ingredientes:</h3>
          {list().map((ingredient, index) => (
            <CardIngredient
              ingredient={ ingredient.ingredient }
              measure={ ingredient.measure }
              index={ index }
              key={ index }
            />
          ))}
        </div>
        <article data-testid="instructions">
          {
            foodOrDrink === FOOD ? meals.strInstructions : drinks.strInstructions
          }

        </article>
        {foodOrDrink === FOOD
        && (
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
        )}
      </div>
    )
  );
}

export default RecipeDetails;
