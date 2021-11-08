import React, { useState } from 'react';
import AskMac from '../components/AskMac';
import MacTable from '../components/MacTable';
import '../sass/main.scss';
import TechByTest from './TechByTest';
import TechPage from './Technician';

function SearchOptionsPage() {

    const [state, setState] = useState({
      showTechPage: true,
      showTechByTest: false,
      showAskMac: false,
      showMacTable: false
    });

    const { showTechPage, showTechByTest, showAskMac, showMacTable } = state;

    const hideComponent = (name) => {
      switch (name) {
        case "showTechPage":
            setState({ 
              showTechPage: true,
              showTechByTest: false,
              showAskMac: false,
              showMacTable: false
            });
            break;
        case "showTechByTest":
          setState({ 
            showTechPage: false,
            showTechByTest: true,
            showAskMac: false,
            showMacTable: false
          });
          break;     
        case "showAskMac":
          setState({ 
            showTechPage: false,
            showTechByTest: false,
            showAskMac: true,
            showMacTable: false
          });
          break;       
        case "showMacTable":
          setState({ 
            showTechPage: false,
            showTechByTest: false,
            showAskMac: false,
            showMacTable: true
          });
          break;  
        default:
          console.log("error name");
          break;
      }
    }
   
    return (
        <div>
          <div className="tech-search">
              <div className="tech-box tech-header">
                <h1> Technician Page </h1>
                
              </div>
              <div className="tech-box sidebar back-grey">
                <button type="button" onClick={() => hideComponent("showTechPage")} className="search-button">
                  Serial number
                </button>              
                <button type="button" onClick={() => hideComponent("showTechByTest")} className="search-button">
                  Test name
                </button>
                <button type="button" onClick={() => hideComponent("showAskMac")} className="search-button">
                  Ask for a MAC address
                </button>
                <button type="button" onClick={() => hideComponent("showMacTable")} className="search-button">
                  MAC table
                </button>
              </div>
              <div className="tech-content">                
                {showTechPage && <TechPage />}
                {showTechByTest && <TechByTest />}
                {showAskMac && <AskMac/>}
                {showMacTable && <MacTable/>}
              </div>
              {/* <div className="tech-footer">
                <h1>footer</h1>
              </div> */}
            </div>
        </div>
    )
}

export default SearchOptionsPage;
