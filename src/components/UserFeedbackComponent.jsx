import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Container, Header, Table, Pagination } from 'semantic-ui-react';
import feedbackAction from '../_actions/feedback.action';
import SideMenuComponent from '../_components/SideMenuComponent';
import TableRowComponent from './TableRowComponent';

export class UserFeedbackComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      activePage: 1,
      limit: 10,
    };
  }

  componentDidMount() {
    this.props.feedbackAction(this.state.activePage);
  }

  handlePaginationChange = (e, { activePage }) => {
    this.setState({ activePage });
    this.props.feedbackAction(activePage);
  }

  handlePageTotal = () => Math.ceil(this.props.feedback.length / this.state.limit)

  pagination = () => (
    <div>
      <Pagination
        totalPages={this.handlePageTotal()}
        onPageChange={this.handlePaginationChange}
        activePage={this.state.activePage}
      />
    </div>
  )

  loadFeedback = () => {
    if (this.props.feedback.length === 0) {
      return (
        <Table.Row>
          <Table.Cell colSpan="6">No Data found</Table.Cell>
        </Table.Row>
      );
    }
    const feedbackRecord = this.props.feedback.map(feedback => (
      <TableRowComponent
        key={feedback.created_at}
        data={feedback}
        headings={['reported_by',
            'created_at',
            'report_type',
            'message']}
      />
    ));
    return feedbackRecord;
  }


  render() {
    return [
      <SideMenuComponent title="User Feedback">
        <div className="">
          <Container>
            <Header className="landing-heading" content="User Feedback" />
            <Table celled>
              <Table.Header>
                <Table.Row>
                  {/* <Table.HeaderCell>Index</Table.HeaderCell> */}
                  <Table.HeaderCell>Submitted by</Table.HeaderCell>
                  <Table.HeaderCell>Date Submitted</Table.HeaderCell>
                  <Table.HeaderCell>Type</Table.HeaderCell>
                  <Table.HeaderCell>Message</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {this.loadFeedback()}
              </Table.Body>
              <Table.Footer>
                <Table.Row>
                  <Table.HeaderCell colSpan="4">
                    {
                      this.props.feedback.length === 0 ? '' :
                      this.pagination()
                    }
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
  const { feedback } = feedbackReducer;
  return {
    feedback
  };
};

UserFeedbackComponent.propTypes = {
  feedbackAction: PropTypes.func,
  feedback: PropTypes.arrayOf(PropTypes.object)
};

UserFeedbackComponent.defaultProps = {
  feedbackAction: () => {},
  feedback: []
};

export default connect(mapStateToProps, { feedbackAction })(UserFeedbackComponent);
