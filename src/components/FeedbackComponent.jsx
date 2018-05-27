import React from 'react';
import { Container, Header, Table } from 'semantic-ui-react';

export class FeedbackComponent extends React.Component {

constructor(){
    super();
    this.state = {
        feedback: [],
    };
}

componentWillMount(){
    fetch('https://jsonplaceholder.typicode.com/comments')
    .then(json => console.log(json))
    .then(results => {
        return results.json();
    
    }).then(data => {
        let feedback = data.results.map((index, feedback) => {
            return(
                <Table.Row>
                <Table.Cell>key = {index}</Table.Cell>
                <Table.Cell>{feedback.submitted_by}</Table.Cell>
                <Table.Cell>{feedback.date_submitted}</Table.Cell>
                <Table.Cell>{feedback.complaint}</Table.Cell>
                <Table.Cell>{feedback.description}</Table.Cell>
                </Table.Row>
                )
        this.setState({feedback:feedback.data});
        console.log("state", this.state.feedback);
        }
    )})

}
render() {
    return [
    <div className=''>
      <Container>
        <Header className='landing-heading' content='User Feedback' />
        <Table celled>
        <Table.Header>
        <Table.Row>
        <Table.HeaderCell>Index</Table.HeaderCell>
        <Table.HeaderCell>Submitted by</Table.HeaderCell>
        <Table.HeaderCell>Date Submitted</Table.HeaderCell>
        <Table.HeaderCell>Type</Table.HeaderCell>
        <Table.HeaderCell>Description</Table.HeaderCell>
      </Table.Row>
      </Table.Header>

      <Table.Body>
          {this.state.feedback}
      </Table.Body>

      </Table>
      </Container>
      </div>
    ];
  };}

export default (FeedbackComponent);