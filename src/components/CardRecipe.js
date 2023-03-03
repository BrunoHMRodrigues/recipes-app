import React from 'react';
import PropTypes from 'prop-types';
import CardTags from './CardTags';
import shareIcon from '../images/shareIcon.svg';

function CardRecipe({ recipe, index }) {
  const {
    type,
    nationality,
    category,
    alcoholicOrNot,
    name,
    image,
    doneDate,
    tags } = recipe;
  return (
    <div className="d-flex">
      <img
        src={ image }
        alt={ name }
        data-testid={ `${index}-horizontal-image` }
      />
      <div className="d-flex flex-column">
        <p data-testid={ `${index}-horizontal-name` }>{name}</p>

        <p
          data-testid={ `${index}-horizontal-top-text` }
        >
          {type === 'meal' ? `${nationality} - ${category}` : alcoholicOrNot}
        </p>

        <p data-testid={ `${index}-horizontal-done-date` }>{doneDate}</p>

        { type === 'meal' && (
          <section>
            {tags
              .map((tag) => (<CardTags
                tag={ tag }
                index={ index }
                key={ tag }
              />))}
          </section>
        )}
      </div>
      <img
        src={ shareIcon }
        alt="shareIcon"
        data-testid={ `${index}-horizontal-share-btn` }
      />
    </div>
  );
}

CardRecipe.propTypes = {
  recipe: PropTypes.shape({
    type: PropTypes.string.isRequired,
    nationality: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    alcoholicOrNot: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    doneDate: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

export default CardRecipe;
