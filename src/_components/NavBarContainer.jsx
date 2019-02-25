import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import toggleVisibilityAction from '../_actions/navBarToggle.action';
import { NavBarComponent } from '../components/NavBarComponent';
import { getAssetsAction } from '../_actions/assets.action';


export const mapStateToProps = ({ navBarVisibility }) => {
  const { isVisible } = navBarVisibility;
  return {
    isVisible
  };
};

export default withRouter(connect(mapStateToProps, {
  toggleVisibilityAction,
  getAssetsAction
})(NavBarComponent));
