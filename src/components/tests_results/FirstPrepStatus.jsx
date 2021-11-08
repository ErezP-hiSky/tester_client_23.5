import React, { useEffect, useState } from 'react';
import Spinner from '../layout/Spinner';
import '../../sass/main.scss';
import axios from 'axios';


function FirstPrepStatRes({resultId}) {
    const [firstPrepStatDetails, setFirstPrepStatDetails] = useState([]);
    const [loading, setLoading] = useState(false);
     
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const res = await axios.get(`/first-prep-stat/findbyid/${resultId}`);
            setFirstPrepStatDetails(res.data);
            setLoading(false);
        };
        fetchData();
        // eslint-disable-next-line
    }, []);

    if (loading) {
        return <Spinner />
    } else {
        return (
            <div  >
                <h4> Data First prep results Details </h4>
                <table className="cur-cons-table">
                    <tbody>
                        {Object.keys(firstPrepStatDetails).map((item, i) =>
                            item === "_id" ?
                            <tr key={i*1}>
                                <td >Test ID</td>                            
                                <td >{firstPrepStatDetails[item]}</td>                            
                            </tr>
                            :
                            item === "details" ? 
                            firstPrepStatDetails[item].length > 0 ?
                            <tr key={i*1}>
                                <td >{item}</td>                            
                                <td >{firstPrepStatDetails[item]}</td>                            
                            </tr> : null
                            :
                            <tr key={i*1}>
                                <td >{item}</td>                            
                                <td >{firstPrepStatDetails[item]}</td>                            
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        );
    }
};

export default FirstPrepStatRes;
