import React from 'react';
import { Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import '../../_css/ItemsNotFoundComponent.css';

const ItemsNotFoundComponent = ({ message }) => (
  <div className="not-found">
    <div className="middle">
      <h2>Nothing To See Here!</h2>
      <Image
        centered
        src="images/windEmpty.jpg"
        alt="empty box"
        id="not_found_image"
      />
      <p> {message} </p>
    </div>
  </div>
);

ItemsNotFoundComponent.propTypes = {
  message: PropTypes.string
};

ItemsNotFoundComponent.defaultProps = {
  message: 'Item not found'
};

export default ItemsNotFoundComponent;
