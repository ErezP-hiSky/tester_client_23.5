import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../sass/main.scss';
import Spinner from '../layout/Spinner';


function TcxoCalRes({resultId}) {
    const [tcxoCalDetails, setTcxoCalDetails] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isDataFlag, setIsDataFlag] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const { data } = await axios.get(`/tcxo-cal/findbyid/${resultId}`);
            if (data) {
                setTcxoCalDetails(data);
                setIsDataFlag(true);
            } else {
                setIsDataFlag(false);
            }
            setLoading(false);
        }
        fetchData();
    }, [resultId]);

    if (loading) {
        return <Spinner />
    } else {
        return (
            <div  >
                <h4> Tcxo Calibration Details </h4>
                {isDataFlag &&
                <table className="cur-cons-table">
                    <thead>
                        <tr>
                            <th>Test ID</th>
                            <th>Start time</th>
                            <th>X</th>
                            <th>Y</th>
                            <th className="yellow_highlight">clock- DAC value</th>
                            <th>TPC value</th>
                            <th>rx frequency offset</th>
                            <th>tx offset invert</th>
                            <th>Tpc-MB register 71</th>
                            <th>Tpc-PIC register 4</th>
                            <th>Digital temperature</th>
                            <th>RF temperature</th>
                            <th>End time</th>
                            <th>Final result</th>
                            <th>Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        <td>{tcxoCalDetails['_id']}</td>
                        <td>                                
                            <ul>
                                <li>Date: {tcxoCalDetails['start_time'].split('T')[0]}</li>
                                <li>Time: {tcxoCalDetails['start_time'].split('T')[1].slice(0, -5)}</li>
                            </ul>   
                        </td>   
                        <td>{tcxoCalDetails['x']}</td>
                        <td>{tcxoCalDetails['y']}</td>
                        <td className="yellow_highlight">{tcxoCalDetails['clkDac val']}</td>
                        <td>{tcxoCalDetails['tpc']}</td>
                        <td>{tcxoCalDetails['rx_freq_offset']}</td>
                        <td>{tcxoCalDetails['tx_offset_invert']}</td>
                        <td>{tcxoCalDetails['Tpc-ref 71']}</td>
                        <td>{tcxoCalDetails['Tpc-PIC reg 4']}</td>
                        <td>{tcxoCalDetails['dig_temp']}</td>
                        <td>{tcxoCalDetails['rf_temp']}</td>
                        <td>                                
                            <ul>
                                <li>Date: {tcxoCalDetails['end_time'].split('T')[0]}</li>
                                <li>Time: {tcxoCalDetails['end_time'].split('T')[1].slice(0, -5)}</li>
                            </ul>   
                        </td>
                        <td>{tcxoCalDetails['status']}</td>
                        <td>{tcxoCalDetails['details']}</td>                        
                    </tbody>
                </table>
                }
            </div>
        );
    }
};

export default TcxoCalRes;
