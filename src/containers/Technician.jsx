import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import '../sass/main.scss';

function TechPage() {
  const history = useHistory();

  const [state, setState] = useState({
    name:"",
    date:"",
    unitSN:"",  
  });

  const handleChange = (e) => setState({[e.target.name]: e.target.value});

  function handleSubmit (e) {
    e.preventDefault()
    history.push({
      pathname: '/results',
      state: {
        techName: state.name,
        testDate: state.date,
        techUnitSN: state.unitSN
      }
    }); 
  }

  return (
    <div className="tech-container" >      
      <h3 className="header-sub"> Search by Serial Number: </h3>
        <form className="searchSN-form" action="/search" method="POST"
          onSubmit={handleSubmit}>
          <div className="search-fields">            
          <br />
           <div className="name-input">
              <p className="name">unit SN :</p>
              <input type="number"
                className="name-input-field"
                placeholder="Enter serial number"
                name="unitSN" 
                autoComplete="off"
                onChange={handleChange}/>
          </div>
          <br/>
            <button type="submit"  className="search-button">
              Search
            </button>          
          </div>
        </form>
    </div>
  );
}

export default TechPage;
