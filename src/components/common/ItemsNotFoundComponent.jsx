import React from 'react';
import { Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import '../../_css/ItemsNotFoundComponent.css';

const ItemsNotFoundComponent = ({ message, header }) => (
  <div className="not-found">
    <div className="middle">
      <h2>{header}</h2>
      <div className="not-found-image">
        <Image
          centered
          src="images/empty.svg"
          alt="empty box"
          id="not_found_image"
        />
      </div>
      <p> {message} </p>
    </div>
  </div>
);

ItemsNotFoundComponent.propTypes = {
  message: PropTypes.string,
  header: PropTypes.string
};

ItemsNotFoundComponent.defaultProps = {
  message: 'Item not found',
  header: 'Item not found'
};

export default ItemsNotFoundComponent;
