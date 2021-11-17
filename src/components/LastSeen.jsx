import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Spinner from './layout/Spinner';

function LastSeen() {
    const [testerName, setTesterName] = useState('');
    const [lastSeen, setLastSeen] = useState();
    const [loading, setLoading] = useState(true);
     
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            let { data } = await axios.get(`/general-test-data/last`);
            setLastSeen(data['Test_Date']);
            setTesterName(data['Tester_name'])
            const last_id = data._id;
            let res1 = await axios.get(`/full-link-general/findbyid/${last_id}`);            
            if (res1.data) {
                setLastSeen(res1.data['End_date']);
            } else if (!res1.data) {
                let res2 = await axios.get(`/gps/findbyid/${last_id}`);
                setLastSeen(res2.data['end_time']);
            }         
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
                <p className="lead">Tester {testerName} - last seen at: {' '}
                    <span>
                        {lastSeen.split('T')[0]} {' '}
                        {lastSeen.split('T')[1].slice(0, -5)}
                    </span>
                </p>
            </div>
        )
    }
}

export default LastSeen
