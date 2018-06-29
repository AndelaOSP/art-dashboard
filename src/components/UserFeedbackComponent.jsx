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
      limit: 10,
      offset: 0,
      feedback: []
    };
  }

  componentDidMount() {
    this.props.feedbackAction();
    this.setTableContent();
  }

  componentDidUpdate(prevProps) {
    if (this.props.feedback.length !== prevProps.feedback.length) {
      this.setTableContent();
    }
  }

  setTableContent = () => {
    const feedback =
    this.props.feedback.slice(this.state.offset, (this.state.activePage * this.state.limit));
    this.setState({
      feedback
    });
  }

  handlePaginationChange = (event, { activePage }) => {
    this.setState({
      activePage,
      offset: (activePage - 1) * this.state.limit
    }, () => this.setTableContent());
  }

  handlePageTotal = () => Math.ceil(this.props.feedback.length / this.state.limit)

  pagination = () => (
    <Pagination
      totalPages={this.handlePageTotal()}
      onPageChange={this.handlePaginationChange}
      activePage={this.state.activePage}
    />
  )

  loadFeedback = () => {
    const feedbackRecord = this.state.feedback.map((feedback, index) => (
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
    if (this.props.feedback.length === 0) {
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
                  this.props.feedback.length === 0 ? '' :
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
  const { feedback, isLoading } = feedbackReducer;
  return {
    feedback,
    isLoading
  };
};

UserFeedbackComponent.propTypes = {
  feedbackAction: PropTypes.func,
  feedback: PropTypes.arrayOf(PropTypes.object),
  isLoading: PropTypes.bool
};

UserFeedbackComponent.defaultProps = {
  feedbackAction: () => {},
  feedback: [],
  isLoading: true
};

export default connect(mapStateToProps, { feedbackAction })(UserFeedbackComponent);
