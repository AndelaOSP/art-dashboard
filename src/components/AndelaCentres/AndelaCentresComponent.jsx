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
// import AndelaCentresModal from './AndelaCentresModal';
import CentreModal from '../../_components/AndelaCentres/CentreModalContainer';

class AndelaCentresComponent extends React.Component {
  state = {
    limit: 10,
    activePage: 1,
    // centre: '',
    // country: '',
    modalOpen: false,
    editModalOpen: false,
    locationId: null
  };

  componentDidMount() {
    this.props.loadOfficeLocations(this.state.activePage);
    this.props.loadCountries();
  }

  handleRowChange = (e, data) => {
    this.setState({ limit: data.value });
    this.props.loadOfficeLocations(this.state.activePage, data.value);
  };

  handlePaginationChange = (e, { activePage }) => {
    this.setState({ activePage });
    this.props.loadOfficeLocations(activePage);
  };

  handleToggleModal = () => {
    this.setState({ modalOpen: !this.state.modalOpen });
    this.props.resetMessage();
  }

  // onSelectCountry = (event, data) => {
  //   this.setState({ country: data.value });
  // }

  handleChange = (event) => {
    const { value, name } = event.target;

    this.setState({
      [name]: value
    });
  }

  // handleSubmit = () => {
  //   const newCentre = {
  //     centre_name: this.state.centre,
  //     country: this.state.country
  //   };
  //   this.props.createOfficeLocation(newCentre);
  // };

  handleEditToggleModal = (id = null) => {
    console.group('PARENT TOGGLE EDIT');
    console.log('id: ', id);
    console.groupEnd();

    this.setState({
      editModalOpen: !this.state.editModalOpen,
      locationId: id
    });
    this.props.resetMessage();
  }

  // handleEditSubmit = (event) => {
  //   event.preventDefault();

  //   this.props.updateAndelaCentre(this.state.locationId, {
  //     centre_name: this.state.centre,
  //     country: this.state.country
  //   });
  // };

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
            {/* <AndelaCentresModal
              showTrigger
              title="Add Centre"
              onToggleModal={this.handleToggleModal}
              modalOpen={this.state.modalOpen}
              onChange={this.handleChange}
              onSubmit={this.handleSubmit}
              onSelectCountry={this.onSelectCountry}
              country={this.state.country}
            /> */}
          </div>
        </PageHeader>

        <CentreModal
          title="Update An Andela Centre"
          mode="edit"
          onToggle={this.handleEditToggleModal}
          open={this.state.editModalOpen}
          id={this.state.locationId}
        />
        {/* <AndelaCentresModal
          showTrigger={false}
          title="Update An Andela Centre"
          onToggleModal={this.handleEditToggleModal}
          modalOpen={this.state.editModalOpen}
          onChange={this.handleChange}
          onSubmit={this.handleEditSubmit}
          onSelectCountry={this.onSelectCountry}
          country={this.state.country}
        /> */}

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
  // createOfficeLocation: PropTypes.func,
  resetMessage: PropTypes.func,
  locationCount: PropTypes.number,
  locationList: PropTypes.array,
  error: PropTypes.string,
  loadCountries: PropTypes.func,
  entity: PropTypes.string
  // updateAndelaCentre: PropTypes.func
};

AndelaCentresComponent.defaultProps = {
  loadOfficeLocations: () => {}
};

export default AndelaCentresComponent;
