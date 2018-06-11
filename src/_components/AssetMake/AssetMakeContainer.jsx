import * as React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';

import AssetMakeComponent from '../../components/AssetMake/AssetMakeComponent'

import { loadAssetMakes } from '../../_actions/assetMakes.actions';

class AssetMakeContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount(){
    if (_.isEmpty(this.props.assetMakes)) {
      this.props.loadAssetMakes();
    }
  }

  render(){
    return <AssetMakeComponent {...this.props}/>
  }

}
const mapStateToProps = ({ assetMakesList }) => ({
  assetMakes: assetMakesList
});
export default connect(mapStateToProps, {loadAssetMakes})(AssetMakeContainer);