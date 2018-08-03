import React from 'react';
import { Segment, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import '../_css/DashboardComponent.css';

const AnalyticsCardComponent = props => (
  <Segment.Group horizontal>
    <Segment style={{ marginTop: '-28px' }}>
      <Segment.Group>
        <Segment className="analytics-states-top-text">{props.assetNumber} {props.assetState}</Segment>
        <Segment className="analytics-states-bottom-text">assets</Segment>
      </Segment.Group>
    </Segment>
    <Segment>
      <Image
        src={props.image}
        size="small"
        id={props.cssClass}
      />
    </Segment>
  </Segment.Group>
);

AnalyticsCardComponent.propTypes = {
  assetNumber: PropTypes.number,
  assetState: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  cssClass: PropTypes.string
};

AnalyticsCardComponent.default = {
  assetNumber: 0,
  cssClass: ''
};

export default AnalyticsCardComponent;
