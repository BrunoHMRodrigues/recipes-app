import React from 'react';
import PropTypes from 'prop-types';

function CardTags({ tag, index }) {
  return (
    <p data-testid={ `${index}-${tag}-horizontal-tag` } className="m-1">{tag}</p>
  );
}

CardTags.propTypes = {
  tag: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

export default CardTags;
