import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Spinner from '../components/layout/Spinner.jsx';
import '../sass/main.scss';
import P1dbCompare from '../components/tests_compare/p1dBcompare.jsx';
import FullLinkCompare from '../components/tests_compare/fullLinkCompare';
import CrossPollResults from '../components/tests_compare/full-link/CrossPollResults.jsx';
import FirstprepCompareResult from '../components/tests_compare/first-prep/FirstprepCompareResult.js';
import GeneralResCompare from '../components/tests_compare/GeneralResCompare.jsx';
import ImuCompare from '../components/tests_compare/ImuCompare.jsx';
import CurrentConsumption from '../components/tests_compare/first-prep/CurrentConsumption.js';
import TcxoResCompare from '../components/tests_compare/TcxoResCompare.jsx';

function TestsbySn(props) {    
    // for the buttons
    const {
        TcxoCalRes,
        crossPollRes,
        curConsRes,
        firstPrepRes,
        fulLinkRes,
        generalRes,
        imuGpsRes,        
        p1dbRes
    } = props.testsToPresent.testsChosen;
    const snLimited = props.allSN;
    const snLength = props.allSN.length - 1;
    const date_from = props.searchState.dateFrom;
    const date_to = props.searchState.dateTo;
    
    const [testsBySNdate, setTestsBySNdate] = useState([]);
    const [loading, setLoading] = useState(false);
    // console.log(testsToPresent.testsChosen);
    useEffect(() => {
        const fetchData = async () => {
            // console.log(snLimited)
            setLoading(true);
            const res = await axios.get(`/general-test-data/findbyUnitSNrangeNdate/
                        ${snLimited[0]}/${snLimited[snLength]}/dateFrom/${date_from}/dateTo/${date_to}`);
            setTestsBySNdate(res.data);
            setLoading(false);
        };
        fetchData();
        // eslint-disable-next-line
    }, []);

    // for the tests
    const [state, setState] = useState({
        name: "React",
        show_firstPrep_Test: false,
        show_IMU_Test: false,
        show_Tcxo_Test: false,
        show_curCon_Test: false,
        show_p1dB_Test: false,        
        show_fullLink_Test: false,
        show_crossPoll_Test: false,
        show_General_Test: false
    });

    function hideComponent(name) {
        switch (name) {
            case "show_firstPrep_Test":
                setState({ show_firstPrep_Test: !state.show_firstPrep_Test });
                break;
            case "show_IMU_Test":
                setState({ show_IMU_Test: !state.show_IMU_Test });
                break;
            case "show_Tcxo_Test":
                setState({ show_Tcxo_Test: !state.show_Tcxo_Test });
                break;
            case "show_curCon_Test":
                setState({ show_curCon_Test: !state.show_curCon_Test });
                break;
            case "show_p1dB_Test":
                setState({ show_p1dB_Test: !state.show_p1dB_Test });
                break;
            case "show_fullLink_Test":
                setState({ show_fullLink_Test: !state.show_fullLink_Test });
                break;
            case "show_crossPoll_Test":
                setState({ show_crossPoll_Test: !state.show_crossPoll_Test });
                break;
            case "show_General_Test":
                setState({ show_General_Test: !state.show_General_Test });
                break;
            case "clear_page":
                setState({
                    show_firstPrep_Test: false,
                    show_IMU_Test: false,
                    show_Tcxo_Test: false,
                    show_curCon_Test: false,
                    show_p1dB_Test: false,        
                    show_fullLink_Test: false,
                    show_crossPoll_Test: false,
                    show_General_Test: false
                });
                break;
            default:
                console.log("error name");
                break;
        }
        // window.scrollTo(0, document.body.scrollHeight);
    }

    const {
        show_firstPrep_Test,
        show_IMU_Test,
        show_Tcxo_Test,
        show_curCon_Test,
        show_p1dB_Test,        
        show_fullLink_Test,
        show_crossPoll_Test,
        show_General_Test
    } = state;
    

    if (loading) {
        return <Spinner />
    } else {
        return (
            <div>
                <h3 className="units-heading">Tests result by serial number :</h3>
                <div>
                    {
                        firstPrepRes && 
                        <button className="compare_button" onClick={() => hideComponent("show_firstPrep_Test")} >
                            <span>firstPrep compare</span>
                        </button>
                    }
                    {
                        imuGpsRes && 
                        <button className="compare_button" onClick={() => hideComponent("show_IMU_Test")} >
                            <span>Imu compare </span>
                        </button>
                    }
                    {
                        TcxoCalRes && 
                        <button className="compare_button" onClick={() => hideComponent("show_Tcxo_Test")} >
                            <span>Tcxo Calibration compare</span>
                        </button>
                    }
                    {
                        p1dbRes && 
                        <button className="compare_button" onClick={() => hideComponent("show_p1dB_Test")} >
                            <span>p1db compare </span>
                        </button>
                    }
                    {
                        curConsRes && 
                        <button className="compare_button" onClick={() => hideComponent("show_curCon_Test")} >
                            <span>Current Consumption compare</span>
                        </button>
                    }
                    {
                        fulLinkRes &&
                        <button className="compare_button" onClick={() => hideComponent("show_fullLink_Test")} >
                            <span>full - link compare </span>
                        </button>
                    }
                    {
                        crossPollRes && 
                        <button className="compare_button" onClick={() => hideComponent("show_crossPoll_Test")} >
                            <span>Cross Poll compare</span>
                        </button>
                    }
                    {
                        generalRes && 
                        <button className="compare_button" onClick={() => hideComponent("show_General_Test")} >
                            <span>General Result compare</span>
                        </button>
                    }
                    <button className="compare_button" onClick={() => hideComponent("clear_page")} >
                        <span>Clear Page</span>
                    </button>
                </div>
                
                {
                    show_firstPrep_Test && <div>
                        <h2>first prep compare</h2>
                        {
                            testsBySNdate.map((item, index) => (
                                <div>
                                <FirstprepCompareResult
                                    key={index}
                                    idToShow={item['_id']}
                                    unitSN={item['unit_SN']}
                                />
                                </div>
                            ))
                        }
                    </div>
                }
                {
                    show_IMU_Test && <div>  
                        <h2>IMU compare</h2>                      
                        {testsBySNdate.map((item, index) =>
                            <ImuCompare
                                key={index}
                                idToShow = {item['_id']}
                                unitSN = {item['unit_SN']} />
                        )}
                    </div>
                }
                {
                    show_Tcxo_Test && <div>
                        <h2>Tcxo compare</h2>
                        {
                            testsBySNdate.map((item, index) => (
                                <div>
                                <TcxoResCompare
                                    key={index}
                                    idToShow={item['_id']}
                                    unitSN={item['unit_SN']}
                                />
                                </div>
                            ))
                        }
                    </div>
                }
                {
                    show_p1dB_Test && <div>
                        <h2>P1db Compare: </h2>
                        {/* <p>{testsBySNdate.length} results</p> */}
                        {typeof(testsBySNdate) === 'undefined' 
                        ? <h1>Waiting ...</h1> :
                            testsBySNdate.map((item, index) => (
                                <P1dbCompare
                                key={index}
                                idToShow = {item['_id']}
                                unitSN = {item['unit_SN']}
                                />
                            ))              
                        }
                    </div>
                }
                {
                    show_curCon_Test && <div>
                        <h2>Current Consumption compare</h2>
                        {testsBySNdate.map((item, index) =>                       
                            <CurrentConsumption 
                                key={index}
                                idToShow = {item['_id']}
                                unitSN = {item['unit_SN']}
                            />
                        )}
                    </div>
                }
                {
                    show_fullLink_Test && <div>
                        <h2>Full Link compare:</h2>
                        {testsBySNdate.map((item, index) =>
                            <FullLinkCompare
                                key={index}
                                idToShow = {item['_id']}
                                unitSN = {item['unit_SN']} />
                        )}
                    </div>
                }
                {
                    show_crossPoll_Test && <div>
                        <h2>CrossPoll compare:</h2>
                        {testsBySNdate.map((item, index) =>
                            <CrossPollResults
                                key={index}
                                idToShow = {item['_id']}
                                unitSN = {item['unit_SN']} />
                        )}
                    </div>
                }
                {
                    show_General_Test && <div> 
                        <h2>General Results compare</h2>
                        {testsBySNdate.map((item, index) =>                       
                            <GeneralResCompare 
                                key={index}
                                idToShow = {item['_id']}
                                unitSN = {item['unit_SN']}
                            />
                        )}
                    </div>
                }
                
            </div>
            );
    }
}

export default TestsbySn;
