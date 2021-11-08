import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../layout/Spinner';
import '../../sass/main.scss';


function GeneralTestDataRes({resultId}) {
    const [generalDetails, setGeneralDetails] = useState([]);
    const [loading, setLoading] = useState(true);
     
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const res = await axios.get(`/general-test-data/findbyid/${resultId}`);
            // console.log(res.data)
            setGeneralDetails(res.data);
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
                <h3>general test details:</h3>
                <div className="general-test-details-div">
                <table className="general-table">
                    <thead>
                        <tr>
                            <th>unit serial number:</th>
                            <th>test id:</th>
                            <th>Tester name: </th>
                            <th>Test date:</th>
                            <th>Unit type</th>
                            <th>Final test result:</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{generalDetails['unit_SN']}</td>
                            <td>{generalDetails._id}</td>
                            <td>{generalDetails['Tester_name']}</td>
                            <td>
                                <ul className="lead">                                    
                                    <li><strong>
                                        Date: {generalDetails['Test_Date'].split('T')[0]}
                                    </strong></li>
                                    <li>
                                        <strong>
                                            Time: {generalDetails['Test_Date'].split('T')[1].slice(0, -5)}
                                        </strong>
                                    </li>
                                </ul>
                            </td>
                            <td>{generalDetails['product_type']} {generalDetails['antenna_type']}</td>
                            <td>{generalDetails.final_test_result}</td>
                        </tr>
                    </tbody>
                </table>
                    
                </div>
                
            </div>
        )
    }
};

export default GeneralTestDataRes;
