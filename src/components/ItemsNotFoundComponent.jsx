import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import '../_css/ItemsNotFoundComponent.css';

export class ItemsNotFoundComponent extends Component {
  state = {
    message: this.props.message
  }
  render() {
    return (
      <div className="not-found">
        <div className="middle">
          <div className="center-image">
            <Image
              centered
              src="images/empty.svg"
              alt="empty box"
              id="not_found_image"
            />
          </div>
          <p id="not_found_message"> { this.state.message } </p>
        </div>
      </div>
    );
  }
}
ItemsNotFoundComponent.propTypes = {
  message: PropTypes.string
};

ItemsNotFoundComponent.defaultPropTypes = {
  message: 'Sorry we could not find items for this page.'
};

export default withRouter(ItemsNotFoundComponent);
