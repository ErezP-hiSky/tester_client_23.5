import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Spinner from '../../layout/Spinner';

function DownLinkResults({ idToShow })  {
    const [loading, setLoading] = useState(true);
    const [fullLinkDL, setFullLinkDL] = useState([]);
    const [isDataFlag, setIsDataFlag] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const res = await axios.get(`/full-link-dl/findby_testid/${idToShow}`);
            if (res.data.length === 0) {
                // console.log("full link - there was no data");
                setIsDataFlag(false);
            } else {
                setFullLinkDL(res.data[0]);
                setLoading(false);
            }            
        }
        fetchData();
        // eslint-disable-next-line
    }, []);
    
    if (loading && isDataFlag) {
        return <Spinner />
    } else {
        return (
            <div>
            {isDataFlag ?  
                <div>
                    <h5>Down link results</h5>
                           
                    <table className="results-table results-table__fulllinkdl">
                        <thead>
                            <tr>
                                {Object.keys(fullLinkDL).map((header, i) => 
                                    header === "test_id" ? null :
                                    <td key={i}>{header}</td>
                                )}                            
                            </tr>
                        </thead>
                        <tbody>
                            {fullLinkDL.target_EbNo.map((trItem, trIndex) => 
                                <tr key={trIndex}>
                                    {Object.keys(fullLinkDL).map((header, i) => 
                                        Array.isArray(fullLinkDL[header]) ? 
                                        header === "Freq_Offset" ? 
                                        <td key={i}>{fullLinkDL[header][trIndex].toFixed(2)}</td> :
                                        <td key={i}>{fullLinkDL[header][trIndex]}</td> :
                                        null
                                    )}
                                </tr> )}
                        </tbody>
                    </table>
                </div> :
                <p className="test-table__p">id {idToShow} Down Link results is empty</p>
                }
            </div>
        );
    }
}

export default DownLinkResults;
