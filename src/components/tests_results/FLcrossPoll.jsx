import React, { useEffect, useState } from 'react';
import Spinner from '../layout/Spinner';
import '../../sass/main.scss';
import axios from 'axios';


function FLCrossPollRes({resultId}) {
    const [flCrossPollRes, setFlCrossPollRes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isDataFlag, setIsDataFlag] = useState(false);
     
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const { data } = await axios.get(`/fl-cross-poll/findbyid/${resultId}`);
            if (data) {
                setFlCrossPollRes(data);
                setIsDataFlag(true);
            } else {
                setIsDataFlag(false);
            }            
            setLoading(false);
        };
        fetchData();
        // eslint-disable-next-line
    }, []);
    
    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      }

    if (loading) {
        return <Spinner/>
    } else {
        return (
            <div  >
                <h4> FL cross poll Details </h4>
                {isDataFlag &&
                <table className="cur-cons-table">
                    <tbody>
                        {Object.keys(flCrossPollRes).map((item, i) => 
                            item ===  '_id' ?
                            <tr key={i*1}>
                                <td >Test ID</td>                            
                                <td >{flCrossPollRes[item]}</td>                            
                            </tr>
                            :
                            item ===  'Start_date' ?
                            <tr key={i*1}>
                                <td >Start time</td>                            
                                <td >
                                    <ul>
                                        <li>Date: {flCrossPollRes['Start_date'].split('T')[0]}</li>
                                        <li>Time: {flCrossPollRes['Start_date'].split('T')[1].slice(0, -5)}</li>
                                    </ul>                                     
                                </td>                            
                            </tr>
                            :
                            item ===  'freq_MHz' ?
                            <tr key={i*1}>
                                <td >frequency [MHz]</td>                            
                                <td >{flCrossPollRes[item]}</td>                            
                            </tr>
                            :
                            item ===  'freq_right_pol_Hz' ?
                            <tr key={i*1}>
                                <td >Frequency measured right pol [Hz]</td>                            
                                <td >{numberWithCommas(flCrossPollRes[item].toFixed(2))}</td>                            
                            </tr>
                            :
                            item ===  'results_left_pol_dbm' ?
                            <tr key={i*1}>
                                <td >result in left pol [dBm]</td>                            
                                <td >{flCrossPollRes[item].toFixed(4)}</td>                            
                            </tr>
                            :
                            item ===  'results_right_pol_dbm' ?
                            <tr key={i*1}>
                                <td >result in right pol [dBm]</td>                            
                                <td >{flCrossPollRes[item].toFixed(4)}</td>                            
                            </tr>
                            :
                            item ===  'delta_pwr' ?
                            <tr key={i*1}>
                                <td >Delta in dBm</td>                            
                                <td >{flCrossPollRes[item].toFixed(4)}</td>                            
                            </tr>
                            :
                            item ===  'End_date' ?
                            <tr key={i*1}>
                                <td >End time</td>                            
                                <td >
                                    <ul>
                                        <li>Date: {flCrossPollRes['Start_date'].split('T')[0]}</li>
                                        <li>Time: {flCrossPollRes['Start_date'].split('T')[1].slice(0, -5)}</li>
                                    </ul>                                     
                                </td>                            
                            </tr>
                            :
                            <tr key={i*1}>
                                <td >{item}</td>                            
                                <td >{flCrossPollRes[item]}</td>                            
                            </tr>
                        )}
                    </tbody>
                </table>
                }
            </div>
        );
    }
};

export default FLCrossPollRes;
