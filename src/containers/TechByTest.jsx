import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import '../sass/main.scss';

function TechByTest() {
  const history = useHistory();

  const [chosenTests, setChosenTests] = useState({
    firstPrepRes: false,
    imuGpsRes: false,
    TcxoCalRes: false,
    p1dbRes: false,
    curConsRes: false,
    fulLinkRes: false,
    crossPollRes: false,
    generalRes: false,
  });
  const [isChooseAll, setIsChooseAll] = useState(true);

  const handleCheckboxChange = event => {
    const inputChecked = event.target.checked;
    const inputVal = event.target.name;
        
    switch (inputVal) {
      case "chooseAll":          
        var checkboxes = document.querySelectorAll('input[type="checkbox"]');
        setIsChooseAll(!isChooseAll);
        for (var i = 0; i < checkboxes.length; i++) {
            if (checkboxes[i] !== isChooseAll)
                checkboxes[i].checked = isChooseAll;
        }
        setChosenTests({
          firstPrepRes: isChooseAll,
          imuGpsRes: isChooseAll,
          TcxoCalRes: isChooseAll,
          p1dbRes: isChooseAll,
          curConsRes: isChooseAll,
          fulLinkRes: isChooseAll,
          crossPollRes: isChooseAll,
          generalRes: isChooseAll
        });
        break;
      case "firstPrepRes":
        setChosenTests({
          ...chosenTests,
          firstPrepRes: inputChecked
        });
        break;
      case "imuGpsRes":
        setChosenTests({
          ...chosenTests,
          imuGpsRes: inputChecked
        });
        break;
      case "TcxoCalRes":
        setChosenTests({
          ...chosenTests,
          TcxoCalRes: inputChecked
        });
      break;
      case "p1dbRes":
        setChosenTests({
          ...chosenTests,
          p1dbRes: inputChecked
        });
      break;
      case "curConsRes":
        setChosenTests({
          ...chosenTests,
          curConsRes: inputChecked
        });
      break;
      case "fulLinkRes":
        setChosenTests({
          ...chosenTests,
          fulLinkRes: inputChecked
        });
      break;
      case "crossPollRes":
        setChosenTests({
          ...chosenTests,
          crossPollRes: inputChecked
        });
      break;
      case "generalRes":
        setChosenTests({
          ...chosenTests,
          generalRes: inputChecked
        });
      break;
      default:
        setChosenTests({
          firstPrepRes: false,
          imuGpsRes: false,
          TcxoCalRes: false,
          p1dbRes: false,
          curConsRes: false,
          fulLinkRes: false,
          crossPollRes: false,
          generalRes: false
        });
        break;
    }     
  }

  function handleClick (e) {
    e.preventDefault()
    history.push({
      pathname: '/units',
      state: {
        testsChosen: chosenTests
      }
    }); 
  }

  return (
    <div className="tech-container" >
      <h3 className="header">Choose tests</h3>
        
        <form className="searchSN-form" action="/search" method="POST">
          
            <div className="tests-input">
            
              <label className="checkbox-lbl">
                <input
                  type="checkbox"
                  name="chooseAll"
                  className="test-checkbox"                  
                  onChange={handleCheckboxChange}
                />
                <span className="test-text">Choose all</span>
              </label>

              <label className="checkbox-lbl">
                <input
                  type="checkbox"
                  name="firstPrepRes"
                  className="test-checkbox"                  
                  onChange={handleCheckboxChange}
                />
                <span className="test-text">First-General-Prep-test</span>
              </label>
              
              <label className="checkbox-lbl">
                  <input
                    type="checkbox"
                    name="imuGpsRes"
                    className="test-checkbox"
                    onChange={handleCheckboxChange}
                  />
                  <span className="test-text">IMU-test</span>
              </label>
              
              <label className="checkbox-lbl">
                  <input
                    type="checkbox"
                    name="TcxoCalRes"
                    className="test-checkbox"
                    onChange={handleCheckboxChange}
                  />
                  <span className="test-text">TCXO-calibration</span>
              </label>
              
              <label className="checkbox-lbl">
                  <input
                    type="checkbox"
                    name="p1dbRes"
                    className="test-checkbox"
                    onChange={handleCheckboxChange}
                  />
                  <span className="test-text">P1db-test</span>
              </label>
              
              <label className="checkbox-lbl">
                  <input
                    type="checkbox"
                    name="curConsRes"
                    className="test-checkbox"
                    onChange={handleCheckboxChange}
                  />
                  <span className="test-text">Current-consumption</span>
              </label>
              
              <label className="checkbox-lbl">
                  <input
                    type="checkbox"
                    name="fulLinkRes"
                    className="test-checkbox"
                    onChange={handleCheckboxChange}
                  />
                  <span className="test-text">FullLink</span>
              </label>
              
              <label className="checkbox-lbl">
                  <input
                    type="checkbox"
                    name="crossPollRes"
                    className="test-checkbox"
                    onChange={handleCheckboxChange}
                  />
                  <span className="test-text">cross-poll</span>
              </label>
              
              <label className="checkbox-lbl">
                  <input
                    type="checkbox"
                    name="generalRes"
                    className="test-checkbox"
                    onChange={handleCheckboxChange}
                  />
                  <span className="test-text">General results</span>
              </label>    
            </div>
            <br />           
          
          <div>
            <button type="button" onClick={handleClick} className="search-button">
              Search
            </button>          
          </div>
        </form>
    </div>
  );
}

export default TechByTest;
