import React from 'react';
import { Dimmer, Loader, Segment } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const LoaderComponent = ({ loadingText, size, showDimmer, dimmerStyle }) => (
  <Segment>
    <Dimmer active={showDimmer} style={dimmerStyle}>
      <Loader inverted size={size}>{loadingText}</Loader>
    </Dimmer>
  </Segment>
);

LoaderComponent.propTypes = {
  loadingText: PropTypes.string,
  size: PropTypes.string,
  showDimmer: PropTypes.bool,
  dimmerStyle: PropTypes.object,
};

LoaderComponent.defaultProps = {
  loadingText: 'Loading',
  size: 'small',
  showDimmer: true,
  dimmerStyle: {},
};

export default LoaderComponent;
