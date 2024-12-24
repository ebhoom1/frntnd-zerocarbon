import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';
import { MatrixElement } from 'chartjs-chart-matrix';

ChartJS.register(CategoryScale, LinearScale, Title, Tooltip, Legend, MatrixElement);

const TopEmissionSourcesHeatmap = ({ data }) => {
  const matrixData = {
    datasets: [
      {
        label: 'Emission Intensity',
        data: data.map((d, i) => ({
          x: i,
          y: 0,
          v: d.emissions,
        })),
        backgroundColor: (ctx) => {
          const value = ctx.raw.v;
          const red = Math.min(255, value * 2);
          const green = 255 - Math.min(255, value * 2);
          return `rgb(${red}, ${green}, 0)`;
        },
        width: () => 50,
        height: () => 50,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: (ctx) => `${ctx.raw.v} kgCO2`,
        },
      },
    },
    scales: {
      x: {
        type: 'category',
        labels: data.map((d) => d.source),
      },
      y: {
        display: false,
      },
    },
  };

  return <canvas id="heatmap" />;
};

export default TopEmissionSourcesHeatmap;
