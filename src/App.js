import React, { useState } from 'react';
import {
  BrowserRouter as Router, Switch,
  Route
} from 'react-router-dom';
import Header from './components/Header.jsx';
import Nav from './components/Nav.jsx';
import Home from './components/Home.jsx';
import Management from './containers/Management.jsx';
import Technician from './containers/Technician.jsx';
import TechByTest from './containers/TechByTest.jsx';
import Register from './containers/Register.jsx';
import Results from './containers/ResultsContainer.jsx';
import Units from './containers/Units.jsx';
import TestsbySn from './containers/TestsResultBySn.jsx';
import SHowHideBtn from './containers/ResultsBtn.jsx';
import Footer from './components/Footer.jsx';
import SearchOptionsPage from './containers/SearchOptions.jsx';
import AlertComponent from './components/Alert.jsx';
import NotFound from './components/NotFound.jsx';
import '../src/sass/main.scss';
// import './App.css';

const App = () => {
  const [errorMessage, updateErrorMessage] = useState(null);

  return (
    <Router>
      <div className="App">
      <Header/>
      <Nav />
        <div className="App-header">
          <Switch>
            <Route path="/" component={Home} exact={true} />
            <Route path="/management" component={Management} />
            <Route path="/technician" component={Technician} />
            <Route path="/techByTest" component={TechByTest} />
            <Route path="/register" >
              <Register showError={updateErrorMessage} />
            </Route>
            <Route path="/results" component={Results} />
            <Route path="/units" component={Units} />
            <Route path="/results-btn" component={SHowHideBtn} />
            <Route path="/search-options" component={SearchOptionsPage} />
            <Route path="/tests-result" component={TestsbySn}/>
            <Route component={NotFound}/>
          </Switch>
          <AlertComponent errorMessage={errorMessage} hideError={updateErrorMessage}/>
        </div>
        <Footer/>
      </div>
    </Router>
  );
}

export default App;
