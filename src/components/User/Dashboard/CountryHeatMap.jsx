import React from "react";
import {
  HeatMapComponent,
  Inject,
  Legend,
  Tooltip,
} from "@syncfusion/ej2-react-heatmap";

const CountryHeatmap = ({ country, onBack }) => {
  // Example country-specific data
  const countryData = {
    "Delhi (HQ)": [
      [50, 100, 70], // Transportation, Energy, Waste
      [90, 200, 150],
      [30, 60, 40],
    ],
    Mumbai: [
      [80, 120, 90],
      [110, 220, 180],
      [40, 70, 50],
    ],
    // Add other countries as needed
  };

  const emissionSources = ["Transportation", "Energy Usage", "Waste Management"];

  return (
    <div>
      <button
        onClick={onBack}
        style={{
          marginBottom: "10px",
          padding: "8px 16px",
          backgroundColor: "#3498DB",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Back to Global View
      </button>
      <HeatMapComponent
        id="country-heatmap"
        titleSettings={{
          text: `GHG Emissions in ${country} (tCO2e)`,
          textStyle: { size: "16px", fontWeight: "Bold", color: "#333" },
        }}
        xAxis={{
          labels: ["Scope 1", "Scope 2", "Scope 3"], // Scopes
        }}
        yAxis={{
          labels: emissionSources, // Emission sources
        }}
        dataSource={countryData[country] || [[0, 0, 0]]} // Use default if no data
        legendSettings={{
          visible: true,
          position: "Right",
        }}
        tooltipSettings={{
          enable: true,
          format: "Emission: ${value} tCO2e",
        }}
        paletteSettings={{
          palette: [
            { value: 10, color: "#D6EAF8" },
            { value: 100, color: "#85C1E9" },
            { value: 200, color: "#3498DB" },
            { value: 300, color: "#2874A6" },
            { value: 400, color: "#1B4F72" },
          ],
        }}
        width="600px"
        height="350px"
      >
        <Inject services={[Legend, Tooltip]} />
      </HeatMapComponent>
    </div>
  );
};

export default CountryHeatmap;



