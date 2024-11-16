import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  BarController,
} from "chart.js";

Chart.register(
  CategoryScale,
  LinearScale,
  BarElement,
  BarController,
  Title,
  Tooltip,
  Legend
);

interface ChartData {
  month: number; // Ubah menjadi number, karena biasanya bulan diterima dalam format angka
  count: number;
}

const MyBarChartTransaction = () => {
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstanceRef = useRef<Chart | null>(null);

  // Fungsi untuk mengonversi angka bulan ke nama bulan
  const getMonthName = (monthNumber: number): string => {
    const months = [
      "Januari",
      "Februari",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "Desember",
    ];
    return months[monthNumber - 1]; // bulan dimulai dari 1, jadi kita sesuaikan dengan index array
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "/api/admin/dashboard/total-montly-transaction"
        );
        // Konversi angka bulan menjadi nama bulan
        const transformedData = response.data.map((item: ChartData) => ({
          ...item,
          month: getMonthName(item.month), // Mengubah angka bulan menjadi nama bulan
        }));
        setChartData(transformedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const canvas = chartRef.current as HTMLCanvasElement;
    if (canvas) {
      const ctx = canvas.getContext("2d");

      // Destroy previous chart instance if it exists
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }

      if (ctx) {
        // Create a new chart instance and store it in the ref
        chartInstanceRef.current = new Chart(ctx, {
          type: "bar",
          data: {
            labels: chartData.map((item) => item.month), // Menggunakan nama bulan
            datasets: [
              {
                label: "Total Sales",
                data: chartData.map((item) => item.count),
                backgroundColor: "rgba(255, 99, 132, 0.2)",
                borderColor: "rgba(255, 99, 132, 1)",
                borderWidth: 1,
              },
            ],
          },
          options: {
            responsive: true,
            scales: {
              x: {
                type: "category",
                ticks: {
                  color: "white", // Mengganti warna font sumbu X menjadi putih
                  font: {
                    size: 14, // Ukuran font pada sumbu X
                  },
                },
              },
              y: {
                beginAtZero: true,
                ticks: {
                  color: "white", // Mengganti warna font sumbu Y menjadi putih
                  font: {
                    size: 14, // Ukuran font pada sumbu Y
                  },
                },
              },
            },
            plugins: {
              title: {
                display: true,
                text: "Total Sales Transaction per Month",
                color: "white", // Mengganti warna font title menjadi putih
                font: {
                  size: 16, // Ukuran font title
                },
              },
              tooltip: {
                titleColor: "white", // Mengganti warna font title tooltip menjadi putih
                bodyColor: "white", // Mengganti warna font body tooltip menjadi putih
                backgroundColor: "rgba(0, 0, 0, 0.7)", // Warna latar belakang tooltip
                borderColor: "white", // Warna border tooltip
                borderWidth: 1, // Ketebalan border tooltip
              },
              legend: {
                labels: {
                  color: "white", // Mengganti warna font legend menjadi putih
                },
              },
            },
          },
        });
      }
    }

    // Cleanup function to destroy the chart instance when the component unmounts
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [chartData]);

  return <canvas ref={chartRef} />;
};

export default MyBarChartTransaction;
