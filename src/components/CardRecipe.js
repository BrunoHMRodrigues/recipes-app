import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import clipboardCopy from 'clipboard-copy';
import CardTags from './CardTags';
import shareIcon from '../images/shareIcon.svg';
import favoriteIcon from '../images/blackHeartIcon.svg';
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
    const linkToShare = `http://localhost:3000/${type}s/${id}`;
    copy(linkToShare);
    setLinkIsCopied(true);
  };

  const { location: { pathname } } = history;

  return (
    <div
      data-testid="container-done-recipes" // rever isso
      className="d-flex align-items-start
    justify-content-between m-2 container-doce-recipes"
    >
      <a href={ `/${type}s/${id}` } className="detail-recipe-image">
        <img
          src={ image }
          alt={ name }
          data-testid={ `${index}-horizontal-image` }
          className="w-100 h-100"
        />
      </a>
      <div className="container-done-recipes-info">
        <a href={ `/${type}s/${id}` }>
          <p data-testid={ `${index}-horizontal-name` }>{name}</p>
        </a>

        <p
          data-testid={ `${index}-horizontal-top-text` }
        >
          {type === 'meal' ? `${nationality} - ${category}` : alcoholicOrNot}
        </p>

        {pathname === '/done-recipes' && (
          <p data-testid={ `${index}-horizontal-done-date` }>{doneDate}</p>
        )}

        { (type === 'meal' && pathname === '/done-recipes') && (
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
      <div>
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
        {history.location.pathname === '/favorite-recipes' && (
          <button type="button">
            <img
              src={ favoriteIcon }
              alt="Favorite Icon"
              data-testid={ `${index}-horizontal-favorite-btn` }
            />
          </button>
        )}

      </div>
    </div>
  );
}

CardRecipe.propTypes = {
  recipe: PropTypes.shape({
    id: PropTypes.number.isRequired,
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
