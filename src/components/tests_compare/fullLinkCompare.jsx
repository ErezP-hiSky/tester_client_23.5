import React from 'react';
import DownLinkResults from './full-link/DownLinkResults.jsx';
import GeneralResults from './full-link/GeneralResults.jsx';
import UpLinkResults from './full-link/UpLinkResults.jsx';

function FullLinkCompare({idToShow, unitSN})  {
    return (
        <div>
            <h5>Full Link results for unit number {unitSN}</h5>
            <GeneralResults idToShow={idToShow} />
            <DownLinkResults idToShow={idToShow} />
            <UpLinkResults idToShow={idToShow} />
            
            <hr/>
            <br/>
        </div>
    )
}

export default FullLinkCompare;
