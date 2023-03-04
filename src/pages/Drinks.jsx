import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

export default function Drinks() {
  const foods = useSelector((state) => state.recipes.foods) || [];
  const searched = useSelector((state) => state.recipes.searched);
  const history = useHistory();

  useEffect(() => {
    if (foods.length === 1) {
      history.push(`/drinks/${foods[0].idDrink}`);
    }
    if (searched && foods.length === 0) {
      window.alert('Sorry, we haven\'t found any recipes for these filters.');
    }
  }, [foods]);

  return (
    foods.map((food, index) => {
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
    })
  );
}
