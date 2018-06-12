import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Header, Table, Pagination } from 'semantic-ui-react';
import TableRowComponent from './TableRowComponent';
import ModalComponent from './common/ModalComponent';
import SideMenuComponent from '../_components/SideMenuComponent';
import { getAssetsAction } from '../_actions/assets.action';
import { createModelNumbers } from '../_actions/modelNumbers.actions';
import AssetMake from '../_components/AssetMake/AssetMakeContainer';
import '../_css/AssetComponent.css';

export class AssetsComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activePage: 1,
      limit: 10,
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

  emptyAssetTypeCheck = () => {
    return (this.props.assets.length === 0);
  }

  loadTableContent = () => {
    if (this.emptyAssetTypeCheck()) {
      return <Table.Row><Table.Cell colSpan="6">No Data found</Table.Cell></Table.Row>
    } else {
      return (this.props.assets.map((asset, index) => {
        return <TableRowComponent
          key={index}
          data={asset}
          headings={['category',
            'sub_category',
            'asset_type',
            'make',
            'model_number',
            'asset_code']}
        />
      }));
    }
  }

  addAssetModel = () => {
  return(<AssetMake />)
}

  render() {

    return (
        <SideMenuComponent>
          <Header className='landing-heading' content='All Assets' />
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>
                    Category
                    <ModalComponent/>
                </Table.HeaderCell>
                <Table.HeaderCell>
                    Sub-category
                    <ModalComponent/>
                </Table.HeaderCell>
                <Table.HeaderCell>
                    Type
                    <ModalComponent/>
                </Table.HeaderCell>
                <Table.HeaderCell >
                    Make
                    <ModalComponent/>
                </Table.HeaderCell>
                <Table.HeaderCell className="header">
                    Model
                    <ModalComponent modalTitle="Add Asset Model Number">
                        { this.addAssetModel() }
                    </ModalComponent>
                </Table.HeaderCell>
                <Table.HeaderCell>
                    Item
                    <ModalComponent/>

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
      );
  } // render()

}; // AssetComponent

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
