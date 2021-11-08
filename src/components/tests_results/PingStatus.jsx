import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../sass/main.scss';


function PingStatRes({resultId}) {
    const [pingDataDetails, setPingDataDetails] = useState([]);
    

    useEffect(() => {
        const fetchData = async () => {
            
            const pingData = await axios.get(`/ping-status/findbyid/${resultId}`);
            // console.log(pingData.data);
            setPingDataDetails(pingData.data);
        }
        fetchData();
    }, [resultId]);


    return (
        <div  >
            <h4> Ping Status Details </h4>
            <table className="cur-cons-table">
                <tbody>
                    {Object.keys(pingDataDetails).map((item, i) => 
                        item === "_id" ?
                        <tr key={i*1}>
                            <td >Test ID</td>                            
                            <td >{pingDataDetails[item]}</td>                            
                        </tr>
                        :
                        item === "pingStatus_msec" ?
                        <tr key={i*1}>
                            <td >ping to WiFi Status [mSec]</td>                            
                            <td >{pingDataDetails[item] === -1 ? 'No ping' :
                                pingDataDetails[item].toFixed(2)}</td>                            
                        </tr>
                        :
                        item === "pingEthStatus_msec" ?
                        <tr key={i*1}>
                            <td >ping to LAN Status [mSec]</td>                            
                            <td >
                                {pingDataDetails[item] === -1 ? 'No ping' :
                                    pingDataDetails[item].toFixed(2)}
                            </td>
                        </tr>
                        :
                        <tr key={i*1}>
                            <td >{item}</td>                            
                            <td >{pingDataDetails[item]}</td>                            
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default PingStatRes;
