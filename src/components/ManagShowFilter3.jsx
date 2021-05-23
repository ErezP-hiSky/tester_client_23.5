import React from 'react';
import PieChart from './PieChart.jsx';
import HistogramChart from './HistogramChart.jsx';

const ManShowFilter3 = () => {
    const testsNames = ["firstprep", "imuGps", "TcxoCal", "EirpTx",
    "p1dB", "TxCal", "EirpRx", "RxGainNF", "full_link", "gpsfix"];
    const testsFailedCount = [15, 2, 30, 16, 25, 8, 10, 16, 19, 21];

    return (
        <div>
            <h3>By Terminal Type</h3>
            <div className="FailsChart">
            <PieChart 
              failUnits={70}
              passUnits={180}
              />
            <HistogramChart 
              categories={testsNames}
              dataCounted={testsFailedCount}
            />
          </div>
      </div>
    );
}

export default ManShowFilter3;
;