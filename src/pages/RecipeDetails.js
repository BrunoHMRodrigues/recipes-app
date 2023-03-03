import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { fetchDrinks, fetchMeals } from '../redux/actions/detailsAction';

function RecipeDetails() {
  // useParams serve para extrair o id da rota
  const { idReceita } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    const { location: { pathname } } = history;
    console.log(pathname);
    if (pathname.includes('/meals/')) {
      dispatch(fetchMeals(idReceita));
    } else {
      dispatch(fetchDrinks(idReceita));
    }
  }, [idReceita, dispatch, history]);

  return (
    <div>
      <h1>Estou AQUI</h1>
    </div>
  );
}

export default RecipeDetails;
