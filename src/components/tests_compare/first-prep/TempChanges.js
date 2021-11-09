import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Spinner from '../../layout/Spinner';


function TempChanges({idToShow, unitSN}) {
    const [tempRes, setTempRes] = useState();
    const [loading, setLoading] = useState(false);
    const [isDataFlag, setIsDataFlag] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const { data } = await axios.get(`/temp-changes/findbyid/${idToShow}`);
            if (data) {
                setTempRes(data);
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
            <div>                
                {
                    isDataFlag && (
                        <>
                        <h5 className="lead">Temperature Changes unit serial number {unitSN}</h5>
                        <div className="row">
                        <div className="col-1-of-2">
                            <p className="lead">after current consumption test</p>
                            <table className="results-table results-table__fulllinkgeneral">
                                <thead>
                                    <tr>
                                        <th>RF Temperature</th>
                                        <th>Battery Temperature</th>
                                        <th>Digital Temperature</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{tempRes['after current consumption test']['Rf temp']}</td>
                                        <td>{tempRes['after current consumption test']['bat temp']}</td>
                                        <td>{tempRes['after current consumption test']['dig temp']}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="col-1-of-2">
                            <p className="lead">after temperature test</p>
                            <table className="results-table results-table__fulllinkgeneral">
                                <thead>
                                    <tr>
                                        <th>RF Temperature</th>
                                        <th>Battery Temperature</th>
                                        <th>Digital Temperature</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{tempRes['after temperature test']['Rf temp']}</td>
                                        <td>{tempRes['after temperature test']['bat temp']}</td>
                                        <td>{tempRes['after temperature test']['dig temp']}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        </div>
                        </>
                    )                    
                }                
            </div>
        );
    }
}

export default TempChanges;
