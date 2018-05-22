import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Button, Container, Header, Image, Message } from 'semantic-ui-react';

import { loginAction } from '../_actions/login.action';
import { auth, firebase } from '../firebase';

import '../_css/LoginComponent.css';

const provider = new firebase.auth.GoogleAuthProvider();

class LoginComponent extends React.Component {
  state = {
    isVisible: false,
    message: ''
  };

  redirectToDashboard(props) {
    if (props.isAuthenticated) {
      this.props.history.push('/');
    }
  }

  componentDidMount() {
    this.redirectToDashboard(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.redirectToDashboard(nextProps);
  }

  // closes the message component
  handleDismiss = () => {
    this.setState({
      isVisible: false,
      message: ''
    })
  }

  // authenticates user
  handleLogin = () => {
    auth.signInWithEmail(provider).then(result => {
      const pattern = /^[\w.-]+@andela\.com$/;

      if (pattern.test(result.user.email)) {
        this.props.loginAction(result.credential.accessToken);
      } else {
        this.setState({
          isVisible: true,
          message: 'please sign in with your andela email'
        });
      }
    }).catch(error => {
      if (error) {
        this.setState({
          isVisible: true,
          message: error.message
        });
      }
    });
  }

  render() {
    return (
      <div className='app landing-overlay background'>
        <Container>
          <Image
            centered
            src='http://res.cloudinary.com/damc3mj5u/image/upload/v1526571584/logo_uw39tc.png'
            alt='Andela logo'
            id="andela-logo"
          />
          <Header className='landing-heading' inverted content='ART' />
          <Header as='h1' className='description' inverted content='Andela Resource Tracker' />
          <Button onClick={this.handleLogin} className='google-button' size='large'>
            <Image
              floated='left'
              src='http://res.cloudinary.com/damc3mj5u/image/upload/v1526571608/google-logo_jjjjqs.svg'
              alt='Google logo'
              id='google-logo'
            />
            Sign in with Google
          </Button>
        </Container>
        {this.state.isVisible &&
          <Message
            warning
            onDismiss={this.handleDismiss}
            content={this.state.message}
          />}
      </div>
    )
  }
};

const mapStateToProps = ({ loginReducer }) => {
  const { isAuthenticated } = loginReducer;
  return {
    isAuthenticated,
  }
}

export default withRouter(connect(mapStateToProps, {
  loginAction,
})(LoginComponent));
