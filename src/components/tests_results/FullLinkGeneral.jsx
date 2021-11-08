import axios from 'axios';
import React, { useEffect, useState } from 'react';
import '../../sass/main.scss';
import Spinner from '../layout/Spinner';


function FLGeneralRes({resultId}) {
    const [FLGeneral, setFLGeneral] = useState([]);
    const [loading, setLoading] = useState(false);
     
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const res = await axios.get(`/full-link-general/findbyid/${resultId}`);
            setFLGeneral(res.data);
            setLoading(false);
        };
        fetchData();
        // eslint-disable-next-line
    }, []);

    if (loading) {
        return <Spinner/>
    } else {            
        return (
            <div  >
                <h4> Full Link General Results </h4>
                <table className="cur-cons-table">
                    <tbody>
                        {Object.keys(FLGeneral).map((item, i) => 
                            item ===  '_id' ?
                            <tr key={i*1}>
                                <td >Test ID</td>                            
                                <td >{FLGeneral[item]}</td>                            
                            </tr>
                            :
                            item ===  'Start_date' ?
                            <tr key={i*1}>
                                <td >Start time</td>                            
                                <td >
                                    <ul>
                                        <li>Date: {FLGeneral['Start_date'].split('T')[0]}</li>
                                        <li>Time: {FLGeneral['Start_date'].split('T')[1].slice(0, -5)}</li>
                                    </ul>                                     
                                </td>                            
                            </tr>
                            :
                            item ===  'End_date' ?
                            <tr key={i*1}>
                                <td >End time</td>                            
                                <td >
                                    <ul>
                                        <li>Date: {FLGeneral['Start_date'].split('T')[0]}</li>
                                        <li>Time: {FLGeneral['Start_date'].split('T')[1].slice(0, -5)}</li>
                                    </ul>                                     
                                </td>                            
                            </tr>
                            :
                            item ===  'green_led' ?
                            <tr key={i*1}>
                                <td >Green Led Ok ?</td>                            
                                <td >{FLGeneral[item]}</td>                            
                            </tr>
                            :
                            item ===  'details' ?
                            FLGeneral['details'].length > 0 ?
                            <tr key={i*1}>
                                <td >Details</td>                            
                                <td >{FLGeneral['details']}</td>                            
                            </tr> : null
                            :
                            <tr key={i*1}>
                                <td >{item}</td>                            
                                <td >{FLGeneral[item]}</td>                            
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        );
    }
};

export default FLGeneralRes;
