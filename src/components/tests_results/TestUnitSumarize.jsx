import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../layout/Spinner';
import '../../sass/main.scss';


function TestUnitSumarize({resultId}) {
    const [tests_failed, setTests_failed] = useState([]);
    const [loading, setLoading] = useState(true);
     
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const { data } = await axios.get(`/general-test-data/findbyid/${resultId}`);
            console.log(data)
            if (data['tests_failed']) {
                setTests_failed(data['tests_failed']);
            } else {
                setTests_failed([]);
            }            
            setLoading(false);
        };
        fetchData();
        // eslint-disable-next-line
    }, []);

    if (loading) {
        return <Spinner/>
    } else {
        return (
            <div  className="ambient-temp-div" >
                <h5>Final Sumarize:</h5>
                <div className="general-test-details-div">
                <table className="general-table">
                    <thead>
                        <tr>
                            <th>Test Name</th>
                            <th>Result:</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>First Prep</td>
                            <td className={tests_failed.includes("firstprep") ? "color-fail" : "color-pass"}>
                            {tests_failed.includes("firstprep") ? "Fail" : "Pass"}
                            </td>
                        </tr>
                        <tr>
                            <td>IMU</td>
                            <td className={tests_failed.includes("imuGps") ? "color-fail" : "color-pass"}>
                            {tests_failed.includes("imuGps") ? "Fail" : "Pass"}
                            </td>
                        </tr>
                        <tr>
                            <td>TCXO Calibration</td>
                            <td className={tests_failed.includes("TcxoCal") ? "color-fail" : "color-pass"}>
                            {tests_failed.includes("TcxoCal") ? "Fail" : "Pass"}
                            </td>
                        </tr>
                        <tr>
                            <td>P1dB</td>
                            <td className={tests_failed.includes("p1dB") ? "color-fail" : "color-pass"}>
                            {tests_failed.includes("p1dB") ? "Fail" : "Pass"}
                            </td>
                        </tr>
                        <tr>
                            <td>GPS</td>
                            <td className={tests_failed.includes("gpsfix") ? "color-fail" : "color-pass"}>
                            {tests_failed.includes("gpsfix") ? "Fail" : "Pass"}
                            </td>
                        </tr>
                        <tr>
                            <td>Full Link</td>
                            <td className={tests_failed.includes("full_link") ? "color-fail" : "color-pass"}>
                            {tests_failed.includes("full_link") ? "Fail" : "Pass"}
                            </td>
                        </tr>
                    </tbody>
                </table>
                    
                </div>
                
            </div>
        )
    }
};

export default TestUnitSumarize;

