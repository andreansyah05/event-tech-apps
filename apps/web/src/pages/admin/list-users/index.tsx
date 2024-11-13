import React, { useState, useEffect } from "react";
import axios from "axios";
import { user } from "@/models/listUsers"; // Pastikan tipe user sesuai dengan struktur data
import Swal from "sweetalert2";

const Index = () => {
  // Menggunakan nama state yang lebih deskriptif
  const [users, setUsers] = useState<user[]>([]);

  // Fungsi untuk mengambil data users
  const getAllUsers = async () => {
    try {
      // Tampilkan loading SweetAlert
      Swal.fire({
        title: "Loading...",
        text: "Memuat data pengguna, harap tunggu.",
        icon: "info",
        allowOutsideClick: false,
        showConfirmButton: false,
        timer: 6000,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      // Memanggil API untuk mendapatkan data users
      const response = await axios.get("/api/admin/list-users");

      if (response.status === 200 && response.data) {
        // Menyimpan data jika berhasil
        setUsers(response.data);
        Swal.close(); // Menutup SweetAlert setelah data berhasil dimuat
      } else {
        throw new Error("Gagal mendapatkan data");
      }

      return response.data; // Mengembalikan data
    } catch (error) {
      // Menampilkan pesan error jika terjadi kesalahan
      Swal.fire({
        icon: "error",
        title: "Gagal!",
        text: "Tidak dapat mengambil data pengguna. Silakan coba lagi.",
      });
      console.error("Error fetching users:", error);
    }
  };

  // Mengambil data saat komponen dimount
  useEffect(() => {
    getAllUsers();
  }, []); // Dependency array kosong agar hanya dipanggil sekali saat komponen pertama kali dimount

  console.log("cek:", users);

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-2xl font-bold text-gray-800">LIST USER</h1>

      <table className="min-w-full bg-white border border-gray-300 mt-10">
        <thead>
          <tr>
            <th className="border px-4 py-2 bg-slate-100">Name</th>

            <th className="border px-4 py-2 bg-slate-100">Email</th>

            <th className="border px-4 py-2 bg-slate-100">Points</th>

            <th className="border px-4 py-2 bg-slate-100">Use Referral</th>

            <th className="border px-4 py-2 bg-slate-100">Referral Code</th>

            <th className="border px-4 py-2 bg-slate-100">Register At</th>
          </tr>
        </thead>

        <tbody>
          {users?.length > 0 ? (
            users.map((user: user, index) => (
              <tr key={index}>
                <td className="border px-4 py-2"> {user.name}</td>
                <td className="border px-4 py-2"> {user.email}</td>
                <td className="border px-4 py-2"> {user.points}</td>
                <td className="border px-4 py-2">
                  {user.user_referral.total_use}
                </td>
                <td className="border px-4 py-2">
                  {user.user_referral.referral_code}
                </td>
                <td className="border px-4 py-2">
                  {" "}
                  Register At {user.created_at}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="border px-4 py-2 text-center">
                No events available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Index;
