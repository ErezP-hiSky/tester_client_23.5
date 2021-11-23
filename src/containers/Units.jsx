import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import '../sass/main.scss';
import TestsbySn from './TestsResultBySn';


function Units() {

    const [allsn, setAllsn] = useState([]);
    const [isTestsResultsPresented, setIsTestsResultsPresented] = useState(false);
    const [snFromValue, setSnFromValue] = useState(0);
    const [isMulti, setIsMulti] = useState(false);

    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;        

        const fetchData = () => {
            axios.get('/general-test-data/only_finished', { signal: signal })
                .then((response) => {
                    // console.log(response.data);
                    const newData = response.data;
                    const allsnArr = []
                    newData.forEach((item) => {
                        // prevent multiple appearance of sn:
                        if (!allsnArr.includes(item['unit_SN'])) {
                            allsnArr.push(item['unit_SN']);                            
                        }                        
                    });
                    allsnArr.sort();
                    setAllsn(allsnArr);
                }, (error) => {
                    console.log(error);
                });
        }
        fetchData();
        
        return function cleanup() {
            abortController.abort();
        }
        // eslint-disable-next-line
    }, [snFromValue]);

    const options = ["all units"];    
    options.push(...allsn);
    const [options_snTo, setOptions_snTo] = useState()
    
    const [searchstate, setSearchstate] = useState({
        "snFrom": 0,
        "snTo": 0,
        "dateFrom": 0,
        "dateTo": 0,
        "passfail": 'all',
        "multipleSN": []
    });
    const [snLimited, setSnLimited] = useState(0);
    
    const history = useHistory();
    const formData = history.location.state;
    // console.log(formData);

    function handleChange(e) {
        setSearchstate({...searchstate,
            [e.target.name]: e.target.value});
        if (e.target.name === 'snFrom') {
            // console.log(e.target.value)
            // console.log(typeof e.target.value)
            setSnFromValue(e.target.value);

            setOptions_snTo(options.filter(sn => sn !== "all units" && sn >= e.target.value));
        }
    }

    function handleClick(e) {
        e.preventDefault();
        
        if (searchstate["snFrom"] === 0) {
            alert("Please fill in the SN From details...")
        }
        else if (searchstate["snTo"] === 0) {
            alert("Please fill in the SN To details...")
        }
        else if (searchstate["dateFrom"] === 0) {
            alert("Please fill in the date From details...")
        }
        else if (searchstate["dateTo"] === 0) {
            alert("Please fill in the date To details...")
        }
        else if (searchstate['dateFrom'] > searchstate['dateTo']) {
            alert("--Date To-- is not after --Date From--");
        } else {
            var snFromindex = options.findIndex((item) => item === searchstate['snFrom']);
            var snToindex = options.findIndex((item) => item === searchstate['snTo']);
            setSnLimited( options.slice(snFromindex, snToindex + 1) );
    
            setIsTestsResultsPresented(true); 
        }
    }

    const handleClearClick = (e) => {
        setIsTestsResultsPresented(false)
        setSearchstate({
            "snFrom": 0,
            "snTo": 0,
            "dateFrom": 0,
            "dateTo": 0,
            "passfail": 'all'
        });
        setSnLimited(0);
    }

    return (
        <div>
            <div className="grid-5-1">
                <h4 className="lead"> Choose range of Serial Numbers and dates: </h4>
                <a className="btn small-font s-height"
                    href="/search-options">
                    <i className="fa fa-home"></i>{' '}Back to Technician Page
                </a>
            </div>
            <div className="form-inline card">
            {!isMulti &&
            <>
                <label htmlFor="datefrom">SN From: </label>                                        
                <select onChange={handleChange}
                    value={searchstate['snFrom']}
                    name="snFrom"
                    className="drop-down" required>
                    {options.length === 1 ?
                        <option value="empty">looking...</option> :
                        options.map((Item, i) => (
                        <option key={i} value={Item}>{Item}</option>
                    ))}
                </select>
                
                <label htmlFor="datefrom">SN To :</label>                
                <select onChange={handleChange}
                    value={searchstate['snTo']}
                    name="snTo"
                    className="drop-down" required>
                    {options.length === 1 ?
                        <option value="empty">looking...</option> : (
                        snFromValue === 0 ? 
                        (
                            options.map((Item, i) => (
                                <option key={i} value={Item}>{Item}</option> ) ) 
                        ) :
                        (
                            options_snTo.map((Item, i) => (
                                <option key={i} value={Item}>{Item}</option> ) ) 
                        )
                    )}
                </select>
            </>}
                <div className="p">                    
                    <input type="checkbox" id="isMulti"
                        value="is Multiple?" name="isMulti"
                        onChange={(e) => setIsMulti(e.target.checked)} />
                    <label htmlFor="isMulti">is Multiple SN? </label>  
                </div>
                {isMulti &&
                <>
                    <label htmlFor="multipleSN">Multiple SN: </label>                                        
                    <select onChange={handleChange}                    
                        name="multipleSN" multiple
                        className="drop-down high-box" required>
                        {options.length === 1 ?
                            <option value="empty">looking...</option> :
                            options.map((Item, i) => (
                            <option key={i} value={Item}>{Item}</option>
                        ))}
                    </select>
                </>
                }
                <label htmlFor="datefrom">Date From:</label>
                <input 
                    type="date"
                    name="dateFrom" 
                    autoComplete="off"
                    id="datefrom"                    
                    onChange={handleChange} required/>
                    
                <label className="date-input__label" 
                    htmlFor="dateto">Date To:</label>
                <input 
                    type="date"
                    name="dateTo" 
                    autoComplete="off"
                    id="dateto"
                    onChange={handleChange} required/>
                
                <label htmlFor="passfail">Pass / Fail: </label>                                        
                <select onChange={handleChange}
                    value={searchstate['passfail']}
                    name="passfail"
                    className="drop-down" >
                        <option value='all'>All</option>
                        <option value='onlyFail'>Only Fail</option>
                        <option value='onlyPass'>Only Pass</option>
                </select>         

                <div >   
                        
                    <button type="button" onClick={handleClick}
                        className="p">
                        Search
                    </button>          
                </div>
                <div >                    
                <button type="button" onClick={handleClearClick}
                    className="p">
                    Clear
                </button>          
            </div>
            </div>

            
        
            {isTestsResultsPresented &&
                <TestsbySn 
                    searchState= {searchstate}
                    allSN = {snLimited}
                    testsToPresent = {formData}
                />
            }
            
        </div>
    )
}

export default Units;
