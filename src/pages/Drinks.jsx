import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useLocation, Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { fetchFood, fetchCategories, fetchByCategory } from '../redux/actions/actions';
import './recipes.css';

export default function Drinks() {
  const foods = useSelector((state) => state.recipes.foods) || [];
  const categories = useSelector((state) => state.recipes.categories) || [];
  const searched = useSelector((state) => state.recipes.searched);
  const { pathname } = useLocation();
  const foodType = pathname === '/meals' ? 'meals' : 'drinks';
  const [searchedByCategory, setSearchedByCategory] = useState('');
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    if (searched && foods.length === 1) {
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
      {!pathname.includes('/drinks/') && <Header />}
      <div className="padding">
        {categories.map(({ strCategory: category }, index) => {
          const MAX_LENGTH = 5;
          if (index < MAX_LENGTH) {
            return (
              <button
                type="button"
                data-testid={ `${category}-category-filter` }
                key={ category }
                onClick={
                  (searchedByCategory === category)
                    ? () => {
                      setSearchedByCategory('');
                      dispatch(fetchFood({ foodType, endPoint: 's' }));
                    }
                    : (() => {
                      setSearchedByCategory(category);
                      dispatch(fetchByCategory({ foodType, category }));
                    })
                }
              >
                {category}
              </button>
            );
          }
          return null;
        })}
        <button
          type="button"
          data-testid="All-category-filter"
          onClick={ () => dispatch(fetchFood({ foodType, endPoint: 's' })) }
        >
          All
        </button>
      </div>
      <div className="padding">
        {foods.map((food, index) => {
          const MAX_LENGTH = 12;
          if (index < MAX_LENGTH) {
            return (
              <Link
                to={ `drinks/${food.idDrink}` }
                key={ food.idDrink }
                data-testid={ `${index}-recipe-card` }
              >
                <img
                  src={ food.strDrinkThumb }
                  alt=""
                  style={ { width: '40px' } }
                  data-testid={ `${index}-card-img` }
                />
                <p data-testid={ `${index}-card-name` }>{food.strDrink}</p>
              </Link>
            );
          }
          return null;
        })}
      </div>
      {!pathname.includes('/meals/') && <Footer />}
    </>
  );
}
