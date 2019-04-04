import React from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';

import NavBarComponent from '../../_components/NavBarContainer';
import LoaderComponent from '../LoaderComponent';
import Cards from '../common/Card/Card';
import ItemsNotFoundComponent from '../common/ItemsNotFoundComponent';
import Paginator from '../common/PaginationComponent';
import StatusMessageComponent from '../common/StatusComponent';
import PageHeader from '../common/PageHeader';
import DepartmentModal from '../../_components/Departments/DepartmentModalContainer';

class DepartmentsComponent extends React.Component {
  state = {
    limit: 10,
    activePage: 1,
    modalOpen: false,
    editModalOpen: false,
    location: {}
  };

  componentDidMount() {
    this.props.loadDepartments(this.state.activePage, this.state.limit);
  }

  handleRowChange = (e, data) => {
    this.setState({ limit: data.value });
    this.props.loadDepartments(this.state.activePage, data.value);
  };

  handlePaginationChange = (e, { activePage }) => {
    this.setState({ activePage });
    this.props.loadDepartments(activePage, this.state.limit);
  };

  handleToggleModal = () => {
    this.setState({ modalOpen: !this.state.modalOpen });
    this.props.resetMessage();
  };

  handleEditToggleModal = (data = {}) => {
    this.setState({
      editModalOpen: !this.state.editModalOpen,
      location: data
    });
    this.props.resetMessage();
  };

  getTotalPages = () => Math.ceil(this.props.departmentsCount / this.state.limit);

  render() {
    const { isLoading, departmentsList, error, resetMessage, entity } = this.props;
    const hasDepartments = !isEmpty(departmentsList);
    const showStatus = error;
    const showAction = entity === 'andela-departments';
    const showNotFound = !isLoading && !hasDepartments && !showStatus;

    return (
      <NavBarComponent>
        <div className="assets-list">
          <PageHeader header="Andela Departments">
            <div className="header-modal-button">
              <DepartmentModal
                showTrigger
                title="Add Department"
                mode="add"
                onToggle={this.handleToggleModal}
                open={this.state.modalOpen}
              />
            </div>
          </PageHeader>

          <DepartmentModal
            title="Update An Andela Department"
            mode="edit"
            onToggle={this.handleEditToggleModal}
            open={this.state.editModalOpen}
            data={this.state.location}
            key={`edit-${this.state.location.id || 1}`}
          />

          {showStatus && (
            <StatusMessageComponent
              message={error}
              className="error-status"
              reset={resetMessage}
            />
          )}

          {isLoading && !showStatus && <LoaderComponent />}

          {!isLoading && hasDepartments && (
            <Cards
              data={departmentsList}
              headings={['name', 'id']}
              imageName="map.svg"
              showAction={showAction}
              onClick={this.handleEditToggleModal}
            />
          )}

          {showNotFound && (
            <ItemsNotFoundComponent
              header="No Andela Departments found!"
              message="Please try again later to see if there will be departments to show you"
            />
          )}

          <Paginator
            activePage={this.state.activePage}
            handleRowChange={this.handleRowChange}
            handlePaginationChange={this.handlePaginationChange}
            limit={this.state.limit}
            totalPages={this.getTotalPages()}
            isLoading={this.props.isLoading}
          />
        </div>
      </NavBarComponent>
    );
  }
}

DepartmentsComponent.propTypes = {
  isLoading: PropTypes.bool,
  loadDepartments: PropTypes.func,
  resetMessage: PropTypes.func,
  departmentsCount: PropTypes.number,
  departmentsList: PropTypes.array,
  error: PropTypes.string,
  entity: PropTypes.string
};

DepartmentsComponent.defaultProps = {
  loadDepartments: () => {}
};

export default DepartmentsComponent;
