// import React from "react";
// import { Bar } from "react-chartjs-2";
// import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// const Heatmap = () => {
//   const data = {
//     labels: ["Diesel Generators", "Purchased Electricity", "Gas Combustion", "Vehicle Fleet", "Machinery"],
//     datasets: [
//       {
//         label: "Emission Value",
//         data: [1200, 900, 700, 400, 200],
//         backgroundColor: [
//           "#B30000", // Dark red
//           "#FFB74D", // Orange
//           "#FFFF8D", // Yellow
//           "#4CAF50", // Green
//           "#1B5E20", // Dark green
//         ],
//       },
//     ],
//   };

//   const options = {
//     indexAxis: "y", // Horizontal Bar Chart
//     plugins: {
//       legend: {
//         display: false,
//       },
//       title: {
//         display: true,
//         text: "Top Emission Sources",
//         font: {
//           size: 18,
//         },
//       },
//       tooltip: {
//         callbacks: {
//           label: (context) => `${context.raw} Emissions`,
//         },
//       },
//     },
//     scales: {
//       x: {
//         beginAtZero: true,
//         title: {
//           display: true,
//           text: "Emission Value",
//         },
//       },
//       y: {
//         title: {
//           display: true,
//           text: "Sources",
//         },
//       },
//     },
//   };

//   return <Bar data={data} options={options} />;
// };

// export default Heatmap;

//original
// import React from "react";
// import {
//   HeatMapComponent,
//   Inject,
//   Legend,
//   Tooltip,
// } from "@syncfusion/ej2-react-heatmap";
// import "@syncfusion/ej2-base/styles/material.css";

// const Heatmap = () => {
//   // Transposed data to match Syncfusion's expectations
//   const data = [
//     [120, 200, 180, 150, 100, 90, 110], // Scope 1 (tCO2e)
//     [300, 400, 350, 320, 280, 260, 300], // Scope 2 (tCO2e)
//     [500, 600, 450, 400, 350, 300, 400], // Scope 3 (tCO2e)
//   ];

//   return (
//     <HeatMapComponent
//       id="heatmap"
//       titleSettings={{
//         text: "GHG Emissions by Source and Location (tCO2e)",
//         textStyle: { size: "16px", fontWeight: "Bold", color: "#333" },
//       }}
//       xAxis={{
//         labels: ["Scope 1 (tCO2e)", "Scope 2 (tCO2e)", "Scope 3 (tCO2e)"], // 3 labels
//       }}
//       yAxis={{
//         labels: [
//           "Delhi (HQ)",
//           "Mumbai",
//           "Bangalore",
//           "Chennai",
//           "Hyderabad",
//           "Pune",
//           "Kolkata",
//         ], // 7 labels
//       }}
//       dataSource={data} // Matches the xAxis and yAxis explicitly
//       legendSettings={{
//         visible: true,
//         position: "Right",
//       }}
//       tooltipSettings={{
//         enable: true,
//         format: "Emission: ${value} tCO2e",
//       }}
//       paletteSettings={{
//         palette: [
//           { value: 100, color: "#D6EAF8" },
//           { value: 300, color: "#85C1E9" },
//           { value: 400, color: "#3498DB" },
//           { value: 500, color: "#2874A6" },
//           { value: 600, color: "#1B4F72" },
//         ],
//       }}
//       width="600px"
//       height="350px"
//     >
//       <Inject services={[Legend, Tooltip]} />
//     </HeatMapComponent>
//   );
// };

// export default Heatmap;

//heatmap with country specific
// import React, { useState } from "react";
// import {
//   HeatMapComponent,
//   Inject,
//   Legend,
//   Tooltip,
// } from "@syncfusion/ej2-react-heatmap";
// import "@syncfusion/ej2-base/styles/material.css";
// import CountryHeatmap from "./CountryHeatMap";

// const Heatmap = () => {
//   const [selectedCountry, setSelectedCountry] = useState(null);

//   const data = [
//     [120, 200, 180, 150, 100, 90, 110], // Scope 1 (tCO2e)
//     [300, 400, 350, 320, 280, 260, 300], // Scope 2 (tCO2e)
//     [500, 600, 450, 400, 350, 300, 400], // Scope 3 (tCO2e)
//   ];

