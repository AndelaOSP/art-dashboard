import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Container, Header, Table, Pagination } from 'semantic-ui-react';
import feedbackAction from '../_actions/userFeedback.actions';
import SideMenuComponent from '../_components/SideMenuComponent';
import TableRowComponent from './TableRowComponent';
import LoaderComponent from './LoaderComponent';
import ActionComponent from './ActionComponent';

export class UserFeedbackComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      activePage: 1,
      limit: 10
    };
  }

  componentDidMount() {
    this.props.feedbackAction(this.state.activePage);
  }

  handlePaginationChange = (event, { activePage }) => {
    this.setState({ activePage });
    this.props.feedbackAction(this.state.activePage);
  }

  handlePageTotal = () => Math.ceil(this.props.feedbackCount / this.state.limit)

  pagination = () => (
    <Pagination
      totalPages={this.handlePageTotal()}
      onPageChange={this.handlePaginationChange}
      activePage={this.state.activePage}
    />
  )

  loadFeedback = () => {
    const feedbackRecord = this.props.feedback.map((feedback, index) => (
      <TableRowComponent
        key={index} //eslint-disable-line
        data={feedback}
        headings={['reported_by',
          'created_at',
          'report_type',
          'message']}
      >
        <Table.Cell>
          <ActionComponent />
        </Table.Cell>
      </TableRowComponent>

    ));
    return feedbackRecord;
  }

  display = () => {
    if (this.props.isLoading) {
      return (
        <LoaderComponent size="small" dimmerStyle={{ height: '100vh' }} />
      );
    }
    if (this.props.hasFeedback) {
      return (
        <Container>
          <p>No Data found</p>
        </Container>
      );
    }
    return (
      <Container>
        <Header className="landing-heading" content="User Feedback" />
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Submitted by</Table.HeaderCell>
              <Table.HeaderCell>Date Submitted</Table.HeaderCell>
              <Table.HeaderCell>Type</Table.HeaderCell>
              <Table.HeaderCell>Message</Table.HeaderCell>
              <Table.HeaderCell>Action</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {this.loadFeedback()}
          </Table.Body>

          <Table.Footer>
            <Table.Row>
              <Table.HeaderCell colSpan="5">
                {
                  this.props.hasFeedback &&
                  this.pagination()
                }
              </Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
        </Table>
      </Container>
    );
  }

  render() {
    return [
      <SideMenuComponent title="User Feedback">
        {this.display()}
      </SideMenuComponent>
    ];
  }
}

const mapStateToProps = ({ feedbackReducer }) => {
  const { feedback, feedbackCount, isLoading } = feedbackReducer;
  return {
    feedback,
    feedbackCount,
    hasFeedback: !!feedbackCount,
    isLoading
  };
};

UserFeedbackComponent.propTypes = {
  feedbackAction: PropTypes.func,
  feedback: PropTypes.arrayOf(PropTypes.object),
  feedbackCount: PropTypes.number,
  hasFeedback: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool
};

UserFeedbackComponent.defaultProps = {
  feedbackAction: () => { },
  feedback: [],
  isLoading: true
};

export default connect(mapStateToProps, { feedbackAction })(UserFeedbackComponent);
