import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Container, Header, Table, Pagination } from 'semantic-ui-react';
import feedbackAction from '../_actions/feedback.action';
import SideMenuComponent from '../_components/SideMenuComponent';

export class UserFeedbackComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      activePage: 1,
      limit: 10,
    };
  }

  componentDidMount() {
    this.props.feedbackAction(this.state.defaultPage);
  }

  handlePaginationChange = (e, { activePage }) => {
    this.setState({ activePage });
    this.props.feedbackAction(activePage);
  }


  handlePageTotal = () => Math.ceil(this.props.feedbackCount / this.state.limit)

  pagination = () => (
    <div>
      <Pagination
        activePage={this.state.activePage}
        totalPages={this.handlePageTotal()}
        onPageChange={this.handlePaginationChange}
      />
    </div>
  )

  loadFeedback = () => {
    if (this.props.feedbackCount === 0) {
      return (
        <Table.Row>
          <Table.Cell colSpan="6">No Data found</Table.Cell>
        </Table.Row>
      );
    }
    const feedbacks = this.props.feedback.map(feedback => (
      <Table.Row>
        <Table.Cell>{feedback.index}</Table.Cell>
        <Table.Cell>{feedback.submittedBy}</Table.Cell>
        <Table.Cell>{feedback.dateSubmitted}</Table.Cell>
        <Table.Cell>{feedback.type}</Table.Cell>
        <Table.Cell>{feedback.description}</Table.Cell>
      </Table.Row>
    ));
    return feedbacks;
  }


  render() {
    return [
      <SideMenuComponent>
        <div className="">
          <Container>
            <Header className="landing-heading" content="User Feedback" />
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
              <Table.Footer>
                <Table.Row>
                  <Table.HeaderCell colSpan="5">
                    {this.pagination()}
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Footer>
            </Table>
          </Container>
        </div>
      </SideMenuComponent>
    ];
  }
}

const mapStateToProps = ({ feedbackReducer }) => {
  const { feedback, feedbackCount } = feedbackReducer;
  return {
    feedback,
    feedbackCount,
  };
};

UserFeedbackComponent.propTypes = {
  feedbackAction: PropTypes.func,
  feedbackCount: PropTypes.number.isRequired,
  feedback: PropTypes.arrayOf(PropTypes.object)
};

UserFeedbackComponent.defaultProps = {
  feedbackAction: () => {},
  feedback: []
};

export default connect(mapStateToProps, { feedbackAction, })(UserFeedbackComponent);
