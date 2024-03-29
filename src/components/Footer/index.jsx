import React from 'react';
import { Link } from 'react-router-dom';
import mealIcon from '../../images/mealIcon.svg';
import drinkIcon from '../../images/drinkIcon.svg';
import styles from './styles.module.css';

function Footer() {
  return (
    <div>
      <div data-testid="footer" className={ styles.footer }>
        <div className={ styles.content }>
          <Link to="/drinks">
            <img
              data-testid="drinks-bottom-btn"
              src={ drinkIcon }
              alt="drinks bottom button"
            />
          </Link>
          <Link to="/meals">
            <img
              data-testid="meals-bottom-btn"
              src={ mealIcon }
              alt="meals bottom button"
            />
          </Link>
        </div>
      </div>

    </div>
  );
}

export default Footer;
