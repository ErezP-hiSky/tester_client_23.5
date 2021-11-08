import React, { useEffect, useState } from 'react';
import Spinner from '../layout/Spinner';
import '../../sass/main.scss';
import axios from 'axios';


function FLdLRes({resultId}) {
    const [fullLinkDLRes, setFullLinkDLRes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isDataFlag, setIsDataFlag] = useState(false);
     
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const { data } = await axios.get(`/full-link-dl/findby_testid/${resultId}`);
            if (data) {
                setFullLinkDLRes(data[0]);
                setIsDataFlag(true);
            } else {
                setIsDataFlag(false);
            }            
            setLoading(false);
        };
        fetchData();
        // eslint-disable-next-line
    }, [resultId]);
    
    if (loading) {
        return <Spinner/>
    } else {        
        return (
            <div>
                <h4> Full Link DownLink Results Details </h4>
                {isDataFlag &&
                <table className="cur-cons-table">
                    <tbody>
                        {Object.keys(fullLinkDLRes).map((item, i) => 
                            item === "_id" ? null :
                            item === "test_id" ?
                            <tr key={i}>
                                <td >Test ID</td>                            
                                <td >{fullLinkDLRes[item]}</td>                            
                            </tr> :
                            item === "Freq_Offset" ?
                            <tr key={i}>
                                <td >Frequency Offset</td>                            
                                <td >{parseFloat(fullLinkDLRes['Freq_Offset']).toFixed(2)}</td>                            
                            </tr> :
                            item === "sync" ?
                            <tr key={i}>
                                <td >is link Synced ?</td>                            
                                <td >{fullLinkDLRes['sync'] &&
                                    parseInt(fullLinkDLRes['sync']) === 1  ? 'YES' : 'NO'}
                                </td>                            
                            </tr> :
                            item === "HW_att" ?
                            <tr key={i}>
                                <td >Attenuator in Terminal Rx</td>                            
                                <td >{parseFloat(fullLinkDLRes['HW_att'])}</td>                            
                            </tr> :
                            item === "dig_Att" ?
                            <tr key={i}>
                                <td >Attenuator in Terminal Tx</td>                            
                                <td >{parseFloat(fullLinkDLRes['dig_Att'])}</td>                            
                            </tr> :
                            item === "Rf_anoki_tx" ?
                            <tr key={i}>
                                <td >Rf anoki tx temperature</td>                            
                                <td >{parseFloat(fullLinkDLRes['dig_Att'])}</td>                            
                            </tr> :
                            item === "Rf_anoki_rx" ?
                            <tr key={i}>
                                <td >Rf anoki rx temperature</td>                            
                                <td >{parseFloat(fullLinkDLRes['dig_Att'])}</td>                            
                            </tr> :
                            fullLinkDLRes[item].map((linkItem, j) => 
                            <tr key={j}>
                                <td >{item}</td>                        
                                <td >{fullLinkDLRes[item][j]}</td>                            
                            </tr>
                            )
                        )}
                    </tbody>
                </table>
                }
            </div>
        );        
    }
};

export default FLdLRes;
