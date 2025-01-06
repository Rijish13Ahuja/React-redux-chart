import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, PointElement, LinearScale, Title, Tooltip, Legend, CategoryScale } from "chart.js";

// Register Chart.js components
ChartJS.register(LineElement, PointElement, LinearScale, Title, Tooltip, Legend, CategoryScale);

const LineChart = () => {
  const [chartData, setChartData] = useState({
    labels: [], // Time labels
    datasets: [
      {
        label: "Real-Time Data",
        data: [], // Data points
        borderColor: "#4CAF50",
        backgroundColor: "rgba(76, 175, 80, 0.2)",
        borderWidth: 2,
        tension: 0.4, // Smooth curve
        pointRadius: 5, // Default point size
        pointBackgroundColor: "#FF5722", // Highlighted point color
      },
    ],
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const timeLabel = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
      const randomValue = (Math.random() * 100).toFixed(2); // Random data point

      setChartData((prev) => {
        const updatedLabels = [...prev.labels, timeLabel].slice(-10); // Keep last 10 points
        const updatedData = [...prev.datasets[0].data, randomValue].slice(-10); // Keep last 10 points

        return {
          ...prev,
          labels: updatedLabels,
          datasets: [
            {
              ...prev.datasets[0],
              data: updatedData,
              pointRadius: updatedData.map((_, idx) =>
                idx === updatedData.length - 1 ? 7 : 5 // Highlight latest point
              ),
            },
          ],
        };
      });
    }, 1000);

    return () => clearInterval(interval); // Cleanup interval
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: (context) => `Value: ${context.raw}`,
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Time",
          color: "#FFFFFF",
        },
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
        ticks: {
          color: "#FFFFFF",
        },
      },
      y: {
        title: {
          display: true,
          text: "Values",
          color: "#FFFFFF",
        },
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
        ticks: {
          color: "#FFFFFF",
        },
      },
    },
  };

  return (
    <div className="bg-gray-800 p-4 rounded shadow-md">
      <Line data={chartData} options={options} />
    </div>
  );
};

export default LineChart;
