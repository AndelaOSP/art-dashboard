import React from 'react';
import { Button, Container, Header, Image } from 'semantic-ui-react';
import './App.css';

const App = () => {
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
        <Button className='google-button' size='large'>
          <Image 
            floated='left' 
            src='http://res.cloudinary.com/damc3mj5u/image/upload/v1526571608/google-logo_jjjjqs.svg'
            alt='Google logo'
            id='google-logo'
          />
          Sign in with Google
        </Button>
      </Container>
    </div>
  );
}

export default App;
