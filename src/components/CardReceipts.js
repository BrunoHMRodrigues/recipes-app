import React from 'react';
import PropTypes from 'prop-types';
import CardTags from './CardTags';
import shareIcon from '../images/shareIcon.svg';

function CardReceipts({ receipt, index }) {
  const { name, image, tags, category, doneDate } = receipt;
  console.log('tags');
  console.log(tags);
  return (
    <div className="d-flex">
      <img
        src={ image }
        alt={ name }
        data-testid={ `${index}-horizontal-image` }
      />
      <div className="d-flex flex-column">
        <p data-testid={ `${index}-horizontal-name` }>{name}</p>
        <p data-testid={ `${index}-horizontal-top-text` }>{category}</p>
        <p data-testid={ `${index}-horizontal-done-date` }>{doneDate}</p>

        <section>
          {tags
            .map((tag) => (<CardTags
              tag={ tag }
              index={ index }
              key={ tag }
            />))}
        </section>
      </div>
      <img
        src={ shareIcon }
        alt="shareIcon"
        data-testid={ `${index}-horizontal-share-btn` }
      />
    </div>
  );
}

CardReceipts.propTypes = {
  receipt: PropTypes.shape({
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    category: PropTypes.string.isRequired,
    doneDate: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

export default CardReceipts;
