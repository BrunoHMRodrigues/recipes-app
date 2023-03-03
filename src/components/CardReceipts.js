import React from 'react';
import CardTags from './CardTags';

function CardReceipts(receipt, index) {
  const { name, image, tags } = receipt;
  return (
    <div className="d-flex">
      <img
        src={ image }
        alt={ name }
        data-testid={ `${index}-horizontal-image` }
      />
      <div className="d-flex flex-column">
        <p data-testid={ `${index}-horizontal-name` }>{}</p>
        <p data-testid={ `${index}-horizontal-top-text` }>{}</p>
        <p data-testid={ `${index}-horizontal-done-date` }>{}</p>

        <section>
          {tags
            .map((tag, tagIndex) => (<CardTags
              tag={ tag }
              index={ tagIndex }
              key={ tag }
            />))}
        </section>
      </div>
      <img
        src="src/images/shareIcon.svg"
        alt="shareIcon"
        data-testid={ `${index}-horizontal-share-btn` }
      />
    </div>
  );
}

export default CardReceipts;
