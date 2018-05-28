import React from 'react';
import { connect } from 'react-redux';
import { Container, Header, Table } from 'semantic-ui-react';
import { feedbackAction } from '../_actions/feedback.action';

export class FeedbackComponent extends React.Component {

constructor(){
    super();
    this.state = {
        feedback: [],
    defaultPage: 1,
    };
}

loadFeedback = () => {
    const feedbacks = this.props.feedback.map((feedback) => {
        return(
            <Table.Row>
                <Table.Cell>{feedback.index}</Table.Cell>
                <Table.Cell>{feedback.submittedBy}</Table.Cell>
                <Table.Cell>{feedback.dateSubmitted}</Table.Cell>
                <Table.Cell>{feedback.type}</Table.Cell>
                <Table.Cell>{feedback.description}</Table.Cell>
            </Table.Row>
                )
            }); 
    return feedbacks

}

componentDidMount(){
    this.props.feedbackAction(this.state.defaultPage);
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
          {this.loadFeedback()}
      </Table.Body>

      </Table>
      </Container>
      </div>
    ];
  };}

const mapStateToProps = ({ feedbackReducer }) => {
    const { feedback, feedbackCount } = feedbackReducer;
        return {
            feedback,
            feedbackCount,
        }
  }

export default connect(mapStateToProps, { feedbackAction, })(FeedbackComponent);
  