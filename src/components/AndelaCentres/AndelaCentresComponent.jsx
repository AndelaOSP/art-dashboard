import React from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import { Table } from 'semantic-ui-react';

import NavBarComponent from '../../_components/NavBarContainer';
import LoaderComponent from '../../components/LoaderComponent';
import ItemsNotFoundComponent from '../common/ItemsNotFoundComponent';
import Paginator from '../common/PaginationComponent';
import StatusMessageComponent from '../common/StatusComponent';
import TableHeader from '../common/Table/TableHeaderComponent';
import TableContent from '../common/Table/TableContent';
import PageHeader from '../common/PageHeader';
import CentreModal from '../../_components/AndelaCentres/CentreModalContainer';

class AndelaCentresComponent extends React.Component {
  state = {
    limit: 10,
    activePage: 1,
    modalOpen: false,
    editModalOpen: false,
    location: {}
  };

  componentDidMount() {
    this.props.loadOfficeLocations(this.state.activePage, this.state.limit);
    this.props.loadCountries();
  }

  handleRowChange = (e, data) => {
    this.setState({ limit: data.value });
    this.props.loadOfficeLocations(this.state.activePage, data.value);
  };

  handlePaginationChange = (e, { activePage }) => {
    this.setState({ activePage });
    this.props.loadOfficeLocations(activePage, this.state.limit);
  };

  handleToggleModal = () => {
    this.setState({ modalOpen: !this.state.modalOpen });
    this.props.resetMessage();
  }

  handleEditToggleModal = (data = {}) => {
    this.setState({
      editModalOpen: !this.state.editModalOpen,
      location: data
    });
    this.props.resetMessage();
  }

  getTotalPages = () => Math.ceil(this.props.locationCount / this.state.limit);

  render() {
    const { isLoading, locationList, error, resetMessage, entity } = this.props;
    const hasLocations = !isEmpty(locationList);
    const showStatus = error;
    const showAction = entity === 'andela-centres';
    const showNotFound = !isLoading && !hasLocations && !showStatus;

    return (
      <NavBarComponent>
        <PageHeader header="Andela Centres">
          <div className="header-modal-button">
            <CentreModal
              showTrigger
              title="Add Centre"
              mode="add"
              onToggle={this.handleToggleModal}
              open={this.state.modalOpen}
            />
          </div>
        </PageHeader>

        <CentreModal
          title="Update An Andela Centre"
          mode="edit"
          onToggle={this.handleEditToggleModal}
          open={this.state.editModalOpen}
          data={this.state.location}
          key={`edit-${this.state.location.id || 1}`}
        />

        <div className="assets-list">
          {showStatus && (
            <StatusMessageComponent
              message={error}
              className="error-status"
              reset={resetMessage}
            />
          )}
        </div>

        {isLoading && !showStatus && <LoaderComponent />}

        <div className="card-container">
          <Cards
            data={locationList}
            headings={['centre_name', 'country']}
          />
        </div>

        {showNotFound && (
          <ItemsNotFoundComponent
            header="No Andela Centres found!"
            message="Please try again later to see if there will be centres to show you"
          />
        )}

        {!isLoading && hasLocations && (
          <Table basic className="assets-list">
            <TableHeader titles={['Name', 'Country']} />
            <TableContent
              data={locationList}
              headings={['centre_name', 'country']}
              showAction={showAction}
              onClick={this.handleEditToggleModal}
            />
          </Table>
        )}

        <Paginator
          activePage={this.state.activePage}
          handleRowChange={this.handleRowChange}
          handlePaginationChange={this.handlePaginationChange}
          limit={this.state.limit}
          totalPages={this.getTotalPages()}
          isLoading={this.props.isLoading}
        />
      </NavBarComponent>
    );
  }
}

AndelaCentresComponent.propTypes = {
  isLoading: PropTypes.bool,
  loadOfficeLocations: PropTypes.func,
  resetMessage: PropTypes.func,
  locationCount: PropTypes.number,
  locationList: PropTypes.array,
  error: PropTypes.string,
  loadCountries: PropTypes.func,
  entity: PropTypes.string
};

AndelaCentresComponent.defaultProps = {
  loadOfficeLocations: () => {}
};

export default AndelaCentresComponent;
