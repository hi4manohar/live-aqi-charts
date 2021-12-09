import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    title: {
      display: true,
      text: ""
    }
  },
  layout: {
    padding: {
      top: 20
    }
  }
};

export default function AqiChart(props) {
  const { labels, aqidata: aqiData, backgroundColor } = props;

  const data = {
    labels,
    datasets: [
      {
        label: "AQI Level",
        data: aqiData,
        backgroundColor
      }
    ]
  };

  return (
    <div class="chart-container" style={{
      position: "relative",
      width: "100%",
      maxWidth: "900px",
      margin: "0 auto"
    }}>
      <Bar options={options} data={data} responsive={true} />
    </div>
  );
}
