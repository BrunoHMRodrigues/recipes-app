import React from 'react';
import PropTypes from 'prop-types';
import './CardIngredient.css';

function CardIngredient({ ingredient, index, measure }) {
  return (
    <p data-testid={ `${index}-ingredient-name-and-measure` } className="ingredient">
      { `${ingredient} ${measure}` }
    </p>
  );
}

CardIngredient.propTypes = {
  ingredient: PropTypes.string.isRequired,
  measure: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

export default CardIngredient;
