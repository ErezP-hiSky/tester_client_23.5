import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Spinner from '../../layout/Spinner';
import '../../../sass/main.scss';

function CrossPollResults({idToShow, unitSN}) {
    const [crossPoll, setCrossPoll] = useState();
    const [loading, setLoading] = useState(false);
    const [isDataFlag, setIsDataFlag] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const res = await axios.get(`/fl-cross-poll/findbyid/${idToShow}`); 
            if (res.data.length === 0) {
                setIsDataFlag(false);
            } else {
                // console.log(res.data)
                setCrossPoll(res.data);
                setIsDataFlag(true);
            }
            setLoading(false);
        }
        fetchData();
    }, [idToShow])

    if (loading) {
        return <Spinner />
    } else {  
        return (
            <div>
                {isDataFlag &&
                <div>
                    <h5>Cross Poll for unit serial number {unitSN}</h5>
                    <table className="results-table results-table__fulllinkgeneral">
                        <thead>
                            <tr>
                                <th>Frequency[MHz]</th>
                                <th>Frequency in Spectrum [Mhz]</th>
                                <th>Result left Polarization [dBm]</th>
                                <th>Result right Polarization [dBm]</th>
                                <th>Delta Power[dBm]</th>
                                <th>Final Result</th>
                                <th>Start Date</th>
                                <th>End Date</th>                                                           
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{crossPoll['freq_MHz']}</td>
                                <td>{(crossPoll['freq_right_pol_Hz']/1e6).toFixed(4)}</td>
                                <td>{crossPoll['results_left_pol_dbm'].toFixed(2)}</td>
                                <td>{crossPoll['results_right_pol_dbm'].toFixed(2)}</td>
                                <td>{crossPoll['delta_pwr'].toFixed(4)}</td>
                                <td>{crossPoll['result']}</td>
                                <td>
                                    <ul>
                                        <li>Date: {crossPoll['Start_date'].split('T')[0]}</li>
                                        <li>Time: {crossPoll['Start_date'].split('T')[1].slice(0, -5)}</li>
                                    </ul>                                    
                                </td>
                                <td>
                                    <ul>
                                        <li>Date: {crossPoll['End_date'].split('T')[0]}</li>
                                        <li>Time: {crossPoll['End_date'].split('T')[1].slice(0, -5)}</li>
                                    </ul>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>                 
            }
            </div>
        );
    }
}

export default CrossPollResults
