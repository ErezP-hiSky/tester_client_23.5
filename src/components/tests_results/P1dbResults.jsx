import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../sass/main.scss';
import Spinner from '../layout/Spinner';


function P1dbRes({resultId}) {
    const [p1dbDetails, setP1dbDetails] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isDataFlag, setIsDataFlag] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);            
            const { data } = await axios.get(`/p1db-results/findbyid/${resultId}`);
            if (data) {                             
                setP1dbDetails(data);                
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
                <h1> p1db Details </h1>
                {isDataFlag &&
                <>
                <table className="cur-cons-table">
                    <tbody>                    
                        {Object.keys(p1dbDetails).map((item, i) => 
                            item === "_id" ?
                            <tr key={i * 1}>
                                <td >Test ID</td>                            
                                <td >{p1dbDetails[item]}</td>                            
                            </tr> :
                            item === "start_time" ?
                            <tr key={i * 1}>
                                <td >Start time</td>                            
                                <td >
                                    <ul>
                                        <li>Date: {p1dbDetails[item].split('T')[0]}</li>
                                        <li>Time: {p1dbDetails[item].split('T')[1].slice(0, -5)}</li>
                                    </ul>                                    
                                </td>                            
                            </tr> :
                            item === "end_time" ?
                            <tr key={i * 1}>
                                <td >End time</td>                            
                                <td >
                                    <ul>
                                        <li>Date: {p1dbDetails[item].split('T')[0]}</li>
                                        <li>Time: {p1dbDetails[item].split('T')[1].slice(0, -5)}</li>
                                    </ul>   
                                </td>                            
                            </tr> :
                            
                            item === "status" ?
                                <tr key={i * 1}>
                                    <td >{item}</td>                            
                                    <td >{p1dbDetails[item]}</td>                            
                                </tr> : null
                                    
                        )}
                    </tbody>
                </table>
                <table className="cur-cons-table">                    
                    <tbody>                    
                        {Object.keys(p1dbDetails).map((item, i) => 
                            
                            item === "freqs" ?
                                p1dbDetails[item].map((freqItem, i) =>
                                    <tr key={i}>
                                        <td>frequency {' '} { i+1}</td>
                                        <td >{freqItem}</td>
                                        <td>p1db {' '} { i+1}</td>
                                        <td >{p1dbDetails["p1db"][i]}</td>
                                        <td>p1db P-out {' '} { i+1}</td>
                                        <td >{p1dbDetails["p1db_pout"][i].toFixed(2)}</td>
                                        <td>p1db RF temperature {' '} { i+1}</td>
                                        <td >{p1dbDetails["p1db_Rftemp"][i]}</td>
                                    </tr>
                                    )
                                    : null
                                    
                        )}
                    </tbody>
                </table>
                </>
                }
            </div>
        );
    }
};

export default P1dbRes;

