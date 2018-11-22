import React from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import { Table, Pagination, Segment } from 'semantic-ui-react';
import { SemanticToastContainer } from 'react-semantic-toasts';
import rowOptions from '../../_utils/pageRowOptions';
import DropdownComponent from '../common/DropdownComponent';
import TableRow from '../TableRowComponent';
import LoaderComponent from '../LoaderComponent';
import NavBarComponent from '../../_components/NavBarContainer';
import ItemsNotFoundComponent from '../common/ItemsNotFoundComponent';
import { ToastMessage } from '../../_utils/ToastMessage';

const UserComponent = (props) => {
  const hasNoUsers = isEmpty(props.activePageUsers);

  if (props.isLoading) {
    return <LoaderComponent />;
  }

  if (props.hasError && props.errorMessage) {
    setTimeout(() => {
      ToastMessage.error({ message: props.errorMessage });
    }, 500);
    return <SemanticToastContainer />;
  }

  if (hasNoUsers) {
    return (
      <NavBarComponent>
        <ItemsNotFoundComponent allDataFetched={props.allDataFetched} message="Please try again later, to see if we'll have users to show you." />
      </NavBarComponent>
    );
  }

  return (
    <div>
      <Table basic selectable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Email Address</Table.HeaderCell>
            <Table.HeaderCell>Cohort</Table.HeaderCell>
            <Table.HeaderCell>Assets Assigned</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {props.activePageUsers.map((user) => {
            const viewUserUrl = `users/${user.id}/view`;

            const updatedUser = {
              ...user,
              assets_assigned: user.allocated_asset_count
            };

            return (
              <TableRow
                viewDetailsRoute={viewUserUrl}
                key={user.id}
                data={updatedUser}
                headings={['full_name', 'email', 'cohort', 'assets_assigned']}
              />
            );
          })}
        </Table.Body>
        <Table.Footer>
          <Table.Row>
            {!props.emptyUsersList() && (
              <Table.HeaderCell colSpan="4" id="pagination-header">
                <Segment.Group horizontal id="art-pagination-section">
                  <Segment>
                    <Pagination
                      id="art-pagination-component"
                      totalPages={props.handlePageTotal() || 1}
                      onPageChange={props.handlePaginationChange}
                      activePage={props.activePage}
                    />
                  </Segment>
                  <Segment>
                    <DropdownComponent
                      customClass="page-limit"
                      placeHolder="Show Rows"
                      options={rowOptions}
                      upward
                      value={props.limit}
                      onChange={props.handleRowChange}
                    />
                  </Segment>
                </Segment.Group>
              </Table.HeaderCell>
            )}
          </Table.Row>
        </Table.Footer>
      </Table>
    </div>
  );
};

UserComponent.propTypes = {
  activePage: PropTypes.number,
  activePageUsers: PropTypes.arrayOf(PropTypes.object),
  emptyUsersList: PropTypes.func,
  errorMessage: PropTypes.string,
  handlePageTotal: PropTypes.func,
  handleRowChange: PropTypes.func,
  handlePaginationChange: PropTypes.func,
  hasError: PropTypes.bool,
  isLoading: PropTypes.bool,
  limit: PropTypes.number,
  allDataFetched: PropTypes.bool
};

UserComponent.defaultProps = {
  activePage: 1,
  errorMessage: '',
  emptyUsersList: () => {},
  isLoading: false
};

export default UserComponent;
