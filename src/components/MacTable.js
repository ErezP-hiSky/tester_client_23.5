import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Spinner from './layout/Spinner';

function MacTable() {
    const [macRes, setMacRes] = useState();
    const [loading, setLoading] = useState(false);
    const [isDataFlag, setIsDataFlag] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);            
            const { data } = await axios.get(`/api/mac/taken`);
            if (data) {                             
                setMacRes(data);                
                setIsDataFlag(true);               
            } else {
                setIsDataFlag(false);
            }            
            setLoading(false);
        }
        fetchData();
    }, [])

    if (loading) {
        return <Spinner />
    } else {
        return (
            <div>
                <h3>All MAC addresses</h3>

                {isDataFlag && <>
                <br/>                
                    <table className="results-table results-table__fulllinkgeneral">
                        <thead>
                            <tr>    
                                <th>No.</th>                        
                                <th>MAC Address</th>
                                <th>Serial Number</th>
                                <th>Description</th>
                                <th>Name</th>                                
                            </tr>                        
                        </thead>
                        <tbody>                                                       
                            {
                                macRes.map((item, i) => (
                                    <tr key={i}>
                                        <td>{i+1}</td>
                                        <td>{item['Mac_Address']}</td>
                                        <td>{item['SN'] && item['SN']}</td>
                                        <td>{item['Note1'] && item['Note1']}
                                            {' '}{item['Note2'] && item['Note2']}</td>
                                        <td>{item['Name'] && item['Name']}</td>
                                    </tr>                                        
                                ))
                            }
                        </tbody>
                    </table> 
                    
                </>}

            </div>
        )
    }
}

export default MacTable
