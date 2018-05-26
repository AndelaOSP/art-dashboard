import React from 'react';
import { Container, Header, Table } from 'semantic-ui-react';
export class FeedbackComponent extends React.Component {
state = {
    feedback: [],
    feedbackCount: 0
}
render() {
    return [
    <div className=''>
      <Container>
        <Header className='landing-heading' content='User Feedback' />
        <Table celled>
        <Table.Header>
        <Table.Row>
        <Table.HeaderCell>Submitted by</Table.HeaderCell>
        <Table.HeaderCell>Date Submitted</Table.HeaderCell>
        <Table.HeaderCell>Type</Table.HeaderCell>
        <Table.HeaderCell>Description</Table.HeaderCell>
      </Table.Row>
      </Table.Header>

      <Table.Body>
      <Table.Row>
                <Table.Cell>31-8-2000</Table.Cell>
                <Table.Cell>Joan Awinja</Table.Cell>
                <Table.Cell>Complaint</Table.Cell>
                <Table.Cell>Lorem impsum</Table.Cell>
                </Table.Row>
      </Table.Body>

      </Table>
      </Container>
      </div>
    ];
  };}

export default (FeedbackComponent);