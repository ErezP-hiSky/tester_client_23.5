import axios from 'axios';
import React, { useEffect, useState } from 'react'
import HistogramChart from './HistogramChart';
import Spinner from './layout/Spinner';

function NumberOfTerminalsLastWeek() {
    const [numberOfTerminalsPerDay, setNumberOfTerminalsPerDay] = useState([]);
    const [dates, setDates] = useState([]);
    const [loading, setLoading] = useState(true);

    function daysInMonth (month, year) {
        return new Date(year, month, 0).getDate();
    }

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const d = new Date();
            let month = d.getMonth() + 1;
            let year = d.getFullYear();  
            let numTer = []; 
            let dateTer =[];  
            let startDay = '';
            let stopDay = '';
            for (let i = 0; i < 30; i++) { 
                let dayOfDate = d.getDate() - i
                if (dayOfDate === 0) {
                    month = month - 1;
                }
                if (dayOfDate <= 0) {                    
                    let daysInPreviousMonth = daysInMonth(month, year);
                    if (parseInt(daysInPreviousMonth + dayOfDate) === 9) {
                        startDay = `2021-${month}-09T00:00:00`;
                    } else {
                        startDay = `2021-${month}-${daysInPreviousMonth + dayOfDate}T00:00:00`;
                    }                    
                    stopDay = `2021-${month}-${daysInPreviousMonth + dayOfDate + 1}T00:00:00`;
                } else {
                    if (parseInt(dayOfDate) === 9) {
                        startDay = `2021-${month}-09T00:00:00`;
                    } else {
                        startDay = `2021-${month}-${dayOfDate}T00:00:00`;
                    }                       
                    stopDay = `2021-${month}-${dayOfDate + 1}T00:00:00`;
                }
                dateTer.push(startDay.split('T')[0]);
                var { data } = await axios.get(`/general-test-data/findbyDate` +
                    `/${startDay}/${stopDay}`);
                numTer.push(data.length)
            }
            setNumberOfTerminalsPerDay(numTer);    
            setDates(dateTer);
            setLoading(false);            
        };
        fetchData();
        // eslint-disable-next-line
    }, []);

    if (loading) {
        return <Spinner/>
    } else {

        return (
            <div>
                <HistogramChart
                    categories={dates}
                    dataCounted={numberOfTerminalsPerDay}
                    histTitle={'Number of terminals tested Last Month'}
                />
            </div>
        )
    }
}

export default NumberOfTerminalsLastWeek