//   const locations = [
//     "Delhi (HQ)",
//     "Mumbai",
//     "Bangalore",
//     "Chennai",
//     "Hyderabad",
//     "Pune",
//     "Kolkata",
//   ];

//   const handleCellClick = (args) => {
//     console.log("Cell click event data:", args); // Log the entire event data
  
//     if (args?.yLabel) {
//       const selectedLocation = args.yLabel; // Get the location from yLabel
//       const emissionValue = args.value; // Get the emission value for the cell
//       console.log(
//         `Selected Location: ${selectedLocation}, Emission Value: ${emissionValue} tCO2e`
//       );
//       setSelectedCountry(selectedLocation); // Set the selected location
//     } else {
//       console.error("Invalid or missing event data:", args);
//     }
//   };
  

//   return (
//     <div>
//       {selectedCountry ? (
//         <CountryHeatmap
//           country={selectedCountry}
//           onBack={() => setSelectedCountry(null)}
//         />
//       ) : (
//         <HeatMapComponent
//           id="heatmap"
//           titleSettings={{
//             text: "GHG Emissions by Source and Location (tCO2e)",
//             textStyle: { size: "16px", fontWeight: "Bold", color: "#333" },
//           }}
//           xAxis={{
//             labels: ["Scope 1 (tCO2e)", "Scope 2 (tCO2e)", "Scope 3 (tCO2e)"],
//           }}
//           yAxis={{
//             labels: locations,
//           }}
//           dataSource={data}
//           legendSettings={{
//             visible: true,
//             position: "Right",
//           }}
//           tooltipSettings={{
//             enable: true,
//             format: "Emission: ${value} tCO2e",
//           }}
//           paletteSettings={{
//             palette: [
//               { value: 100, color: "#D6EAF8" },
//               { value: 300, color: "#85C1E9" },
//               { value: 400, color: "#3498DB" },
//               { value: 500, color: "#2874A6" },
//               { value: 600, color: "#1B4F72" },
//             ],
//           }}
//           width="600px"
//           height="350px"
//           cellClick={handleCellClick} // Attach the handler
//         >
//           <Inject services={[Legend, Tooltip]} />
//         </HeatMapComponent>
//       )}
//     </div>
//   );
// };

// export default Heatmap;


//testing
import React from "react";
import { Paper } from "@mui/material";
import ReactApexChart from "react-apexcharts";

const HeatmapChart = () => {
  const data = [
    { name: "Delhi (HQ)", data: [120, 300, 500] },
    { name: "Mumbai", data: [200, 400, 600] },
    { name: "Bangalore", data: [180, 350, 450] },
    { name: "Chennai", data: [150, 320, 400] },
    { name: "Hyderabad", data: [100, 280, 350] },
    { name: "Pune", data: [90, 260, 300] },
    { name: "Kolkata", data: [110, 300, 400] },
  ];

  const options = {
    chart: {
      type: "heatmap",
      height: 400,
      toolbar: {
        show: false,
      },
      
    },
    plotOptions: {
      heatmap: {
        shadeIntensity: 0.5,
        colorScale: {
          ranges: [
            { from: 0, to: 200, name: "Low", color: "#80AF81" },
            { from: 201, to: 400, name: "Medium", color: "#508D4E" },
            { from: 401, to: 600, name: "High", color: "#1A5319" },
          ],
        },
      },
    },
    dataLabels: {
      enabled: true,
    },
    xaxis: {
      categories: ["Scope 1 (tCO2e)", "Scope 2 (tCO2e)", "Scope 3 (tCO2e)"],
    },
    title: {
      text: "GHG Emissions by Source and Location (tCO2e)",
      style: {
        fontSize: "16px",
        fontWeight: "bold",
      },
    },
  };

  return (
    <Paper
      elevation={3}
      sx={{
        borderRadius: 2,
        padding: 1,
        boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
        backgroundColor: "#fff",
        width: "100%",
        maxWidth:"480px"
      }}
    >
      <ReactApexChart
        options={options}
        series={data}
        type="heatmap"
        height={350}
        width={480}
      />
      
    </Paper>
  );
};

export default HeatmapChart;
