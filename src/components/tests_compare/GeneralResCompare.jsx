import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Spinner from '../layout/Spinner';
import '../../sass/main.scss';

const GeneralResCompare = (props) => {
    const { idToShow, unitSN } = props;
    const [generalDataUnit, setGeneralDataUnit] = useState();
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const { data } = await axios.get(`/general-test-data/findbyid/${idToShow}`);            
            setGeneralDataUnit(data);
            setLoading(false);
        }
        fetchData();
    }, [idToShow]);

    if (loading) {
        return <Spinner />
    } else {
        return (
            <div>
            <h6>Result of SN {unitSN}</h6>
                <table className="results-table results-table__fulllinkgeneral">
                    <thead>
                        <tr>
                            <th>TEST ID</th>
                            <th>UNIT SN</th>
                            <th>TESTER NAME</th>
                            <th>TEST DATE</th>
                            <th>ANTENNA TYPE</th>
                            <th>PRODUCT TYPE</th>
                            <th>FINAL TEST RESULT</th>
                            <th>TESTS FAILED</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{generalDataUnit['_id']}</td>
                            <td>{generalDataUnit['unit_SN']}</td>
                            <td>{generalDataUnit['Tester_name']}</td>
                            <td>{generalDataUnit['Test_Date']}</td>
                            <td>{generalDataUnit['antenna_type']}</td>
                            <td>{generalDataUnit['product_type']}</td>
                            <td>{generalDataUnit['final_test_result']}</td>
                            <td>
                                <ul>
                                    {generalDataUnit['tests_failed'].map((test_name, i) => (
                                        <li key={i}>{test_name}</li>
                                    ))}
                                </ul>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }    
}

export default GeneralResCompare;