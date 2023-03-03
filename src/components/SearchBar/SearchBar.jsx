import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { fetchFood } from '../../redux/actions/actions';

export default function SearchBar() {
  const { pathname } = useLocation();
  const foodType = pathname === '/meals' ? 'themealdb' : 'thecocktaildb';
  const [endPoint, setEndPoint] = useState('i');
  const [inputValue, setInputValue] = useState('');
  const dispatch = useDispatch();

  return (
    <div>
      <input
        type="text"
        data-testid="search-input"
        value={ inputValue }
        onChange={ (event) => setInputValue(event.target.value) }
      />
      <label>
        <input
          type="radio"
          name="search-type"
          data-testid="ingredient-search-radio"
          onClick={ () => setEndPoint('i') }
        />
        Ingredient
      </label>
      <label>
        <input
          type="radio"
          name="search-type"
          data-testid="name-search-radio"
          onClick={ () => setEndPoint('s') }
        />
        Name
      </label>
      <label>
        <input
          type="radio"
          name="search-type"
          data-testid="first-letter-search-radio"
          onClick={ () => setEndPoint('f') }
        />
        First letter
      </label>
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ () => {
          if (endPoint === 'f' && inputValue.length > 1) {
            window.alert('letras de mais');
          }
          dispatch(fetchFood({ foodType, endPoint, inputValue }));
        } }
      >
        SEARCH
      </button>
    </div>
  );
}
