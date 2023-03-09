import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function Drinks() {
  const foods = useSelector((state) => state.recipes.foods) || [];
  const searched = useSelector((state) => state.recipes.searched);
  const history = useHistory();
  const location = useLocation();
  const { pathname } = location;

  useEffect(() => {
    if (foods.length === 1) {
      history.push(`/drinks/${foods[0].idDrink}`);
    }
    if (searched && foods.length === 0) {
      window.alert('Sorry, we haven\'t found any recipes for these filters.');
    }
  }, [foods]);

  return (
    <>
      {!pathname.includes('/drinks/') && <Header />}
      { foods.map((food, index) => {
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
      {!pathname.includes('/drinks/') && <Footer />}
    </>
  );
}
