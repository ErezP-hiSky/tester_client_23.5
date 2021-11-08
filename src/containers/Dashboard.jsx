import axios from 'axios';
import React, { useEffect, useState } from 'react';
import FilterDashboard from '../components/FilterDashboard';
import Spinner from '../components/layout/Spinner';

function Dashboard() {
    const [isDate, setIsDate] = useState(false);
    const [sendRefresh, setSendRefresh] = useState(false)
    const [testerNames, setTesterNames] = useState([]);
    const [loading, setLoading] = useState(true);

    const [manageSearch, setManageSearch] = useState({
        testerName: "all",        
        dateFrom: "all",
        dateTo: "all",
        uniType: "all",
        freqBand: "all"
      });

    function handleChange(e) {
        setManageSearch({ ...manageSearch, [e.target.name]: e.target.value });
    }

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const { data } = await axios.get('/api/testerNames');
            setTesterNames(data);
            setLoading(false);
        }
        fetchData();
    }, [])

    const submitHandler = (e) => {
        e.preventDefault();
        if (isDate) {
            if (manageSearch['dateFrom'] > manageSearch['dateTo']) {
                alert("--Date To-- is not after --Date From--");
            } else {
                setSendRefresh(!sendRefresh);
            }
        } else {
            setSendRefresh(!sendRefresh);
        }
    }

    if (loading) {
        return <Spinner />
    } else {
        return (
            <div>
                <h3>Status Report - Dashboard</h3>
                <form className="form-inline card" onSubmit={submitHandler}>
                    <div className="p">
                        <label>Tester name:</label>
                        <select name="testerName" onChange={handleChange} 
                                className="drop-down">
                            <option>all</option>
                            {testerNames.map((item, i) => 
                                <option key={i}>{item['tester_name']}</option>)}
                        </select>
                    </div>
                    <div className="p">
                        <input type="checkbox" name="isDateFilter"
                            id="isDateFilter" 
                            onChange={(e) => setIsDate(e.target.checked)}
                        />
                        <label htmlFor="isDateFilter">Open Date Filter</label>
                    </div>
                    {isDate &&
                    <>
                    <div className="p">
                        <label><strong>Date from:</strong></label>
                        <input type="date" name="dateFrom" autoFocus
                            onChange={handleChange}></input>
                    </div>
                    <div className="p">
                        <label><strong>Date to:</strong></label>
                        <input type="date" name="dateTo" 
                            onChange={handleChange}></input>
                    </div>
                    </>
                    }
                    <div className="p">
                        <label>Unit type:</label>
                        <select name="uniType" 
                                onChange={handleChange}
                                className="drop-down">
                            <option>all</option>
                            <option>dynamic</option>
                            <option>static</option>
                        </select>
                    </div>
                    <div className="p">
                        <label >Frequency band:</label>
                        <select name="freqBand" 
                                onChange={handleChange}
                                className="drop-down">
                            <option>all</option>
                            <option>Ka</option>
                            <option>Ku</option>
                        </select>
                    </div>
                    
                    <button type="submit" className="p">Search</button>
                </form>

                {/* <ShowAll /> */}
                <FilterDashboard
                    manageSearch={manageSearch}                    
                    sendRefresh={sendRefresh} />
            </div>
        );
    }
}

export default Dashboard;
