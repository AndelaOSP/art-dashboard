import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Header, Table, Pagination } from 'semantic-ui-react';
import TableRowComponent from './TableRowComponent';
import ModalComponent from './common/ModalComponent';
import SideMenuComponent from '../_components/SideMenuComponent';
import { getAssetsAction } from '../_actions/assets.action';
import { createModelNumbers } from '../_actions/modelNumbers.actions';
import ModelNumberContainer from '../_components/ModelNumber/ModelNumberContainer';
import CategoryContainer from '../_components/Category/CategoryContainer';
import '../_css/AssetComponent.css';

export class AssetsComponent extends Component {
    state = {
      activePage: 1,
      limit: 10,
    };

    componentDidMount() {
      this.props.getAssetsAction();
    }

  handlePaginationChange = (e, { activePage }) => {
    this.setState({ activePage });
    this.props.getAssetsAction(activePage);
  }

  handlePageTotal = () => Math.ceil(this.props.assetsCount / this.state.limit)

  emptyAssetTypeCheck = () => (this.props.assets.length === 0)

  loadTableContent = () => {
    if (this.emptyAssetTypeCheck()) {
      return <Table.Row><Table.Cell colSpan="6">No Data found</Table.Cell></Table.Row>;
    }
    return (this.props.assets.map(asset => (<TableRowComponent
      key={asset.id}
      data={asset}
      headings={['category',
        'sub_category',
        'asset_type',
        'make',
        'model_number',
        'asset_code']}
    />)));
  }

  addAssetModel = () => (<ModelNumberContainer />)

  addcategory = () => (<CategoryContainer />)

  render() {
    return (
      <SideMenuComponent>
        <Header className="landing-heading" content="All Assets" />
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>
                <div className="header">
                  Category
                  <ModalComponent modalTitle="Add Asset Category">
                    {this.addcategory()}
                  </ModalComponent>
                </div>
              </Table.HeaderCell>
              <Table.HeaderCell>
                <div className="header">
                  Sub-category
                  <ModalComponent />
                </div>
              </Table.HeaderCell>
              <Table.HeaderCell >
                <div className="header">
                  Type
                  <ModalComponent />
                </div>
              </Table.HeaderCell>
              <Table.HeaderCell>
                <div className="header">
                  Make
                  <ModalComponent />
                </div>
              </Table.HeaderCell>
              <Table.HeaderCell >
                <div className="header">
                  Model
                  <ModalComponent modalTitle="Add Asset Model Number">
                    <ModelNumberContainer />
                  </ModalComponent>
                </div>
              </Table.HeaderCell>
              <Table.HeaderCell>
                <div className="header">
                  Item
                  <ModalComponent />
                </div>
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {
              this.loadTableContent()
            }
          </Table.Body>

          <Table.Footer>
            <Table.Row>
              <Table.HeaderCell colSpan="6">
                {
                  (this.emptyAssetTypeCheck()) ? '' :
                  <Pagination
                    totalPages={this.handlePageTotal()}
                    onPageChange={this.handlePaginationChange}
                    activePage={this.state.activePage}
                  />
                }
              </Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
        </Table>
      </SideMenuComponent>
    );
  }
}

AssetsComponent.propTypes = {
  assets: PropTypes.array,
  assetsCount: PropTypes.number,
  getAssetsAction: PropTypes.func
};

AssetsComponent.defaultProps = {
  assets: [],
  assetsCount: 0,
  getAssetsAction: () => {}
};

const mapStateToProps = ({ viewAssets }) => {
  const { assets, assetsCount } = viewAssets;
  return {
    assets,
    assetsCount,
  };
};

export default connect(mapStateToProps, {
  getAssetsAction,
  createModelNumbers,
})(AssetsComponent);
