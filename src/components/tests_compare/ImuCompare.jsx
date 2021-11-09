import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Spinner from '../layout/Spinner';
import '../../sass/main.scss';

function ImuCompare(props) {
    const { idToShow, unitSN } = props;
    const [imu, setImu] = useState();
    const [loading, setLoading] = useState(false);
    const [isDataFlag, setIsDataFlag] = useState(false);
    const [isDetailsFlag, setIsDetailsFlag] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const { data } = await axios.get(`/imugps/findbyid/${idToShow}`);
            
            if (data.length === 0) {
                setIsDataFlag(false);
            } else {
                setImu(data);
                if (data['details'].length === 0) {
                    setIsDetailsFlag(false);
                } else {
                    setIsDetailsFlag(true);
                }
                setIsDataFlag(true);
            }
            setLoading(false);
        }
        fetchData();
    }, [idToShow])
    
    if (loading) {
        return <Spinner/>
    } else {
        return (
            <div>
                {isDataFlag && 
                <div>
                    <h6>Results for unit number {unitSN}</h6>
                    <table className="results-table results-table__fulllinkgeneral">
                        <thead>
                            <tr>
                                {/* <th>TEST ID</th> */}
                                <th>IMU YAW FINAL RESULT</th>
                                {/* <th>IMU PITCH FINAL RESULT</th> */}
                                <th>MEASURED EDGES</th>
                                <th>START TIME</th>
                                <th>END TIME</th>
                                {isDetailsFlag && <th>FAIL DETAILS</th>}
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                {/* <td>{imu['_id']}</td> */}
                                <td>{imu['imu_yaw_status']}</td>
                                {/* <td>{imu['imu_pitch_status']}</td> */}
                                <td>
                                    <ul>
                                        {imu['ends_of_ang'].map((edge, i) => (
                                            <li key={i}>{edge.toFixed(2)}</li>    
                                        ))
                                        }
                                    </ul>
                                </td>
                                <td>
                                    <ul>
                                        <li>Date: {imu['start_time'].split('T')[0]}</li>
                                        <li>Time: {imu['start_time'].split('T')[1].slice(0, -5)}</li>
                                    </ul>                                  
                                </td>
                                <td>
                                    <ul>
                                        <li>Date: {imu['end_time'].split('T')[0]}</li>
                                        <li>Time: {imu['end_time'].split('T')[1].slice(0, -5)}</li>
                                    </ul>  
                                </td>
                                {isDetailsFlag && <td>
                                    {imu['details'].map((failReason, i) => (
                                            <li key={i}>{failReason}</li>    
                                        ))
                                    }
                                </td>}
                            </tr>
                        </tbody>
                    </table>
                </div>
                }                
            </div>
        )
    }    
}

export default ImuCompare;
