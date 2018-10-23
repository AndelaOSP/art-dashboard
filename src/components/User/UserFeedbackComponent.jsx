import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Header, Table, Pagination, Segment, Divider } from 'semantic-ui-react';
import _ from 'lodash';

import feedbackAction from '../../_actions/userFeedback.actions';
import formatDate from '../../_utils/dateFormatter';
import NavbarComponent from '../NavBarComponent';
import TableRow from '../TableRowComponent';
import LoaderComponent from '../LoaderComponent';
import rowOptions from '../../_utils/pageRowOptions';
import DropdownComponent from '../common/DropdownComponent';
import ActionComponent from '../ActionComponent';
import TableHeaderComponent from '../common/TableHeaderComponent';

import '../../_css/UserFeedback.css';
import ItemsNotFoundComponent from '../common/ItemsNotFoundComponent';

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
  };

  handleRowChange = (e, data) => {
    this.setState({ limit: data.value });
    this.props.feedbackAction(this.state.activePage, data.value);
  };

  handlePageTotal = () => Math.ceil(this.props.feedbackCount / this.state.limit);

  render() {
    if (this.props.isLoading) {
      return (
        <NavbarComponent>
          <LoaderComponent />
        </NavbarComponent>
      );
    }

    if (!this.props.isLoading && this.props.feedbackCount <= 0) {
      return (
        <NavbarComponent>
          <ItemsNotFoundComponent
            message="Please try again later to see if we will have any feedback to show you."
          />
        </NavbarComponent>
      );
    }

    return (
      <NavbarComponent title="User Feedback">
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
              {
                this.props.feedback.map((feedback) => {
                  const updatedData = { ...feedback, created_at: formatDate(feedback.created_at) };

                  return (
                    <TableRow
                      key={feedback.created_at}
                      data={updatedData}
                      headings={['reported_by',
                      'created_at',
                      'report_type',
                      'message']}
                    >
                      <Table.Cell>
                        <ActionComponent />
                      </Table.Cell>
                    </TableRow>
                  );
                })
              }
            </Table.Body>

            <Table.Footer>
              <Table.Row>
                {
                  !_.isEmpty(this.props.feedback) && (
                    <Table.HeaderCell colSpan="5" id="pagination-header">
                      <Segment.Group horizontal id="art-pagination-section">
                        <Segment>
                          <Pagination
                            totalPages={this.handlePageTotal()}
                            onPageChange={this.handlePaginationChange}
                            activePage={this.state.activePage}
                          />
                        </Segment>
                        <Segment>
                          <DropdownComponent
                            customClass="page-limit"
                            placeHolder="Show Rows"
                            options={rowOptions}
                            onChange={this.handleRowChange}
                            value={this.state.limit}
                            upward
                          />
                        </Segment>
                      </Segment.Group>
                    </Table.HeaderCell>
                  )
                }
              </Table.Row>
            </Table.Footer>
          </Table>
        </div>
      </NavbarComponent>
    );
  }
}

const mapStateToProps = ({ feedbackReducer }) => {
  const { feedback, feedbackCount, isLoading } = feedbackReducer;
  return {
    feedback,
    feedbackCount,
    isLoading
  };
};

UserFeedbackComponent.propTypes = {
  feedbackAction: PropTypes.func,
  feedback: PropTypes.arrayOf(PropTypes.object),
  feedbackCount: PropTypes.number,
  isLoading: PropTypes.bool
};

UserFeedbackComponent.defaultProps = {
  feedbackAction: () => { },
  feedback: [],
  isLoading: true
};

export default connect(mapStateToProps, { feedbackAction })(UserFeedbackComponent);
