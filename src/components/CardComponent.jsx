import React, { Component } from 'react'
import { Card } from 'semantic-ui-react'

class CardComponent extends React.Component {
    statistics = this.props.statistics;

    render() {
        let cards = this.statistics.map((value, index) => {
            return (
                <Card key={index}>
                    <Card.Content>
                        <Card.Header>{value.assets}</Card.Header>
                        <Card.Description>{value.description}</Card.Description>
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

export default CardComponent