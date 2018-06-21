import React, { Component } from 'react';
import { Card } from 'semantic-ui-react';
import PropTypes from 'prop-types';

class CardComponent extends Component {
  statistics = this.props.statistics;

  render() {
    const cards = this.statistics.map(value => (
      <Card key={`${value.value}-key`}>
        <Card.Content>
          <Card.Header>{value.value}</Card.Header>
          <Card.Description>{value.label}</Card.Description>
        </Card.Content>
      </Card>
    ));

    return (
      <Card.Group centered>
        {cards}
      </Card.Group>
    );
  }
}

CardComponent.propTypes = {
  statistics: PropTypes.arrayOf(PropTypes.object)
};

CardComponent.defaultProps = {
  statistics: []
};

export default CardComponent;
