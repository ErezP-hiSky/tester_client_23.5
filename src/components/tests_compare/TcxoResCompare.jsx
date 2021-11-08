import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Spinner from '../layout/Spinner';

function TcxoResCompare({idToShow, unitSN}) {
    const [tcxoRes, setTcxoRes] = useState();
    const [loading, setLoading] = useState(false);
    const [isDataFlag, setIsDataFlag] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const { data } = await axios.get(`/tcxo-cal/findbyid/${idToShow}`);
            if (data) {                             
                setTcxoRes(data);
                setIsDataFlag(true);               
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
            {isDataFlag && <>
            <br/>
                <h5>TCXO results for unit serial number {unitSN}</h5>
                <table className="results-table results-table__fulllinkgeneral">
                    <thead>
                        <tr>                            
                            <th>X</th>
                            <th>Y</th>
                            <th>DAC value</th>
                            <th>TPC</th>
                            <th>Rx Frequency Offset</th>
                            <th>Tx offset invert</th>
                            <th>TPC - MB Reg71</th>
                            <th>TPC- PIC Reg4</th>
                            <th>Digital Temperature</th>
                            <th>RF Temperature</th>
                            <th>Start time</th>
                            <th>End time</th>                                        
                        </tr>                        
                    </thead>
                    <tbody>
                        <tr>                            
                            <td>{tcxoRes['x']}</td>
                            <td>{tcxoRes['y']}</td>
                            <td>{tcxoRes['clkDac val']}</td>
                            <td>{tcxoRes['tpc']}</td>
                            <td>{tcxoRes['rx_freq_offset'].toFixed(2)}</td>
                            <td>{tcxoRes['tx_offset_invert']}</td>
                            <td>{tcxoRes['Tpc-ref 71']}</td>
                            <td>{tcxoRes['Tpc-PIC reg 4']}</td>
                            <td>{tcxoRes['dig_temp']}</td>
                            <td>{tcxoRes['rf_temp']}</td>
                            <td>
                                <ul>
                                    <li>Date: {tcxoRes['start_time'].split('T')[0]}</li>
                                    <li>Time: {tcxoRes['start_time'].split('T')[1].slice(0, -5)}</li>
                                </ul>                                
                            </td>
                            <td>
                                <ul>
                                    <li>Date: {tcxoRes['end_time'].split('T')[0]}</li>
                                    <li>Time: {tcxoRes['end_time'].split('T')[1].slice(0, -5)}</li>
                                </ul>                                
                            </td>
                        </tr>
                    </tbody>
                </table> 
                <hr/>
            </>}
            </div>
        )
    }
}

export default TcxoResCompare;
