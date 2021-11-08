import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Spinner from '../../layout/Spinner';


function CurrentConsumption({idToShow, unitSN}) {
    const [currentRes, setCurrentRes] = useState();
    const [loading, setLoading] = useState(false);
    const [isDataFlag, setIsDataFlag] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const { data } = await axios.get(`/current-cons/findbyid/${idToShow}`);
            if (data) {                
                if (data['current_consumption_test']['bat_status']['valtage'].length < 1) {
                    setIsDataFlag(false);
                } else {
                    setIsDataFlag(true); 
                    setCurrentRes(data);
                }                          
            } else {
                setIsDataFlag(false);
            }
            setLoading(false);
        }
        fetchData();
    }, [idToShow]);

    if (loading) {
        return <Spinner />
    } else {
        return (
            <div>
            {isDataFlag && (                
                <>
                <br/>
                <h6>Current Consumption for unit serial number {unitSN}</h6>
                <table className="results-table results-table__fulllinkgeneral">
                    <thead>
                        <tr>                            
                            <th>Start time</th>
                            <th>End time</th>
                            <th>Test Result</th>
                        </tr>                        
                    </thead>
                    <tbody>
                        <tr>                            
                            <td>{currentRes['start_time']}</td>
                            <td>{currentRes['end_time']}</td>
                            <td>{currentRes['current_consumption_test']['Temp Test result']}</td>
                        </tr>
                    </tbody>
                </table> 
                <h6>Battery Status</h6>
                <table className="results-table results-table__fulllinkgeneral">
                    <thead>
                        <tr>
                            <th>Voltage</th>
                            <th>Current</th>
                            <th>Run time to Empty</th>
                            <th>Average time to full</th>
                            <th>Battery Precent</th>
                            <th>Battery temperature</th>
                            <th>Digital Temperature</th>
                            <th>Rf temperature</th>
                        </tr>                        
                    </thead>
                    <tbody>                                                             
                        {currentRes['current_consumption_test']['bat_status']['valtage'].map((item, i) => 
                            <tr key={i}>
                                <td>{item}</td>
                                <td>{currentRes['current_consumption_test']['bat_status']['current'][i]}</td>
                                <td>{currentRes['current_consumption_test']['bat_status']['runtime2empty'][i]}</td>
                                <td>{currentRes['current_consumption_test']['bat_status']['avgtime2full'][i]}</td>
                                <td>{currentRes['current_consumption_test']['bat_status']['batprecent'][i]}</td>
                                <td>{currentRes['current_consumption_test']['bat_status']['battemp'][i]}</td>
                                <td>{currentRes['current_consumption_test']['bat_status']['digitaltemp'][i]}</td>
                                <td>{currentRes['current_consumption_test']['bat_status']['rftemp'][i]}</td>
                            </tr>                            
                        )}
                    </tbody>
                </table>
                <hr/>
                </>  
                )}
            </div>
        )
    }
}

export default CurrentConsumption
