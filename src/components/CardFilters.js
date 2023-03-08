import React from 'react';
import PropTypes from 'prop-types';
import allIcon from '../images/allIcon.png';
import mealIcon from '../images/mealIcon.png';
import drinkIcon from '../images/drinkIcon.png';
import './CardFilters.css';
import '../styles/genericStyles.css';

function CardFilters({ setFilterBy }) {
  const handleFilters = ({ target }) => {
    const { name } = target;
    setFilterBy(name);
  };

  return (
    <div className="d-flex justify-content-evenly w-100">

      <div className="container-button-filter">
        <button
          type="button"
          data-testid="filter-by-all-btn"
          className="filter-button-recipes"
          onClick={ handleFilters }
          name="all"
          id="btn-all"
        >
          <img
            src={ allIcon }
            alt="All Icon"
            name="all"
          />
        </button>
        <label htmlFor="btn-all">All</label>
      </div>

      <div className="container-button-filter">
        <button
          type="button"
          data-testid="filter-by-meal-btn"
          className="filter-button-recipes"
          onClick={ handleFilters }
          name="meal"
          id="btn-meal"
        >
          <img
            src={ mealIcon }
            alt="Meal Icon"
            name="meal"
          />
        </button>
        <label htmlFor="btn-meal">Meals</label>

      </div>

      <div className="container-button-filter">
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          className="filter-button-recipes"
          onClick={ handleFilters }
          name="drink"
          id="drink"
        >
          <img
            src={ drinkIcon }
            alt="Drink Icon"
            name="drink"
          />
        </button>
        <label htmlFor="btn-drink">Drinks</label>
      </div>
    </div>
  );
}

CardFilters.propTypes = {
  setFilterBy: PropTypes.func.isRequired,
};

export default CardFilters;
