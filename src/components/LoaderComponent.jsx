import React from 'react';
import { Container, Dimmer, Grid } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import '../_css/LoaderComponent.css';

const LoaderComponent = ({ loadingText }) => (
  <Container>
    <Dimmer active inverted className="overlay">
      <Grid centered columns={3}>
        <Grid.Column className="loader-column">
          <div className="la-square-jelly-box la-2x">
            <div />
            <div />
          </div>

          <p className="loader-text">{loadingText}</p>
        </Grid.Column>
      </Grid>
    </Dimmer>
  </Container>
);

LoaderComponent.propTypes = {
  loadingText: PropTypes.string
};

LoaderComponent.defaultProps = {
  loadingText: 'Loading...'
};

export default LoaderComponent;
