import React, { useState } from 'react';
import PropTypes from 'prop-types';
// import { useHistory } from 'react-router-dom';
// import clipboardCopy from 'clipboard-copy';
// import CardTags from './CardTags';
// import shareIcon from '../images/yellowShareIcon.png';
// import heartIcon from '../images/heartIcon.png';
import './CardRecipe.css';
import '../styles/genericStyles.css';
import CardRecipeInfos from './CardRecipeInfos';

function CardRecipe({ recipe, index, setFavoriteRecipes }) {
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

  // const history = useHistory();
  const [linkIsCopied, setLinkIsCopied] = useState(false);

  // const donePath = '/done-recipes';

  // const [favoriteRecipes, setFavoriteRecipes] = useState();

  // const handleShare = () => {
  //   const copy = clipboardCopy;
  //   const linkToShare = `http://localhost:3000/${type}s/${id}`;
  //   copy(linkToShare);
  //   setLinkIsCopied(true);
  // };

  // const handleUnfavorite = ({ target }) => {
  //   const { id: idRecipe } = target;
  //   const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
  //   const newFavoriteRecipes = favoriteRecipes
  //     .filter((getRecipe) => Number(getRecipe.id) !== Number(idRecipe));
  //   localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoriteRecipes));
  //   setFavoriteRecipes(newFavoriteRecipes);
  // };

  // const { location: { pathname } } = history;

  return (
    <div
      data-testid="container-recipes"
      className="d-flex justify-content-start align-items-center
    m-2 container-recipes"
    >
      <a href={ `/${type}s/${id}` } className="detail-recipe-image">
        <img
          src={ image }
          alt={ name }
          data-testid={ `${index}-horizontal-image` }
          className="w-100 h-100"
        />
      </a>

      <CardRecipeInfos
        index={ index }
        id={ id }
        name={ name }
        type={ type }
        nationality={ nationality }
        category={ category }
        alcoholicOrNot={ alcoholicOrNot }
        doneDate={ doneDate }
        tags={ tags }
        linkIsCopied={ linkIsCopied }
        setLinkIsCopied={ setLinkIsCopied }
        setFavoriteRecipes={ setFavoriteRecipes }
      />
      {/* <div className={ pathname === donePath ? 'done-info' : 'favorite-info' }>
        <div className="container-recipe-info">
          <a href={ `/${type}s/${id}` }>
            <p
              data-testid={ `${index}-horizontal-name` }
              className="recipe-name text-center m-2"
            >
              {name}
            </p>
          </a>

          <p
            data-testid={ `${index}-horizontal-top-text` }
            className="recipe-category"
          >
            {type === 'meal' ? `${nationality} - ${category}` : alcoholicOrNot}
          </p>

          {pathname === donePath && (
            <p
              data-testid={ `${index}-horizontal-done-date` }
              className="done-date"
            >
              {`done in: ${doneDate}`}
            </p>
          )}

          { (type === 'meal' && pathname === donePath) && (
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

        <div className="container-recipe-icons">
          <div className="container-share">
            <button
              type="button"
              // data-testid={ `${index}-horizontal-share-btn` }
              onClick={ handleShare }
              className="d-flex align-items-center
              justify-content-center button-share-icon"
            >
              <img
                src={ shareIcon }
                alt="Share Icon"
                data-testid={ `${index}-horizontal-share-btn` }
                // className="share-icon"
              />
            </button>
            {linkIsCopied && <p className="msg-copy">Link copied!</p>}
          </div>
          {history.location.pathname === '/favorite-recipes' && (
            <button
              type="button"
              onClick={ handleUnfavorite }
              id={ id }
              className="button-favorite-icon"
            >
              <img
                src={ heartIcon }
                alt="Favorite Icon"
                id={ id }
                data-testid={ `${index}-horizontal-favorite-btn` }
              />
            </button>
          )}

        </div>

      </div> */}
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
  setFavoriteRecipes: PropTypes.func.isRequired,
};

export default CardRecipe;
