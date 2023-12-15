import { useTheme } from "@mui/material";
import { tokens } from "../theme";
import { mockLineData as data } from "../data/mockData";

import { Line } from "react-chartjs-2";
import { LinearScale } from 'chart.js';
import {Chart as Chartjs} from 'chart.js/auto'; 

import useAxiosPrivate from '../../src/hooks/useAxiosPrivate';

import { useState, useEffect, useRef  } from "react";

import { useLocation, useNavigate } from 'react-router-dom';

LinearScale.id = 'linear'; 


const LineChart = ({ isCustomLineColors = false, isDashboard = false }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const chartRef = useRef(null);

  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  const [projectdata, setProjectdata] = useState(null);
  const [startMonth, setStartMonth] = useState();
  const [endMonth, setEndMonth] = useState();

  const [chartData, setChartData] = useState(null);

  const getInitialStartMonth = () => {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1; // Months are zero-indexed
  return (currentMonth - 6 + 12) % 12 + 2; // Calculate the initial start month
};



  const [currentStartMonth, setCurrentStartMonth] = useState(getInitialStartMonth()); // Initial start month for display

  useEffect (() => {
    let isMounted = true;
    
    const getProjectdata = async () => {
      try {
          await axiosPrivate.get(`/projctpermonth`).then((res)=>{
            console.log("res", res);
            console.log("start_month", new Date(res.data.start_date).getMonth()+1)
            setStartMonth(new Date(res.data.start_date).getMonth()+1)
            setEndMonth(new Date(res.data.end_date).getMonth()+1)
            isMounted && setProjectdata({
              labels: res.data.project_list.map(
                (individualData) => `${individualData.month}, ${individualData.year}`
              ),
              // datasets: [{
              //   label: 'Project Count',
              //   data: res.data.project_list.map((induvidualData)=>induvidualData.project_count),
              //   fill: true,  // Enable filling the area below the line
              //   backgroundColor: 'rgba(75, 192, 192, 0.2)',  // Set the fill color
              //   borderColor: 'rgba(75, 192, 192, 1)',  // Set the line color

              // }]
              datasets: [
                {
                  label: 'Project Count',
                  data: res.data.project_list.map((individualData) => individualData.project_count),
                  fill: true,
                  backgroundColor: 'rgba(75, 192, 192, 0.4)',
                  borderColor: 'rgba(75, 192, 192, 1)',
                },
                {
                  label: 'Sample Count',
                  data: res.data.sample_list.map((individualData1) => individualData1.sample_count),
                  fill: true,
                  backgroundColor: 'rgba(75, 192, 192, 0.2)',
                  borderColor: 'rgba(75, 192, 192, 1)',
                },
              ],
            });
          })

      } catch (err) {
          console.error(err);
          navigate('/login', { state: { from: location }, replace: true });
      }
  }

     getProjectdata();
   

    return () => {
        isMounted = false;
        // controller.abort();
    }
}, []);

useEffect(() => {
 
  if (projectdata) {
    const filteredData = filterDataForLast6Months(
      projectdata,
      currentStartMonth
    );
    setChartData(filteredData);
  }
}, [projectdata, currentStartMonth]);







// const filterDataForLast6Months = (data, startMonth) => {
//   const startIndex = startMonth-1; 
//   const endIndex = startIndex + 6;

//   console.log("startIndex:", startIndex);
//   console.log("endIndex:", endIndex);

//   return {
//     labels: data.labels.slice(startIndex, endIndex),
//     datasets: [{
//       label: 'Project Count',
//       data: data.datasets[0].data.slice(startIndex, endIndex),
//       fill: true,
//       backgroundColor: 'rgba(75, 192, 192, 0.2)',
//       borderColor: 'rgba(75, 192, 192, 1)',
//     }],
//   };
// };

const filterDataForLast6Months = (data, startMonth) => {
  // // Check if the data structure is valid
  // if (!data || !data.labels || !data.datasets || !Array.isArray(data.datasets) || data.datasets.length === 0) {
  //   console.error("Invalid data structure");
  //   return null; // or handle it as appropriate for your use case
  // }

  const startIndex = startMonth - 1;
  const endIndex = startIndex + 6;

  console.log("startIndex:", startIndex);
  console.log("endIndex:", endIndex);

  // // Ensure that the data length is sufficient
  // if (startIndex < 0 || endIndex > data.labels.length) {
  //   console.error("Invalid start or end index");
  //   return null; // or handle it as appropriate for your use case
  // }

  return {
    labels: data.labels.slice(startIndex, endIndex),
    datasets: data.datasets.map((dataset) => ({
      label: dataset.label,
      data: dataset.data.slice(startIndex, endIndex),
      fill: dataset.fill,
      backgroundColor: dataset.backgroundColor,
      borderColor: dataset.borderColor,
    })),
  };
};



// const handleNext = () => {
//   // Move to the next set of 6 months
//   setCurrentStartMonth((prevStartMonth) => (prevStartMonth + 1) % 7 || 1);
// };

const handleNext = () => {
  setCurrentStartMonth((prevStartMonth) => (prevStartMonth % 12) + 1);
};

const handlePrev = () => {
  setCurrentStartMonth((prevStartMonth) => ((prevStartMonth - 2 + 12) % 12) + 1);
};



// const handlePrev = () => {
//   // Move to the previous set of 6 months
//   setCurrentStartMonth((prevStartMonth) => (prevStartMonth - 1 + 7) % 7 || 1);
// };



  return (
   
  <div style={{height: '100%', position: "relative"}}>
      
      <div className="flex justify-between mx-3" style = {{height : "15%"}}>
      <button className="btn border" style = {{color: colors.grey[100]}}  onClick={handlePrev}>Previous</button>
       
        <button className="btn border" style = {{color: colors.grey[100]}}  onClick={handleNext}>Next</button>
      </div>
      <div className="flex align-items-end" style = {{height : "85%"}}>
      {chartData ? (
          <Line height="80px"  data={chartData} />
    
        ) : (
          <p>Loading...</p>
        )}
        </div>
    </div>
  );
};

export default LineChart;
