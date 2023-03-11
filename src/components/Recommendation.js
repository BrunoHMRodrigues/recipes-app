import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { fetchFood } from '../redux/actions/actions';
import './Recommendation.css';

function Recommendation() {
  const { pathname } = useLocation();
  const foodType = pathname.includes('/meals/') ? 'drinks' : 'meals';
  const type = pathname.includes('/meals/') ? 'Drink' : 'Meal';
  const dispatch = useDispatch();
  const foods = useSelector((state) => state.recipes.foods) || [];
  const maxRecommendations = 6;

  useEffect(() => {
    dispatch(fetchFood({ foodType, endPoint: 's' }));
    // dispatch(fetchCategories(foodType));
  }, [dispatch, foodType]);
  return (
    <div className="d-flex container-recommendations">
      {foods.map((recipe, index) => (
        <div
          key={ recipe[`id${type}`] }
          data-testid={ `${index}-recommendation-card` }
          className="d-flex flex-column align-items-center container-recommendation "
        >
          <img
            src={ recipe[`str${type}Thumb`] }
            alt={ recipe[`str${type}`] }
            className="recommendation-image"
          />
          <p
            data-testid={ `${index}-recommendation-title` }
            className="m-0"
          >
            {recipe[`str${type}`]}
          </p>
        </div>
      )).filter((recipe, index) => index < maxRecommendations)}
    </div>
  );
}

export default Recommendation;
