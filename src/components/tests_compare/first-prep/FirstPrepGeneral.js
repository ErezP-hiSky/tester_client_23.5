import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Spinner from '../../layout/Spinner';

function FirstPrepGeneral({idToShow, unitSN}) {
    const [fpGeneral, setFpGeneral] = useState({});
    const [loading, setLoading] = useState(false);
    const [isDataFlag, setIsDataFlag] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const res = await axios.get(`/first-prep-stat/findbyid/${idToShow}`);
            if (res.data.length === 0) {
                setIsDataFlag(false);
            } else {                
                setFpGeneral(res.data);
                setIsDataFlag(true);
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
                {isDataFlag &&
                <div>
                    <h5>First General check for unit serial number {unitSN}</h5> 
                    <p>test status:<span> {fpGeneral['status']}</span></p>
                    {fpGeneral['status']==='fail'
                    ? <table className="results-table results-table__fulllinkgeneral">
                        <thead>
                            <tr>
                                {Object.keys(fpGeneral).map((header, i) => 
                                    <td key={i}>{header}</td>
                                )}                            
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                            {
                                Object.keys(fpGeneral).map((header, i) =>
                                    header === 'details' 
                                    ? <td key={i}>{
                                        fpGeneral[header].map((failItem,index) =>
                                            <p key={index}>{failItem}</p>
                                        )
                                        }</td> 
                                    : <td key={i}>{fpGeneral[header]}</td>                                
                                )
                            }
                            </tr>
                        </tbody>
                    </table>
                    : null
                    }
                    
                </div>                
                }        
            </div>
        )
    }    
}

export default FirstPrepGeneral;
