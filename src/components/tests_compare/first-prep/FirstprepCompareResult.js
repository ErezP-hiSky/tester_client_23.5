import React from 'react';
import FirstPrepGeneral from './FirstPrepGeneral';
import PingStatus from './PingStatus';
import TempChanges from './TempChanges';

function FirstprepCompareResult({idToShow, unitSN}) {
    return (
        <div>
            <FirstPrepGeneral
                idToShow={idToShow}
                unitSN={unitSN}
            />
            <TempChanges            
                idToShow={idToShow}
                unitSN={unitSN}
            />
            <PingStatus            
                idToShow={idToShow}
                unitSN={unitSN}
            />
            <hr/>
        </div>
    );
}

export default FirstprepCompareResult;
