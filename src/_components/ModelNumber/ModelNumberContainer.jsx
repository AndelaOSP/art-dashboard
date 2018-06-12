import * as React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';

import ModelNumberComponent from '../../components/ModelNumber/ModelNumberComponent'

import { loadAssetMakes } from '../../_actions/assetMakes.actions';

class ModelNumberContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount(){
    if (_.isEmpty(this.props.assetMakes)) {
      this.props.loadAssetMakes();
    }
  }

  render(){
    return <ModelNumberComponent {...this.props}/>
  }

}
const mapStateToProps = ({ assetMakesList }) => ({
  assetMakes: assetMakesList
});
export default connect(mapStateToProps, {loadAssetMakes})(ModelNumberContainer);