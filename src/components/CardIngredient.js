import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './CardIngredient.css';
import { useHistory } from 'react-router-dom';

function CardIngredient({ ingredient, index, measure }) {
  const history = useHistory();
  const { location: { pathname } } = history;

  const [ingredientIsDone, setIngredientIsDone] = useState();

  const handleCheck = ({ target }) => {
    setIngredientIsDone(target.checked);
  };
  return (
    // <div>
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

  // </div>

  // <p
  //   data-testid={ pathname.includes('/in-progress')
  //     ? `${index}-ingredient-step` : `${index}-ingredient-name-and-measure` }
  //   className="ingredient"
  // >
  //   { `${ingredient} ${measure}` }
  // </p>
  );
}

CardIngredient.propTypes = {
  ingredient: PropTypes.string.isRequired,
  measure: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

export default CardIngredient;
