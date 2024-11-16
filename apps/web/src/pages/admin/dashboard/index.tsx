import { useState, useEffect } from "react";
import axios from "axios";
import MyBarChart from "@/components/analytics/analytics.monthly.registration";
import MyBarChartTransaction from "@/components/analytics/analyics.monthly.transaction";

// Definisikan interface untuk struktur data dashboard
interface DashboardData {
  totalUsers: number;
  totalEvents: number;
  totalPaids: number;
  totalPaidValues: number;
  // totalRegistration: number;
  // totalTransaction: number;
}

function AdminDashboard() {
  // State untuk menyimpan data dashboard
  const [dashboard, setDashboard] = useState<DashboardData>({
    totalUsers: 0,
    totalEvents: 0,
    totalPaids: 0,
    totalPaidValues: 0,
    // totalRegistration: 0,
    // totalTransaction: 0,
  });

  useEffect(() => {
    // Fungsi untuk mengambil data dari setiap endpoint
    const fetchData = async () => {
      console.log(fetchData);
      try {
        // Menggunakan Promise.all untuk fetch data dari 4 endpoint secara paralel

        const responses = await Promise.all([
          axios.get("/api/admin/dashboard/total-users"),
          axios.get("/api/admin/dashboard/total-listevents"),
          axios.get("/api/admin/dashboard/total-transaction"),
          axios.get("/api/admin/dashboard/total-transaction-value"),
          // axios.get("/api/admin/dashboard/total-registration"),
          // axios.get("/api/admin/dashboard/total-transaction"),
        ]);

        // Pastikan setiap response berisi data yang sesuai
        const totalUsers = responses[0]?.data?.userCount || 0;
        const totalEvents = responses[1]?.data?.totalEvents || 0;
        const totalPaids = responses[2]?.data?.data || 0;
        const totalPaidValues = responses[3]?.data?._sum.payment_ammount || 0;
        // const totalRegistration = responses[4]?.data?.totalRegistration || 0;
        // const totalTransaction = responses[5]?.data?.totalTransaction || 0;

        console.log("ini adalah response :", responses);

        // Mengupdate state dengan data yang diperoleh
        setDashboard({
          totalUsers,
          totalEvents,
          totalPaids,
          totalPaidValues,
          // totalRegistration,
          // totalTransaction,
        });
      } catch (error) {
        // Menambahkan log lebih rinci untuk debugging
        console.error("Error fetching data:", error);
      }
    };

    // Memanggil fungsi fetchData saat komponen pertama kali di-render
    fetchData();
  }, []); // Empty array berarti efek hanya dijalankan sekali saat mount

  return (
    <>
      <div className="flex flex-wrap justify-center items-center bg-white p-4 space-y-4 sm:space-y-0 sm:space-x-4">
        {/* Card 1 */}
        <div className="flex flex-col items-center justify-center sm:w-44 h-28 bg-gray-800 rounded-lg shadow-md text-white">
          <div className="text-red-600 text-3xl">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              className="w-8 h-8"
              viewBox="0 0 24 24"
            >
              <path d="M3 12l2.29 2.29 4.88-4.88 2.83 2.83L21 5.41 19.59 4 12 11.59 9.17 8.76 3 14.93z"></path>
            </svg>
          </div>
          <div className="text-sm text-center text-gray-400">
            Total User Registration
          </div>
          <div className="text-lg font-semibold">{dashboard.totalUsers}</div>
        </div>

        {/* Card 2 */}
        <div className="flex flex-col items-center justify-center w-full sm:w-44 h-28 bg-gray-800 rounded-lg shadow-md text-white">
          <div className="text-red-600 text-3xl">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              className="w-8 h-8"
              viewBox="0 0 24 24"
            >
              <path d="M3 3h18v2H3V3zm3 4h12v2H6V7zm-3 4h18v2H3v-2zm3 4h12v2H6v-2zm-3 4h18v2H3v-2z"></path>
            </svg>
          </div>
          <div className="text-sm text-center text-gray-400">
            Total Event Create
          </div>
          <div className="text-lg font-semibold">{dashboard.totalEvents}</div>
        </div>

        {/* Card 3 */}
        <div className="flex flex-col items-center justify-center w-full sm:w-44 h-28 bg-gray-800 rounded-lg shadow-md text-white">
          <div className="text-red-600 text-3xl">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              className="w-8 h-8"
              viewBox="0 0 24 24"
            >
              <path d="M12 4.21l-6 4.5v9h12v-9l-6-4.5zm0 1.76l4.5 3.37v7.11h-9v-7.11l4.5-3.37zM5 2h14v2H5V2zm2 4h10v2H7V6z"></path>
            </svg>
          </div>
          <div className="text-sm text-center text-gray-400">
            Total Transaction (Paid)
          </div>
          <div className="text-lg font-semibold">{dashboard.totalPaids}</div>
        </div>

        {/* Card 4 */}
        <div className="flex flex-col items-center justify-center w-full sm:w-44 h-28 bg-gray-800 rounded-lg shadow-md text-white">
          <div className="text-red-600 text-3xl">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              className="w-8 h-8"
              viewBox="0 0 24 24"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12c0 5.52 4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7.09-3.85-7.07-7.93H4c.01 4.08 3.17 7.44 7.06 7.93V19zm6.26-1.91C15.17 16.1 14 14.07 14 12c0-2.07 1.17-4.1 3.26-5.02V7.08c-2.5.89-4.26 3.23-4.26 5.92 0 2.69 1.76 5.04 4.26 5.92v-1.01z"></path>
            </svg>
          </div>
          <div className="text-sm text-center text-gray-400">
            Total Transaction Value (Paid)
          </div>
          <div className="text-lg font-semibold">
            {dashboard.totalPaidValues}
          </div>
        </div>
      </div>

      {/* Bar Charts Section */}
      <div className="flex flex-col sm:flex-row justify-center items-center bg-white p-4 space-y-4 sm:space-y-0 sm:space-x-4 mt-6">
        <div className="flex justify-center bg-gray-800 rounded-lg shadow-md text-white w-full sm:w-[48%]">
          <MyBarChart />
        </div>
        <div className="flex justify-center bg-gray-800 rounded-lg shadow-md text-white w-full sm:w-[48%]">
          <MyBarChartTransaction />
        </div>
      </div>
    </>
  );
}

export default AdminDashboard;
