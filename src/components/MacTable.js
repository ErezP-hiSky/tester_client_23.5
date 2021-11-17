import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Pagination from './Pagination';
import Spinner from './layout/Spinner';

function MacTable() {
    const [macRes, setMacRes] = useState();
    const [loading, setLoading] = useState(true);
    const [isDataFlag, setIsDataFlag] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(50);    
    const [currentPosts, setCurrentPosts] = useState();
    const [indexOfFirstPost, setIndexOfFirstPost] = useState(0); 
    const [searchText, setSearchText] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);            
            const { data } = await axios.get(`/api/mac/taken`);
            if (data) {                             
                setMacRes(data);
                // Get current posts
                const indexOfLastPost = currentPage * postsPerPage;
                setIndexOfFirstPost(indexOfLastPost - postsPerPage);
                setCurrentPosts(data.slice(indexOfFirstPost, indexOfLastPost));
                setIsDataFlag(true);
            } else {
                setIsDataFlag(false);
            }            
            setLoading(false);
        }
        fetchData();        
    }, [currentPage, postsPerPage, indexOfFirstPost])
                
    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const searchBtn = () => {
        const foundMac = macRes.filter(emac => emac['SN'] === searchText);
        setCurrentPosts(foundMac);
        setSearchText('');
    }
    
    if (loading) {
        return <Spinner />
    } else {
        return (
            <div>
                <div className="grid-5-1">
                    <h3>All MAC addresses</h3>
                    <div className="search-bar">
                        <input 
                            className="search-bar__text" type="number" placeholder="Search by SN.."
                            value={searchText}
                            onChange={e => setSearchText(e.target.value)} />
                        <button onClick={searchBtn} 
                            className="search-bar__btn" 
                            type="submit"><i className="fa fa-search"></i></button>
                    </div>
                </div>
                {isDataFlag && <>
                <br/>                
                    <table className="results-table results-table__fulllinkgeneral">
                        <thead>
                            <tr>    
                                <th>No.</th>                        
                                <th>MAC Address</th>
                                <th>Serial Number</th>
                                <th>Description</th>
                                <th>Name</th>                                
                            </tr>                        
                        </thead>
                        <tbody>                                                       
                            {
                                currentPosts.map((item, i) => (
                                    <tr key={i}>
                                        <td>{i+1+indexOfFirstPost}</td>
                                        <td>{item['Mac_Address']}</td>
                                        <td>{item['SN'] && item['SN']}</td>
                                        <td>{item['Note1'] && item['Note1']}
                                            {' '}{item['Note2'] && item['Note2']}</td>
                                        <td>{item['Name'] && item['Name']}</td>
                                    </tr>                                        
                                ))
                            }
                        </tbody>
                    </table> 
                    <Pagination postsPerPage={postsPerPage}
                        totalPosts={macRes.length}
                        paginate={paginate} />
                </>}

            </div>
        )
    }
}

export default MacTable
