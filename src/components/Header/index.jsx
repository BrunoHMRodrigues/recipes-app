import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import appIcon from '../../assets/app_icon.svg';
import appName from '../../assets/app_name.svg';
import searchIcon from '../../images/searchIcon.svg';
import profileIcon from '../../images/profileIcon.svg';
import drinkIcon from '../../images/drinkGlassIcon.svg';
import mealIcon from '../../images/platesIcon.svg';
import favRecipeIcon from '../../images/favRecipeIcon.svg';
import doneRecipe from '../../images/doneRecipe.svg';
import profilePageIcon from '../../images/profilePageIcon.svg';
import styles from './styles.module.css';
import SearchBar from '../SearchBar/SearchBar';

function Header() {
  const location = useLocation();
  const { pathname } = location;
  const [searching, setSearching] = useState(false);

  function getPagesItems() {
    if (pathname === '/meals') {
      return { image: mealIcon, title: 'Meals' };
    } if (pathname === '/drinks') {
      return { image: drinkIcon, title: 'Drinks' };
    } if (pathname === '/favorite-recipes') {
      return { image: favRecipeIcon, title: 'Favorite Recipes' };
    } if (pathname === '/done-recipes') {
      return { image: doneRecipe, title: 'Done Recipes' };
    } if (pathname === '/profile') {
      return { image: profilePageIcon, title: 'Profile' };
    }
    return null;
  }

  return (
    <div>
      {
        pathname.includes('/meals/')
        || pathname === '/'
        || pathname.includes('/drinks/')
          ? null
          : (
            <div className={ styles.header }>
              <div className={ styles.upSide }>
                <NavLink to="/" className={ styles.leftSide }>
                  <img src={ appIcon } alt="logo" />
                  <img src={ appName } alt="recipe app" />
                </NavLink>

                <div className={ styles.rightSide }>
                  {
                    pathname === '/profile'
                  || pathname === '/favorite-recipes'
                  || pathname === '/done-recipes' ? null
                      : (
                        <button
                          data-testid="search-top-btn"
                          src={ searchIcon }
                          type="button"
                          alt="search icon"
                          onClick={ () => setSearching(!searching) }
                        >
                          <img src={ searchIcon } alt="search icon" />
                        </button>
                      )
                  }
                  <NavLink to="/profile">
                    <img data-testid="profile-top-btn" src={ profileIcon } alt="perfil" />
                  </NavLink>
                </div>
              </div>
              <div className={ styles.downSide }>
                <img src={ getPagesItems().image } alt={ getPagesItems().title } />
                <h2 data-testid="page-title">{ getPagesItems().title }</h2>
              </div>
              {searching && <SearchBar />}
            </div>
          )
      }
    </div>
  );
}

export default Header;
