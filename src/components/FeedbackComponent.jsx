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
    .then(results => results.json())
    .then(data => {
        console.log('data',data);
        let feedbacks = data && data.map((feedback,index) => {
            console.log('feedback',feedback);
            return(
                <Table.Row>
                <Table.Cell>{feedback.id}</Table.Cell>
                <Table.Cell>{feedback.email}</Table.Cell>
                <Table.Cell>12/07/2018</Table.Cell>
                <Table.Cell>{feedback.name}</Table.Cell>
                <Table.Cell>{feedback.body}</Table.Cell>
                </Table.Row>
                )
        }
        
    );
    this.setState({feedback:feedbacks});

})
    .catch(error => console.log('Fetch error :', error));

}
render() {
    console.log("state", this.state.feedback);
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