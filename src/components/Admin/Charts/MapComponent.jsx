import React from "react";
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";
import { Paper, Typography } from "@mui/material";

// Working GeoJSON URL
const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const MapComponent = () => {
  // Example client locations
  const clients = [
    { name: "New York Office", coordinates: [-74.006, 40.7128] },
    { name: "Paris Office", coordinates: [2.3522, 48.8566] },
    { name: "Istanbul Office", coordinates: [28.9784, 41.0082] },
    { name: "Tokyo Office", coordinates: [139.6917, 35.6895] },
    { name: "Sydney Office", coordinates: [151.2093, -33.8688] },
  ];

  return (
    <Paper
      elevation={3}
      sx={{
        borderRadius: 2,
        padding: 2,
        backgroundColor: "#fff",
        height: 350,
        width: "100%",
        maxWidth: 800, // Limit the max width for visibility
        margin: "0 auto", // Center the map
        boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography variant="h7" fontWeight="bold" align="center" >
        Clients' Locations
      </Typography>
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          scale: 140, // Adjusted for better visibility
          center: [0, 20], // Center the map
        }}
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill="#66BB6A"
                stroke="#FFFFFF"
              />
            ))
          }
        </Geographies>
        {clients.map(({ name, coordinates }) => (
          <Marker key={name} coordinates={coordinates}>
            {/* <circle r={6} fill="#FF5722" stroke="#FFFFFF" strokeWidth={2} />
            <text
              textAnchor="middle"
              y={-12}
              style={{
                fontSize: "24px",
                fontFamily: "Arial",
                fill: "#333",
              }}
            >
              {name}
            </text> */}
              <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{
                transform: "translate(-12, -24)", // Adjust icon position
              }}
            >
              <path
                d="M12 2C8.13 2 5 5.13 5 9C5 12.65 8.45 17.11 11.1 20.04C11.61 20.64 12.39 20.64 12.9 20.04C15.55 17.11 19 12.65 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z"
                fill="#FF5722"
              />
            </svg>
            <text
              textAnchor="middle"
              y={-30}
              style={{
                fontSize: "24px",
                fontFamily: "Arial",
                fill: "#333",
              }}
            >
              {name}
            </text>
          </Marker>
        ))}
      </ComposableMap>
    </Paper>
  );
};

export default MapComponent;
