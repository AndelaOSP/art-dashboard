import React from 'react';
import PropTypes from 'prop-types';
import {
  Header,
  Table,
  Pagination,
  Segment,
  Divider,
  Button
} from 'semantic-ui-react';
import { isEmpty } from 'lodash';

import TableRow from '../TableRowComponent';
import NavBarComponent from '../../_components/NavBarContainer';
import DropdownComponent from '../../_components/DropdownComponent';
import LoaderComponent from '../../components/LoaderComponent';
import rowOptions from '../../_utils/pageRowOptions';
import ModalComponent from '../common/ModalComponent';
import ItemsNotFoundComponent from '../common/ItemsNotFoundComponent';

export class OfficeSectionsComponent extends React.Component {
  state = {
    activePage: 1,
    limit: 10
  };

  componentDidMount() {
    this.props.loadOfficeSections(this.state.activePage, this.state.limit);
  }

  handleRowChange = (event, data) => {
    this.setState({ limit: data.value });
    this.props.loadOfficeSections(this.state.activePage, data.value);
    event.stopPropagation();
  };

  handlePaginationChange = (event, { activePage }) => {
    this.setState({ activePage });
    this.props.loadOfficeSections(activePage);
    event.stopPropagation();
  };

  handleToggleModal = () => this.setState({ modalOpen: !this.state.modalOpen });

  getTotalPages = () => Math.ceil(this.props.count / this.state.limit);

  render() {
    if (this.props.isLoading) {
      return (
        <NavBarComponent>
          <LoaderComponent />
        </NavBarComponent>
      );
    }
    if (isEmpty(this.props.list)) {
      return (
        <NavBarComponent>
          <ItemsNotFoundComponent
            header="No Office Section found!"
            message="Please try again later to see if there will be Office Sections to show you"
          />
        </NavBarComponent>
      );
    }
    return (
      <NavBarComponent>
        <div className="incidence-list">
          <div id="page-heading-section">
            <Header as="h1" id="page-headings" floated="left" content="Office Sections" />
            <Divider id="assets-divider" />
            <div className="header-modal-button">
              <ModalComponent
                trigger={
                  <Button
                    className="filter-button"
                  >
                    ADD OFFICE SECTION
                  </Button>
                }
                modalTitle="Add Office Section"
                toggleModal={this.handleToggleModal}
                modalOpen={this.state.modalOpen}
              />
            </div>
          </div>
          <Table basic>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Office Sections</Table.HeaderCell>
                <Table.HeaderCell>Office Floor</Table.HeaderCell>
                <Table.HeaderCell>Office Block</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {
                this.props.list.map(section => (
                  <TableRow
                    key={section.id}
                    data={section}
                    headings={['name', 'floor', 'block']}
                  />
                ))
              }
            </Table.Body>

            <Table.Footer>
              <Table.Row>
                {!isEmpty(this.props.list) && (
                  <Table.HeaderCell colSpan="4" id="pagination-header">
                    <Segment.Group horizontal id="art-pagination-section">
                      <Segment>
                        <Pagination
                          totalPages={this.getTotalPages()}
                          onPageChange={this.handlePaginationChange}
                          activePage={this.state.activePage}
                        />
                      </Segment>
                      <Segment>
                        <DropdownComponent
                          customClass="page-limit"
                          placeHolder="Show Rows"
                          options={rowOptions}
                          upward
                          value={this.state.limit}
                          onChange={this.handleRowChange}
                        />
                      </Segment>
                    </Segment.Group>
                  </Table.HeaderCell>
                )}
              </Table.Row>
            </Table.Footer>
          </Table>
        </div>
      </NavBarComponent>
    );
  }
}

OfficeSectionsComponent.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  loadOfficeSections: PropTypes.func.isRequired,
  list: PropTypes.array.isRequired,
  count: PropTypes.number.isRequired
};

export default OfficeSectionsComponent;
