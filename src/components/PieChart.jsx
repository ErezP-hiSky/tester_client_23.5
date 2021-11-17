import React from 'react';
// import ApexCharts from 'apexcharts';
import ReactApexChart from 'react-apexcharts';
import '../sass/main.scss';


function PieChart({ failUnits, passUnits }) {
  
  // pie chart
  const pieSeries = [ failUnits, passUnits ];

  const pieOptions = {
    chart: {
      width: "100%",
      type: 'pie',
      
    },
    fill: {
      type: 'gradient',
      colors: ['#1E90FF', '#008000'] // #3ACE1F
    },
    // dataLabels: {
    //   style: {
    //     colors: ['#FFA07A', '#90EE90']
    //   }
    // },
    labels: ['Fail', 'Pass'],
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 200
        },
        legend: {
          position: 'bottom'
        }
      }
    }]
  };

    return (
        <div >
            <div className="pie-chart">
                <h5>Pass / Fail status</h5>
                <ReactApexChart options={pieOptions} series={pieSeries} type="donut" width={380} />
                <p className="lead">This pie chart show the relation between fail and pass terminals .</p>
            </div>
        </div>
    );

}

export default PieChart;
