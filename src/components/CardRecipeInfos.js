import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import clipboardCopy from 'clipboard-copy';
import CardTags from './CardTags';
// import shareIcon from '../images/yellowShareIcon.png';
// import heartIcon from '../images/heartIcon.png';
import shareIcon from '../images/shareIcon.svg';
import heartIcon from '../images/blackHeartIcon.svg';
import '../styles/genericStyles.css';
import './CardRecipe.css';

function CardRecipeInfos({ index, id, name, type, nationality,
  category, alcoholicOrNot, doneDate, tags, linkIsCopied,
  setLinkIsCopied, setFavoriteRecipes }) {
  const handleShare = async () => {
    const linkToShare = `http://localhost:3000/${type}s/${id}`;
    try {
      await clipboardCopy(linkToShare);
      setLinkIsCopied(true);
      console.log('Texto copiado com sucesso!');
    } catch (error) {
      console.error('Erro ao copiar texto: ', error);
    }
  };

  const handleUnfavorite = ({ target }) => {
    const { id: idRecipe } = target;
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const newFavoriteRecipes = favoriteRecipes
      .filter((getRecipe) => Number(getRecipe.id) !== Number(idRecipe));
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoriteRecipes));
    setFavoriteRecipes(newFavoriteRecipes);
  };

  const history = useHistory();
  const { location: { pathname } } = history;
  const donePath = '/done-recipes';

  return (

    <div className={ pathname === donePath ? 'done-info' : 'favorite-info' }>
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

    </div>
  );
}

CardRecipeInfos.propTypes = {
  id: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  nationality: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  alcoholicOrNot: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  doneDate: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  index: PropTypes.number.isRequired,
  linkIsCopied: PropTypes.bool.isRequired,
  setLinkIsCopied: PropTypes.func.isRequired,
  setFavoriteRecipes: PropTypes.func.isRequired,
};

export default CardRecipeInfos;
