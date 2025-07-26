"use client";

import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import type { Chart as ChartJS } from "chart.js";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { ImSpinner2 } from "react-icons/im";

type ChartData = {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string[];
    borderColor: string[];
    borderWidth: number;
  }[];
};

export default function PieChart() {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstanceRef = useRef<ChartJS | null>(null);
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(false)
  const [isGenderAvailable, setIsGenderAvailable] = useState(false)
  const [chartData, setChartData] = useState<ChartData>({
    labels: ["Male", "Female", "Unknown"],
    datasets: [
      {
        label: "Diabetes by Gender",
        data: [0, 0, 0], // Placeholder data
        backgroundColor: [
          "rgba(54, 162, 235, 0.6)", // Blue for Male
          "rgba(255, 99, 132, 0.6)", // Pink for Female
          "rgba(201, 203, 207, 0.6)", // Gray for Unknown
        ],
        borderColor: [
          "rgba(54, 162, 235, 1)",
          "rgba(255, 99, 132, 1)",
          "rgba(201, 203, 207, 1)",
        ],
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    const fetchHistory = async () => {
      setLoading(true)
      try {
        const token = Cookies.get("token");
        if (!token) {
          console.error("No token found");
          return;
        }

        const historyResponse = await fetch("http://localhost:3001/history", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });

        if (!historyResponse.ok) {
          console.error("Failed to fetch history:", historyResponse.statusText);
          toast.error(`${historyResponse.statusText}`, {
                              position: "top-center",
                              autoClose: 5000,
                              hideProgressBar: false,
                              closeOnClick: false,
                              pauseOnHover: true,
                              draggable: true,
                              progress: undefined,
                              theme: "dark",
                          });
          return;
        }

        const res = await historyResponse.json();
        const historyData = res.data || [];
        setHistory(historyData);
      } catch (err) {
        console.error("Error fetching history:", err);
      } finally {
        setLoading(false)
      }
    };

    fetchHistory();
  }, []);

  useEffect(() => {
    // Process history to get gender distribution for diabetic patients
    const genderCounts: { [key: string]: number } = {
      Male: 0,
      Female: 0,
      Unknown: 0,
    };

    history
      .filter((record) => record.prediction === "Diabetic")
      .forEach((record) => {
        const gender = record.gender || "Unknown";
        genderCounts[gender] = (genderCounts[gender] || 0) + 1;
      });

    // Calculate total diabetic cases
    const totalDiabetic = Object.values(genderCounts).reduce((sum, count) => sum + count, 0);

    // Calculate percentages (avoid division by zero)
    const percentages = totalDiabetic
      ? Object.keys(genderCounts).map((gender) =>
          ((genderCounts[gender] / totalDiabetic) * 100).toFixed(1)
        )
      : false;

      
      if(!history && !percentages ){
        setIsGenderAvailable(true);
        return;
      }

    // Update chartData
    if(percentages){
         setChartData({
          labels: ["Male", "Female", "Unknown"],
          datasets: [
            {
              label: "Diabetes by Gender",
              data: percentages.map(Number) , // Convert to numbers
              backgroundColor: [
                "rgba(54, 162, 235, 0.6)", // Blue for Male
                "rgba(255, 99, 132, 0.6)", // Pink for Female
                "rgba(201, 203, 207, 0.6)", // Gray for Unknown
              ],
              borderColor: [
                "rgba(54, 162, 235, 1)",
                "rgba(255, 99, 132, 1)",
                "rgba(201, 203, 207, 1)",
              ],
              borderWidth: 1,
            },
          ],
        });
    }
   
  }, [history]);

  

  useEffect(() => {
    if (!chartRef.current) return;

    // Destroy existing chart instance
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    // Create new chart
    const ctx = chartRef.current.getContext("2d");
    if (ctx) {
      chartInstanceRef.current = new Chart(ctx, {
        type: "pie",
        data: chartData,
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: "top",
            },
            tooltip: {
              callbacks: {
                label: function (context) {
                  return `${context.label}: ${context.raw}%`;
                },
              },
            },
          },
        },
      });
    }

    // Cleanup on unmount
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [chartData]); // Update chart when chartData changes

  return (
    <div className="max-w-md mx-auto p-6 flex flex-col justify-evenly bg- h-full rounded-4xl shadow-lg sm:m-4">
      <h2 className="text-lg md:text-xl font-semibold text-white mb-4 text-center">
        Diabetes Prediction Results <br /> Distribution by Gender
      </h2>
      { isGenderAvailable && !loading && <div className="bg-gray-600 text-gray-400 w-56 h-56 mx-auto rounded-full text-xs flex items-center justify-center"> No stats to show</div> }
      { 
        loading ? <ImSpinner2 className='animate-spin text-2xl mx-auto text-white' /> : 
        !isGenderAvailable && <canvas ref={chartRef} className="w-full h-[80px]" />
      }
    </div>
  );
}