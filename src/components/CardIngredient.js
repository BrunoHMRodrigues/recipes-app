import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './CardIngredient.css';
import { useHistory } from 'react-router-dom';

function CardIngredient({ ingredient,
  index,
  idReceita,
  measure,
  ingredientsMarked,
  setIngredientsMarked }) {
  const history = useHistory();
  const { location: { pathname } } = history;

  const [ingredientIsDone, setIngredientIsDone] = useState();

  // verificar se a página é referente a comida ou bebida
  let type = '';
  if (pathname.includes('/meals/')) {
    type = 'meals';
  }
  if (pathname.includes('/drinks/')) {
    type = 'drinks';
  }
  // setar states quando componente monta
  useEffect(() => {
    const inProgressStored = JSON.parse(localStorage.getItem('inProgressRecipes'));

    if (inProgressStored[type][idReceita]) {
      const ingredients = inProgressStored[type][idReceita];
      setIngredientsMarked(ingredients);
      const isDone = ingredients
        .some((item) => item === `${ingredient}${measure}`);
      setIngredientIsDone(isDone);
    }
  }, [idReceita, ingredient, measure, pathname, type, setIngredientsMarked]);

  const handleCheck = ({ target }) => {
    const inProgressStoraged = JSON.parse(localStorage.getItem('inProgressRecipes'));
    setIngredientIsDone(target.checked);

    // Definir o array que será colocado
    if (target.checked) { // Se marcar: Adicionar o item ao array
      const ingredients = [...ingredientsMarked, target.id];
      setIngredientsMarked(ingredients);
      // if (pathname.includes('/meals/')) {
      inProgressStoraged[type][idReceita] = ingredients;
      // }
      localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressStoraged));
    } else { // Se desmarcar: Retirar o item do array
      const ingredients = [...ingredientsMarked];
      const newIngredients = ingredients.filter((item) => item !== target.id);
      setIngredientsMarked(newIngredients);
      // if (pathname.includes('/meals/')) {
      inProgressStoraged[type][idReceita] = newIngredients;
      // }
      localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressStoraged));
    }
  };
  return (
    pathname.includes('/in-progress') ? (
      <div className="d-flex ingredient m-1">
        <label
          htmlFor={ `${ingredient}${measure}` }
          data-testid={ `${index}-ingredient-step` }
          className={ ingredientIsDone && 'ingredient-checked' }
        >
          <input
            type="checkbox"
            value={ ingredient }
            id={ `${ingredient}${measure}` }
            className="me-2"
            onChange={ handleCheck }
            checked={ ingredientIsDone }
          />
          {`${ingredient}${measure}`}
        </label>
      </div>
    ) : (
      <p
        data-testid={ `${index}-ingredient-name-and-measure` }
        className="ingredient"
      >
        { `${ingredient} ${measure}` }
      </p>
    )
  );
}

CardIngredient.propTypes = {
  ingredient: PropTypes.string.isRequired,
  measure: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  idReceita: PropTypes.number.isRequired,
  ingredientsMarked: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  setIngredientsMarked: PropTypes.func.isRequired,
};

export default CardIngredient;
