import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { fetchFood, fetchCategories } from '../redux/actions/actions';

export default function Drinks() {
  const foods = useSelector((state) => state.recipes.foods) || [];
  const categories = useSelector((state) => state.recipes.categories) || [];
  const searched = useSelector((state) => state.recipes.searched);
  const { pathname } = useLocation();
  const foodType = pathname === '/meals' ? 'meals' : 'drinks';
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    if (foods.length === 1) {
      history.push(`/drinks/${foods[0].idDrink}`);
    }
    if (searched && foods.length === 0) {
      window.alert('Sorry, we haven\'t found any recipes for these filters.');
    }
  }, [foods]);

  useEffect(() => {
    dispatch(fetchFood({ foodType, endPoint: 's' }));
    dispatch(fetchCategories(foodType));
  }, []);

  return (
    <>
      {categories.map(({ strCategory }, index) => {
        const MAX_LENGTH = 5;
        if (index < MAX_LENGTH) {
          return (
            <button data-testid={ `${strCategory}-category-filter` } key={ strCategory }>
              {strCategory}
            </button>
          );
        }
        return null;
      })}
      {foods.map((food, index) => {
        const MAX_LENGTH = 12;
        if (index < MAX_LENGTH) {
          return (
            <div key={ food.idDrink } data-testid={ `${index}-recipe-card` }>
              <img
                src={ food.strDrinkThumb }
                alt=""
                style={ { width: '40px' } }
                data-testid={ `${index}-card-img` }
              />
              <p data-testid={ `${index}-card-name` }>{food.strDrink}</p>
            </div>
          );
        }
        return null;
      })}
    </>
  );
}
