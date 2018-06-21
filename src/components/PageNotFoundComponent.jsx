import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Image, Button } from 'semantic-ui-react';

import '../_css/PageNotFoundComponent.css';

const PageNotFoundComponent = props => (
  <div className="page-404">
    <Image
      src="images/andela_logo.png"
      alt="Andela logo"
      id="andela-logo-404"
    />
    <Image
      centered
      src="images/sad_face.png"
      alt="Sad face"
      id="sad-face-404"
    />
    <p className="title-404"> Sorry we could not find that page! </p>
    <p className="para-404"> There's no shame in being lost in a page that was probably never there in the first place! </p>
    <Button className="back-button-404" onClick={() => props.history.goBack()}>let's go back</Button>
    <span className="or-404"> or </span>
    <Link to="/dashboard"><Button className="home-button-404">head home</Button></Link>
  </div>
);

PageNotFoundComponent.propTypes = {
  history: PropTypes.object.isRequired
};

export default PageNotFoundComponent;
