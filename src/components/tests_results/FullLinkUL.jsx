import React, { useEffect, useState } from 'react';
import Spinner from '../layout/Spinner';
import '../../sass/main.scss';
import axios from 'axios';


function FLuLRes({resultId}) {
    const [fullLinkULRes, setFullLinkULRes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isDataFlag, setIsDataFlag] = useState(false);
     
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const { data } = await axios.get(`/full-link-ul/findby_testid/${resultId}`);
            
            if (data) {
                setFullLinkULRes(data[0]);
                setIsDataFlag(true);
            } else {
                setIsDataFlag(false);
            }       
            setLoading(false);
        };
        fetchData();
        // eslint-disable-next-line
    }, []);

    if (loading) {
        return <Spinner />
    } else {
        return (
            <div  >
                <h4> Full Link UpLink Results Details </h4>
                {isDataFlag &&
                <table className="cur-cons-table">
                    <tbody>
                        {Object.keys(fullLinkULRes).map((item, i) => 
                            item === "_id" ? null :
                            item === "test_id" ?
                            <tr key={i}>
                                <td >Test ID</td>                            
                                <td >{fullLinkULRes[item]}</td>                            
                            </tr> :
                            item === "Freq_Offset" ?
                            <tr key={i}>
                                <td >Frequency Offset</td>                            
                                <td >{parseFloat(fullLinkULRes['Freq_Offset']).toFixed(2)}</td>                            
                            </tr> :
                            item === "sync" ?
                            <tr key={i}>
                                <td >is link Synced ?</td>                            
                                <td >{fullLinkULRes['sync'] &&
                                    parseInt(fullLinkULRes['sync']) === 1  ? 'YES' : 'NO'}
                                </td>                            
                            </tr> :
                            item === "HW_att" ?
                            <tr key={i}>
                                <td >Attenuator in Terminal Rx</td>                            
                                <td >{parseFloat(fullLinkULRes['HW_att'])}</td>                            
                            </tr> :
                            item === "dig_Att" ?
                            <tr key={i}>
                                <td >Attenuator in Terminal Tx</td>                            
                                <td >{parseFloat(fullLinkULRes['dig_Att'])}</td>                            
                            </tr> :
                            item === "Rf_anoki_tx" ?
                            <tr key={i}>
                                <td >Rf anoki tx temperature</td>                            
                                <td >{parseFloat(fullLinkULRes['dig_Att'])}</td>                            
                            </tr> :
                            item === "Rf_anoki_rx" ?
                            <tr key={i}>
                                <td >Rf anoki rx temperature</td>                            
                                <td >{parseFloat(fullLinkULRes['dig_Att'])}</td>                            
                            </tr> :
                            fullLinkULRes[item].map((linkItem, j) => 
                            <tr key={j}>
                                <td >{item}</td>                        
                                <td >{fullLinkULRes[item][j]}</td>                            
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

export default FLuLRes;
