import React from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import { Table, Button, Divider, Header } from 'semantic-ui-react';

import NavBarComponent from '../../_components/NavBarContainer';
import LoaderComponent from '../../components/LoaderComponent';
import ItemsNotFoundComponent from '../common/ItemsNotFoundComponent';
import Paginator from '../common/PaginationComponent';
import StatusMessageComponent from '../common/StatusComponent';
import TableHeader from '../common/Table/TableHeaderComponent';
import TableContent from '../common/Table/TableContent';
import ModalComponent from '../common/ModalComponent';
import CentreModal from './CentreModal';

class AndelaCentresComponent extends React.Component {
  state = {
    limit: 10,
    activePage: 1,
    centre: '',
    country: ''
  };

  componentDidMount() {
    this.props.loadOfficeLocations(this.state.activePage);
  }

  handleRowChange = (e, data) => {
    this.setState({ limit: data.value });
    this.props.loadOfficeLocations(this.state.activePage, data.value);
  };

  handlePaginationChange = (e, { activePage }) => {
    this.setState({ activePage });
    this.props.loadOfficeLocations(activePage);
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onSelectCountry = (event, data) => {
    this.setState({ country: data.value });
  };

  handleSubmit = () => {
    const newCentre = {
      centre_name: this.state.centre,
      country: this.state.country
    };
    this.props.createOfficeLocation(newCentre);
  };

  getTotalPages = () => Math.ceil(this.props.locationCount / this.state.limit);

  render() {
    const { isLoading, locationList, error, resetMessage } = this.props;
    const hasLocations = !isEmpty(locationList);
    const showStatus = error;
    const showNotFound = !isLoading && !hasLocations && !showStatus;

    return (
      <NavBarComponent>
        <div className="assets-list">
          <Header as="h1" id="page-headings" floated="left" content="Andela Centres" />
          <Divider id="assets-divider" />
          <div className="header-modal-button">
            <ModalComponent
              trigger={
                <Button className="add-asset" size="medium">
                  ADD CENTRE
                </Button>
              }
              modalTitle="Add Centre"
            >
              <CentreModal
                handleChange={this.handleChange}
                handleSubmit={this.handleSubmit}
                countries={this.props.locationList}
                onSelectCountry={this.onSelectCountry}
                country={this.state.country}
              />
            </ModalComponent>
          </div>

          <div className="assets-list">
            {showStatus && (
              <StatusMessageComponent
                message={error}
                className="error-status"
                reset={resetMessage}
              />
            )}
          </div>

          {isLoading && <LoaderComponent />}

          {!isLoading && !hasLocations && (
            <ItemsNotFoundComponent
              header="No Andela Centres found!"
              message="Please try again later to see if there will be centres to show you"
            />
          )}

          {isLoading && !showStatus && <LoaderComponent />}

          {showNotFound && (
            <ItemsNotFoundComponent
              header="No Andela Centres found!"
              message="Please try again later to see if there will be centres to show you"
            />
          )}

          {!isLoading && hasLocations && (
            <Table basic>
              <TableHeader titles={['Name', 'Country']} />
              <TableContent data={locationList} headings={['centre_name', 'country']} />
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
        </div>
      </NavBarComponent>
    );
  }
}

AndelaCentresComponent.propTypes = {
  isLoading: PropTypes.bool,
  loadOfficeLocations: PropTypes.func,
  createOfficeLocation: PropTypes.func,
  resetMessage: PropTypes.func,
  locationCount: PropTypes.number,
  locationList: PropTypes.array,
  error: PropTypes.string
};

AndelaCentresComponent.defaultProps = {
  loadOfficeLocations: () => {}
};

export default AndelaCentresComponent;
