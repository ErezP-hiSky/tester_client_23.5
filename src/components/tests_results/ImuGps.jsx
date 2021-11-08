import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../sass/main.scss';
import Spinner from '../layout/Spinner';


function ImuGpsRes({resultId}) {
    const [imuDetails, setImuDetails] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isDataFlag, setIsDataFlag] = useState(false);
    
    const [endsOfAngDetails, setEndOfAng] = useState({
        imu_x_start: 0,
        imu_x_stop: 0,
        imu_y_start: 0,
        imu_y_stop: 0
    });
    
    useEffect(() => {       
        const fetchData = async () => {
            setLoading(true);  
            const { data } = await axios.get(`/imugps/findbyid/${resultId}`);  
            if (data) {                
                setImuDetails(data);                
                setEndOfAng({
                    imu_x_start: data['ends_of_ang'][0],
                    imu_x_stop: data['ends_of_ang'][1],
                    imu_y_start: data['ends_of_ang'][2],
                    imu_y_stop: data['ends_of_ang'][3]
                });
                setIsDataFlag(true); 
            } else {
                setIsDataFlag(false);
            }       
            setLoading(false);
        }
        fetchData();        
        // eslint-disable-next-line
    }, []);

    if (loading) {
        return <Spinner />
    } else {
        return (
            <div  >
                <h4> IMU Details </h4>
                {isDataFlag &&
                <table className="cur-cons-table">
                    <thead>
                        <tr>
                            <th>Test ID</th>
                            <th>Start time</th>
                            <th>IMU X axis start ang</th>
                            <th>IMU X axis stop ang</th>
                            <th>IMU Y axis start ang</th>
                            <th>IMU Y axis stop ang</th>
                            <th>IMU YAW status</th>
                            <th>IMU PITCH status</th>
                            <th>End time</th>
                            <th>Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{imuDetails['_id']}</td>
                            <td>                                
                                <ul>
                                    <li>Date: {imuDetails['start_time'].split('T')[0]}</li>
                                    <li>Time: {imuDetails['start_time'].split('T')[1].slice(0, -5)}</li>
                                </ul>   
                            </td>                            
                            <td>
                                {endsOfAngDetails['imu_x_start'] && 
                                    endsOfAngDetails['imu_x_start'].toFixed(2)}
                            </td>
                            <td>{endsOfAngDetails['imu_x_stop'] && 
                                    endsOfAngDetails['imu_x_stop'].toFixed(2)}
                            </td>
                            <td>{endsOfAngDetails['imu_y_start'] && 
                                    endsOfAngDetails['imu_y_start'].toFixed(2)}
                            </td>
                            <td>{endsOfAngDetails['imu_y_stop'] && 
                                    endsOfAngDetails['imu_y_stop'].toFixed(2)}
                            </td>
                            <td>{imuDetails['imu_yaw_status']}</td>
                            <td>{imuDetails['imu_pitch_status']}</td>                            
                            <td>                                
                                <ul>
                                    <li>Date: {imuDetails['end_time'].split('T')[0]}</li>
                                    <li>Time: {imuDetails['end_time'].split('T')[1].slice(0, -5)}</li>
                                </ul>   
                            </td>    
                            <td>{imuDetails['details']}</td>
                        </tr>                        
                    </tbody>
                </table>
                }
            </div>
        );
    }
};

export default ImuGpsRes;
