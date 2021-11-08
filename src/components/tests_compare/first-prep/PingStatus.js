import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Spinner from '../../layout/Spinner';


function PingStatus({idToShow, unitSN}) {
    const [pingRes, setPingRes] = useState();
    const [loading, setLoading] = useState(false);
    const [isDataFlag, setIsDataFlag] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const { data } = await axios.get(`/ping-status/findbyid/${idToShow}`);
            if (data) {
                setPingRes(data);
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
            <>
            {isDataFlag &&
            <div>
                <h5>Ping Status serial number {unitSN}</h5>
                <ul className="tests__p">                    
                    <li>Ping time[ms] in ETH: {pingRes['pingEthStatus_msec']}, {' == > '}
                        {pingRes['pingEthStatus_msec'] === -1 ? "Fail": "Pass"}
                    </li>
                    <li>Ping time[ms] in WiFi: {pingRes['pingStatus_msec']}, {' == > '}
                        {pingRes['pingStatus_msec'] === -1 ? "Fail": "Pass"}
                    </li>
                </ul>
            </div>
            }
            </>
        )
    }
}

export default PingStatus
