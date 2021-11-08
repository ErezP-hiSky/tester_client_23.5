import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Spinner from '../layout/Spinner';

function GpsResult({resultId}) {
    const [gpsRes, setGpsRes] = useState();
    const [loading, setLoading] = useState(false);
    const [isDataFlag, setIsDataFlag] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);            
            const { data } = await axios.get(`/gps/findbyid/${resultId}`);
            if (data) {                             
                setGpsRes(data);                
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
            <div>
                <h3>GPS results</h3>
                {isDataFlag && <>
                <br/>                
                    <table className="results-table results-table__fulllinkgeneral">
                        <thead>
                            <tr>                            
                                <th>Start</th>
                                <th>Time starting looking for fix</th>
                                <th>Time fix is achieved</th>
                                <th>GPS status</th>
                                <th>Final Result</th>
                                <th>Time End</th>
                                {gpsRes['details'].length > 0 &&
                                    <th>Details</th>}
                            </tr>                        
                        </thead>
                        <tbody>
                            <tr>                            
                                <td>                                
                                    <ul>
                                        <li>Date: {gpsRes['start_time'].split('T')[0]}</li>
                                        <li>Time: {gpsRes['start_time'].split('T')[1].slice(0, -5)}</li>
                                    </ul>   
                                </td>
                                <td>
                                    <ul>
                                        <li>Date: {gpsRes['start_fix_test'].split('T')[0]}</li>
                                        <li>Time: {gpsRes['start_fix_test'].split('T')[1].slice(0, -5)}</li>
                                    </ul>   
                                </td>
                                <td>
                                    {gpsRes['time_fix'] === 0 ? "Didn't achieve fix" :
                                    <ul>
                                        <li>Date: {gpsRes['time_fix'].split('T')[0]}</li>
                                        <li>Time: {gpsRes['time_fix'].split('T')[1].slice(0, -5)}</li>
                                    </ul> 
                                    }
                                </td>
                                <td>
                                    {
                                        gpsRes['gps_status'] === 0 ? "0 - fix not available" :
                                        gpsRes['gps_status'] === 1 ? "1 - GPS fix" :
                                        gpsRes['gps_status'] === 2 ? "2 - Differential GPS fix" :
                                        "unknown"
                                    }
                                </td>
                                <td>{gpsRes['final_result']}</td>
                                <td>
                                    <ul>
                                        <li>Date: {gpsRes['end_time'].split('T')[0]}</li>
                                        <li>Time: {gpsRes['end_time'].split('T')[1].slice(0, -5)}</li>
                                    </ul>                                
                                </td>
                                {gpsRes['details'].length > 0 &&
                                <td>
                                <ul>
                                {gpsRes['details'].map((item, i) => <li key={i}>{item}</li>)
                                    }
                                </ul>
                                </td>}
                                
                            </tr>
                        </tbody>
                    </table> 
                    
                </>}
            </div>
        )
    }
}

export default GpsResult;
