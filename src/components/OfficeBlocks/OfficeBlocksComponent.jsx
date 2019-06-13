import React from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';

import { Dropdown } from 'semantic-ui-react';
import NavBarComponent from '../../_components/NavBarContainer';
import LoaderComponent from '../../components/LoaderComponent';
import Cards from '../common/Card/Card';
import ItemsNotFoundComponent from '../common/ItemsNotFoundComponent';
import Paginator from '../common/PaginationComponent';
import StatusMessageComponent from '../common/StatusComponent';
import PageHeader from '../common/PageHeader';
import OfficeBlocksModal from '../../_components/OfficeBlocks/OfficeBlocksModal';
import verifySuperAdmin from '../../_utils/verifySuperAdmin';

import '../../_css/officeBlocksComponent.scss';

class OfficeBlocksComponent extends React.Component {
  state = {
    limit: 10,
    activePage: 1,
    modalOpen: false,
    editModalOpen: false,
    block: {}
  };

  componentDidMount() {
    this.props.loadOfficeBlocks(this.state.activePage, this.state.limit);
    this.props.loadOfficeLocations();
  }

  handleRowChange = (e, data) => {
    this.setState({ limit: data.value });
    this.props.loadOfficeBlocks(this.state.activePage, data.value);
  };

  handlePaginationChange = (e, { activePage }) => {
    this.setState({ activePage });
    this.props.loadOfficeBlocks(activePage, this.state.limit);
  };

  handleToggleModal = () => {
    this.setState({ modalOpen: !this.state.modalOpen });
    this.props.resetMessage();
  };

  handleEditToggleModal = (data = {}) => {
    this.setState({
      editModalOpen: !this.state.editModalOpen,
      block: data
    });
    this.props.resetMessage();
  };

  handleDropdownChange = (e, data) => {
    this.props.loadCentreOfficeBlocks(data.value);
  };

  getTotalPages = () => Math.ceil(this.props.blockCount / this.state.limit);

  render() {
    const { isLoading, blockList, error, resetMessage, entity, locationList } = this.props;
    const hasLocations = !isEmpty(blockList);
    const showStatus = error;
    const showAction = entity === 'office-blocks';
    const showNotFound = !isLoading && !hasLocations && !showStatus;
    const options = [];
    locationList.forEach((location, index) => {
      const locObj = {
        key: index,
        text: location.name,
        value: location.id
      };
      options.push(locObj);
    });

    return (
      <NavBarComponent>
        <div className="assets-list">
          <PageHeader header="Office Blocks">
            <div className="header-modal-button">
              <OfficeBlocksModal
                showTrigger
                title="Add Office Block"
                mode="add"
                onToggle={this.handleToggleModal}
                open={this.state.modalOpen}
              />
              {
              verifySuperAdmin() && (
                <div className="center-filter">
                  <Dropdown
                    placeholder="Select Center"
                    fluid
                    selection
                    options={options}
                    onChange={this.handleDropdownChange}
                  />
                </div>
              )
            }
            </div>
          </PageHeader>

          <OfficeBlocksModal
            title="Update An Office Block"
            mode="edit"
            onToggle={this.handleEditToggleModal}
            open={this.state.editModalOpen}
            data={this.state.block}
            key={`edit-${this.state.block.id || 1}`}
          />

          {showStatus && (
            <StatusMessageComponent
              message={error}
              className="error-status"
              reset={resetMessage}
            />
          )}

          {isLoading && !showStatus && <LoaderComponent />}

          {!isLoading && hasLocations && (
            <Cards
              data={blockList}
              headings={['name']}
              imageName="map.svg"
              showAction={showAction}
              onClick={this.handleEditToggleModal}
            />
          )}

          {showNotFound && (
            <ItemsNotFoundComponent
              header="No Office Block found!"
              message="Please try again later to see if there will be office Blocks to show you"
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

OfficeBlocksComponent.propTypes = {
  isLoading: PropTypes.bool,
  loadOfficeBlocks: PropTypes.func,
  resetMessage: PropTypes.func,
  blockCount: PropTypes.number,
  blockList: PropTypes.array,
  locationList: PropTypes.array,
  error: PropTypes.string,
  loadOfficeLocations: PropTypes.func,
  loadCentreOfficeBlocks: PropTypes.func,
  entity: PropTypes.string
};

OfficeBlocksComponent.defaultProps = {
  loadOfficeBlocks: () => {}
};

export default OfficeBlocksComponent;
