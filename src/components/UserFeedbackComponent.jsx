import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Container, Header, Table, Pagination, Segment, Divider } from 'semantic-ui-react';
import feedbackAction from '../_actions/userFeedback.actions';
import NavbarComponent from './NavBarComponent';
import TableRowComponent from './TableRowComponent';
import LoaderComponent from './LoaderComponent';
import DropdownComponent from '../_components/DropdownComponent';
import ActionComponent from './ActionComponent';
import TableHeaderComponent from '../components/common/TableHeaderComponent';
import '../_css/UserFeedback.css';

export class UserFeedbackComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      activePage: 1,
      limit: 10
    };
  }

  componentDidMount() {
    this.props.feedbackAction(this.state.activePage, this.state.limit);
  }

  handlePaginationChange = (event, { activePage }) => {
    this.setState({ activePage });
    this.props.feedbackAction(activePage, this.state.limit);
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
    if (!this.props.hasFeedback) {
      return (
        <Container>
          <p>No Data found</p>
        </Container>
      );
    }
    return (
      <div className="feedback-list">
        <div id="page-heading-section">
          <Header as="h1" id="page-headings" floated="left" content="User Feedback" />
          <Divider id="assets-divider" />
        </div>
        <Table basic>
          <TableHeaderComponent
            titles={[
              'Submitted by',
              'Date Submitted',
              'Type',
              'Message',
              'Action'
            ]}
          />
          <Table.Body>
            {this.loadFeedback()}
          </Table.Body>

          <Table.Footer>
            <Table.Row>
              {
                  this.props.hasFeedback && (
                  <Table.HeaderCell colSpan="5" id="pagination-header">
                    <Segment.Group horizontal id="art-pagination-section">
                      <Segment>
                        {this.pagination()}
                      </Segment>
                      <Segment>
                        <DropdownComponent />
                      </Segment>
                    </Segment.Group>
                  </Table.HeaderCell>
                  )
                }
            </Table.Row>
          </Table.Footer>
        </Table>
      </div>
    );
  }

  render() {
    return [
      <NavbarComponent title="User Feedback">
        {this.display()}
      </NavbarComponent>
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
