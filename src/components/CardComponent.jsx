import React from 'react';
import { Card } from 'semantic-ui-react';
import PropTypes from 'prop-types';

class CardComponent extends React.Component {
  statistics = this.props.statistics;
  render() {
    const cards = this.statistics.map(value => (
      <Card key={value.value}>
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
  statistics: PropTypes.array
};

CardComponent.defauktTypes = {
  statistics: []
};

export default CardComponent;
