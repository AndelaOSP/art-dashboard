import React from 'react';
import { Image, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import '../../_css/ItemsNotFoundComponent.css';

const reloadPage = () => window.location.reload(true);

const ItemsNotFoundComponent = props => (
  <div className="not-found">
    <div className="middle">
      <h2>Nothing To See Here!</h2>
      <Image centered src="/images/windEmpty.jpg" alt="empty box" id="not_found_image" />
      <p> {props.message} </p>
      {props.allDataFetched && (
        <Button onClick={reloadPage} className="reload-page" size="small">
          Go Back
        </Button>
      )}
    </div>
  </div>
);

ItemsNotFoundComponent.propTypes = {
  message: PropTypes.string,
  allDataFetched: PropTypes.bool
};

ItemsNotFoundComponent.defaultProps = {
  message: 'Item not found'
};

export default ItemsNotFoundComponent;
