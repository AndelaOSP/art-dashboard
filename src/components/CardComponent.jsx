import React, { Component } from 'react'
import { Card } from 'semantic-ui-react'

class CardComponent extends React.Component {

    render() {
        return (
            <Card.Group centered>
                <Card>
                    <Card.Content>
                        <Card.Header>89</Card.Header>
                        <Card.Description>Damaged Assets</Card.Description>
                    </Card.Content>
                </Card>

                <Card>
                    <Card.Content>
                        <Card.Header>70</Card.Header>
                        <Card.Description>Lost Assets</Card.Description>
                    </Card.Content>
                </Card>

                <Card>
                    <Card.Content>
                        <Card.Header>90</Card.Header>
                        <Card.Description>Allocated Assets</Card.Description>
                    </Card.Content>
                </Card>

                <Card>
                    <Card.Content>
                        <Card.Header>120</Card.Header>
                        <Card.Description>Available Assets</Card.Description>
                    </Card.Content>
                </Card>
            </Card.Group>

        )
    }
}

export default CardComponent