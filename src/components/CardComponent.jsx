import React from 'react'
import { Card } from 'semantic-ui-react'

class CardComponent extends React.Component {
    statistics = this.props.statistics;

    render() {
        let cards = this.statistics.map((value, index) => {
            return (
                <Card key={index}>
                    <Card.Content>
                        <Card.Header>{value.value}</Card.Header>
                        <Card.Description>{value.label}</Card.Description>
                    </Card.Content>
                </Card>
            )
        });

        return (
            <Card.Group centered>
                {cards}
            </Card.Group>
        )
    }
}

export default CardComponent;
