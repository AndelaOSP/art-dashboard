import React from 'react';
import { withRouter } from 'react-router-dom';
import { Button, Container, Header, Image } from 'semantic-ui-react';
import { SemanticToastContainer } from 'react-semantic-toasts';
import PropTypes from 'prop-types';

import { signInWithEmail, firebase } from '../firebase';
import { ToastMessage } from '../_utils/ToastMessage';
import { validAndelaEmail } from '../_utils/validAndelaEmail';

import '../_css/LoginComponent.css';

const provider = new firebase.auth.GoogleAuthProvider();

class LoginComponent extends React.Component {
  componentDidMount() {
    if (localStorage.getItem('art-prod-web-token')) {
      this.props.history.push('/dashboard');
    }
  }

  // checks that the user used an Andela email
  validateUser = (result) => {
    if (validAndelaEmail(result.user.email)) {
      result.user.getIdToken().then((idToken) => {
        localStorage.setItem('art-prod-web-token', idToken);
        this.props.history.push('/dashboard');
      });
      ToastMessage.success({ message: 'Welcome to ART' });
    } else {
      ToastMessage.error({ message: 'Please sign in with your andela email' });
    }
  };

  // authenticates user`
  handleLogin = () => {
    signInWithEmail(provider)
      .then(this.validateUser)
      .catch(ToastMessage.error);
  };

  render() {
    return (
      <div>
        <SemanticToastContainer />
        <div className="app landing-overlay background">
          <Container>
            <Image
              centered
              src="https://res.cloudinary.com/damc3mj5u/image/upload/v1526571584/logo_uw39tc.png"
              alt="Andela logo"
              id="andela-logo"
            />
            <Header className="landing-heading" inverted content="ART" />
            <Header
              as="h1"
              className="description"
              inverted
              content="Andela Resource Tracker"
            />
            <Button
              onClick={this.handleLogin}
              className="google-button"
              size="large"
            >
              <Image
                floated="left"
                src="https://res.cloudinary.com/damc3mj5u/image/upload/v1526571608/google-logo_jjjjqs.svg"
                alt="Google logo"
                id="google-logo"
              />
              Sign in with Google
            </Button>
          </Container>
        </div>
      </div>
    );
  }
}

LoginComponent.propTypes = {
  history: PropTypes.object
};

LoginComponent.defaultProps = {
  history: {}
};

export default withRouter(LoginComponent);
