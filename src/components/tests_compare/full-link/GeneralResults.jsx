import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Spinner from '../../layout/Spinner';

function GeneralResults({idToShow}) {
    const [flGeneral, setFlGeneral] = useState();
    const [loading, setLoading] = useState(false);
    const [isDataFlag, setIsDataFlag] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const res = await axios.get(`/full-link-general/findbyid/${idToShow}`); 
            if (res.data.length === 0) {
                setIsDataFlag(false);
            } else {                
                setFlGeneral(res.data);
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
            {isDataFlag 
                ? <div>
                    <h5>Genaral results</h5>
                    <table className="results-table results-table__fulllinkgeneral">
                        <thead>
                            <tr>
                                {Object.keys(flGeneral).map((header, i) => 
                                    header === "_id" ?
                                    <td key={i}>Test ID</td>
                                    : <td key={i}>{header}</td>
                                )}                            
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                            {
                                Object.keys(flGeneral).map((header, i) =>(
                                header === "details" 
                                ?
                                <td key={i}>{flGeneral[header].map((detail, ii) =>
                                    <p key={ii}>{ii+1}{'. '}{detail}</p>
                                )}</td> :
                                header === "Start_date" ?
                                <td key={i}>
                                    <ul>
                                        <li>Date: {flGeneral['Start_date'].split('T')[0]}</li>
                                        <li>Time: {flGeneral['Start_date'].split('T')[1].slice(0, -5)}</li>
                                    </ul>
                                </td> :
                                header === "End_date" ?
                                <td key={i}>
                                    <ul>
                                        <li>Date: {flGeneral['End_date'].split('T')[0]}</li>
                                        <li>Time: {flGeneral['End_date'].split('T')[1].slice(0, -5)}</li>
                                    </ul>
                                </td> :
                                <td key={i}>{flGeneral[header]}</td> 
                                ))
                            }
                            </tr>
                        </tbody>
                    </table>
                </div> 
                : <p className="test-table__p">id {idToShow} General results is empty</p>
            }
                
            </div>
        );
    }
}

export default GeneralResults;
