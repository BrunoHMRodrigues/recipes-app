import React from 'react';
import CardReceipts from '../components/CardReceipts';

// const doneReceipt = [{
//   id: 52770,
//   type: 'meal',
//   nationality: 'Italian',
//   category: 'Beef',
//   alcoholicOrNot: '',
//   name: 'Spaghetti Bolognese',
//   image: 'https://www.themealdb.com/images/media/meals/sutysw1468247559.jpg',
//   doneDate: '20/06/2023',
//   tags: ['italian', 'paste'],
// }];
// localStorage.setItem('doneRecipes', JSON.stringify(doneReceipt));
function DoneRecipes() {
  const getDoneReceipts = JSON.parse(localStorage.getItem('doneRecipes'));
  return (
    <div>
      <button
        type="button"
        data-testid="filter-by-all-btn"
      >
        All
      </button>

      <button
        type="button"
        data-testid="filter-by-meal-btn"
      >
        Meals
      </button>

      <button
        type="button"
        data-testid="filter-by-drink-btn"
      >
        Drinks
      </button>

      {getDoneReceipts.map((receipt, index) => (<CardReceipts
        receipt={ receipt }
        index={ index }
        key={ receipt.id }
      />))}

    </div>
  );
}

export default DoneRecipes;
