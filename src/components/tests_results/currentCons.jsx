import axios from 'axios';
import React, { useEffect, useState } from 'react';
import '../../sass/main.scss';
import Spinner from '../layout/Spinner';


function CurrentConsumption({resultId}) {
    const [currentConsRes, setCurrentConsRes] = useState([]);
    const [isDataFlag, setIsDataFlag] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
        
            const { data } = await axios.get(`/current-cons/findbyid/${resultId}`);
            // console.log(data)
            if (data.length === 0) {
                setIsDataFlag(false);
            } else {
                setCurrentConsRes(data);
                setIsDataFlag(true);
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
                {isDataFlag ? (
                <div>
                <span className="current-consumption-header">Current Consumption :</span>
                                
                <table>
                    <thead>
                        <tr>
                            <th>current parameters:</th>
                            {JSON.stringify(currentConsRes) === '{}' ? <th>"waiting for data ..."</th> :
                                Object.keys(currentConsRes['current_consumption_test']['bat_status'])
                                    .map((item) =>
                                <th key={item} className="current-consumption-table-keys">{item}</th>
                                    )}
                        </tr>
                    </thead>
                    <tbody>                    
                        {JSON.stringify(currentConsRes) === '{}' ? <tr><td>Waiting for data ...</td></tr> :
                        currentConsRes['current_consumption_test']['bat_status']['current'].map((object, i) => 
                                <tr key={i}>
                                    <td>{i + 1}</td>
                                    {JSON.stringify(currentConsRes) === '{}' ? <td>Waiting for data ...</td> :
                                        Object.keys(currentConsRes['current_consumption_test']['bat_status']).map((item, ii) =>  
                                            item === "batprecent" ?
                                            <td key={ii + i} className="current-consumption-table-keys">
                                                {currentConsRes['current_consumption_test']['bat_status'][item][i].toFixed(2)}
                                            </td> :
                                            item === "battemp" ?
                                            <td key={ii + i} className="current-consumption-table-keys">
                                                {currentConsRes['current_consumption_test']['bat_status'][item][i].toFixed(2)}
                                            </td> :
                                            <td key={ii + i} className="current-consumption-table-keys">
                                                {currentConsRes['current_consumption_test']['bat_status'][item][i]}
                                            </td>
                                    )}
                                </tr>
                        )}                      
                    </tbody>               
                </table>
                <span className="cur-con-result">Current Consumption result :</span>
                <span>{' '}{JSON.stringify(currentConsRes) === '{}' ? "waiting for data ..." :
                    currentConsRes['current_consumption_test']['Temp Test result']}</span>
                </div>) : (<h4>No Data in this test</h4>)
                }
            </div>
        );
    }
};

export default CurrentConsumption;
