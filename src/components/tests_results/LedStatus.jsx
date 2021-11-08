import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../sass/main.scss';
// import Spinner from '../layout/Spinner';


function LedRes({resultId}) {
    const [ledDetails, setLedDetails] = useState([]);
    

    useEffect(() => {
        const fetchData = async () => {
            
            const ledData = await axios.get(`/led-status/findbyid/${resultId}`);
            // console.log(ledData);
            setLedDetails(ledData.data);
        }
        fetchData();
    }, [resultId]);


    return (
        <div  >
            <h4> Led status </h4>
            <table className="cur-cons-table">
                <tbody>
                    {Object.keys(ledDetails).map((item, i) =>
                        item === "_id" ?
                        <tr key={i*1}>
                            <td >Test ID</td>                            
                            <td >{ledDetails[item]}</td>                            
                        </tr>
                        :
                        <tr key={i*1}>
                            <td >{item}</td>                            
                            <td >{ledDetails[item]}</td>                            
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default LedRes;
