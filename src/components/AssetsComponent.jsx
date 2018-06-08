import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Header, Table, Pagination } from 'semantic-ui-react';
import TableRowComponent from './TableRowComponent';
import AddAssetModel from './ModalComponent';
import SideMenuComponent from '../_components/SideMenuComponent';
import { getAssetsAction } from '../_actions/assets.action';
import { createModelNumbers } from '../_actions/modelNumbers.actions';
import '../_css/AssetComponent.css';

export class AssetsComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activePage: 1,
      limit: 10,
      modelNumber: '',
      assetMake: '',
      newModel: {},
      modalOpen: true,
    }
  }

  componentDidMount() {
    this.props.getAssetsAction();
  }

  handlePaginationChange = (e, { activePage }) => {
    this.setState({ activePage });
    this.props.getAssetsAction(activePage);
  }

  handlePageTotal = () => {
    return Math.ceil(this.props.assetsCount / this.state.limit);
  }

  handleSubmit = () => {
    this.props.createModelNumbers(this.state.newModel)
    console.log('------------->>>>>>>', this.props)
  }
  handleOpen = () => this.setState({ modalOpen: true })

  handleClose = () => this.setState({ modalOpen: false })

  updateFromField   = (name, value) => {
    let newModel = this.state.newModel
    newModel[name] = value
    this.setState({newModel})
  }

  emptyAssetTypeCheck = () => {
    return (this.props.assets.length === 0);
  }

  loadTableContent = () => {
    if (this.emptyAssetTypeCheck()) {
      return <Table.Row><Table.Cell colSpan="6">No Data found</Table.Cell></Table.Row>
    } else {
    return (this.props.assets.map((asset, index) => {
        return <TableRowComponent key={index} data={asset} aasets />
    }));
    }
  }
  render() {
    return (
      <SideMenuComponent>
        <Header className='landing-heading' content='All Assets' />
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Category</Table.HeaderCell>
              <Table.HeaderCell>Sub-category</Table.HeaderCell>
              <Table.HeaderCell>Type</Table.HeaderCell>
              <Table.HeaderCell>Make</Table.HeaderCell>
              <Table.HeaderCell className="header">Model
              <AddAssetModel
                handleSubmit={this.handleSubmit}
                updateFromField={this.updateFromField}
                modalOpen={this.state.modalOpen}
                handleOpen={this.handleOpen}
                handleClose={this.handleClose}
                />
              </Table.HeaderCell>
              <Table.HeaderCell>Item</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {
              this.loadTableContent()
            }
          </Table.Body>

          <Table.Footer>
            <Table.Row>
              <Table.HeaderCell colSpan='6'>
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
    )
  }
};

const mapStateToProps = ({ viewAssets }) => {
  const { assets, assetsCount } = viewAssets;
  return {
    assets,
    assetsCount,
  }
}

export default connect(mapStateToProps, {
  getAssetsAction,
  createModelNumbers,
})(AssetsComponent);
