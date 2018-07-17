import React from 'react';
import PropTypes from 'prop-types';
import { Table, Header, Pagination, Button } from 'semantic-ui-react';
import { SemanticToastContainer } from 'react-semantic-toasts';
import TableRowComponent from './TableRowComponent';
import LoaderComponent from './LoaderComponent';
import { ToastMessage } from '../_utils/ToastMessage';

const UserDetailsComponent = (props) => {
  if (props.isLoading) {
    return <LoaderComponent size="large" dimmerStyle={{ height: '100vh' }} />;
  }

  if (props.hasError && props.errorMessage) {
    setTimeout(() => {
      ToastMessage.error({ message: props.errorMessage });
    }, 500);
    return <SemanticToastContainer />;
  }
  if (props.emptyUsersList()) {
    return (
      <Header as="h3" id="empty-usersList" content="No Users Found" />
    );
  }
  return (
    <div>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>
              <div className="assets-header">
                Name
              </div>
            </Table.HeaderCell>
            <Table.HeaderCell>
              <div className="assets-header">
                Email Address
              </div>
            </Table.HeaderCell>
            <Table.HeaderCell>
              <div className="assets-header">
                Cohort
              </div>
            </Table.HeaderCell>
            <Table.HeaderCell>
              <div className="assets-header">
                Assets Assigned
              </div>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {
            props.activePageUsers.map((user) => {
              user.assets_assigned = 1;
              return (
                <TableRowComponent
                  key={user.id}
                  data={user}
                  headings={[
                    'full_name',
                    'email',
                    'cohort',
                    'assets_assigned'
                  ]}
                />
              );
            })
          }
        </Table.Body>
        <Table.Footer>
          <Table.Row>
            <Table.HeaderCell colSpan="4" >
              {!props.emptyUsersList() && (
                <Pagination
                  totalPages={props.handlePageTotal()}
                  onPageChange={props.handlePaginationChange}
                  activePage={props.activePage}
                />
              )}
              <Button
                circular
                icon="add"
                floated="right"
                data-tooltip="Add new user"
                size="big"
              />
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
    </div>
  );
};

UserDetailsComponent.propTypes = {
  activePage: PropTypes.number,
  activePageUsers: PropTypes.arrayOf(PropTypes.object),
  emptyUsersList: PropTypes.func.isRequired,
  errorMessage: PropTypes.string,
  handlePageTotal: PropTypes.func,
  handlePaginationChange: PropTypes.func,
  hasError: PropTypes.bool,
  isLoading: PropTypes.bool.isRequired
};

UserDetailsComponent.defaultProps = {
  activePage: 1,
  errorMessage: ''
};

export default UserDetailsComponent;
