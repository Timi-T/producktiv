import './App.css';
import React from 'react';
import LandingPageBody from '../LandingPageBody/LandingPageBody';
import LandingPage from '../LandingPage/LandingPage';


class App extends React.Component {


  render() {
    return (
      <> 
        <LandingPageBody>
          <LandingPage/>
        </LandingPageBody>
      </>
    );
  }
  
}

export default App;
