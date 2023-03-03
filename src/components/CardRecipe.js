import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import clipboardCopy from 'clipboard-copy';
import CardTags from './CardTags';
import shareIcon from '../images/shareIcon.svg';
import './CardRecipe.css';

function CardRecipe({ recipe, index }) {
  const {
    id,
    type,
    nationality,
    category,
    alcoholicOrNot,
    name,
    image,
    doneDate,
    tags } = recipe;
  const history = useHistory();
  const [linkIsCopied, setLinkIsCopied] = useState(false);

  const handleShare = () => {
    const copy = clipboardCopy;
    console.log(history);
    const linkToShare = `http://localhost:3000/${type}s/${id}`;
    copy(linkToShare);
    setLinkIsCopied(true);
  };

  return (
    <div
      className="d-flex align-items-start
    justify-content-between m-2 container-doce-recipes"
    >
      <img
        src={ image }
        alt={ name }
        data-testid={ `${index}-horizontal-image` }
        className="detail-recipe-image"
      />
      <div className="container-done-recipes-info">
        <p data-testid={ `${index}-horizontal-name` }>{name}</p>

        <p
          data-testid={ `${index}-horizontal-top-text` }
        >
          {type === 'meal' ? `${nationality} - ${category}` : alcoholicOrNot}
        </p>

        <p data-testid={ `${index}-horizontal-done-date` }>{doneDate}</p>

        { type === 'meal' && (
          <section className="d-flex">
            {tags
              .map((tag) => (<CardTags
                tag={ tag }
                index={ index }
                key={ tag }
              />))}
          </section>
        )}
      </div>
      {/* <button
        type="button"
        src={ shareIcon.image }
        alt="Share Icon"
        data-testid={ `${index}-horizontal-share-btn` }
        onClick={ handleShare }
        className="d-flex align-items-center justify-content-center share-icon"
      /> */}
      <div className="container-share">
        <button
          type="button"
          // data-testid={ `${index}-horizontal-share-btn` }
          onClick={ handleShare }
          className="d-flex align-items-center justify-content-center button-share-icon"
        >
          <img
            src={ shareIcon }
            alt="Share Icon"
            data-testid={ `${index}-horizontal-share-btn` }
            className="share-icon"
          />
        </button>
        {linkIsCopied && <p className="msg-copy">Link copied!</p>}
      </div>
    </div>
  );
}

CardRecipe.propTypes = {
  recipe: PropTypes.shape({
    id: PropTypes.string.isRequired,
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
