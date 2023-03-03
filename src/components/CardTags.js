import React from 'react';
import PropTypes from 'prop-types';

function CardTags({ tag, index }) {
  console.log('entro');
  console.log(`${index}-${tag}-horizontal-tag`);
  return (
    <p data-testid={ `${index}-${tag}-horizontal-tag` }>{tag}</p>
  );
}

CardTags.propTypes = {
  tag: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

export default CardTags;
