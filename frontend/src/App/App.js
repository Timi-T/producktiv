import './App.css';
import React from 'react';
import LandingPageBody from '../LandingPageBody/LandingPageBody';
import LandingPage from '../LandingPage/LandingPage';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Videospage } from '../Videospage/Videospage';
import { Courses } from '../Courses/Courses';
import { Sidemenu } from '../Sidemenu/Sidemenu';


class App extends React.Component {
constructor(props){
  super(props)
  this.state = {
    token: undefined
  }
}


setToken = (token) => {
  this.setState({token: token})
}

  render() {
    return (
        <LandingPageBody>
          <LandingPage/>
        </LandingPageBody> 
      // <BrowserRouter>
      //   <Sidemenu>
      //     <Routes>
      //       <Route path="/" element={<Videospage/>}/>
      //       <Route path="/videos" element={<Videospage/>}/>
      //       <Route path="/courses" element={<Courses/>}/>
      //     </Routes>
      //   </Sidemenu>
      // </BrowserRouter>
        
    );
  }
  
}

export default App;
