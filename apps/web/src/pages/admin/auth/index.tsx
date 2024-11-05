import React, { useState, useEffect } from "react";
import { LoginAuth } from "@/models/auth";
import { AuthHandler } from "@/pages/api/authValidation";
import Button from "@/components/Button";
import Link from "next/link";

function AdminLogin() {
  // Membuat instance dari AuthHandler untuk menangani proses autentikasi
  const authHandler = new AuthHandler();

  // State untuk menyimpan data form (email dan password) dengan tipe LoginAuth
  const [formData, setFormData] = useState<LoginAuth>({
    email: "",
    password: "",
  });

  // State untuk mengontrol apakah tombol login dinonaktifkan
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);

  // Fungsi untuk menangani perubahan input email
  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Memperbarui state formData dengan nilai email baru
    setFormData({ ...formData, email: e.target.value });
    // Menonaktifkan tombol jika email kosong atau kurang dari 8 karakter
    setIsButtonDisabled(
      e.target.value.trim() === "" || e.target.value.length < 8
    );
  };

  // Fungsi untuk menangani perubahan input password
  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Memperbarui state formData dengan nilai password baru
    setFormData({ ...formData, password: e.target.value });
    // Menonaktifkan tombol jika password kosong atau kurang dari 8 karakter
    setIsButtonDisabled(
      e.target.value.trim() === "" || e.target.value.length < 8
    );
  };

  // Fungsi untuk menangani submit form login
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Mencegah reload halaman setelah submit
    const response = await authHandler.handleSubmitData(formData);
    if (response) {
      // Jika response status 200, maka user berhasil login
      // Redirect ke halaman admin
      window.location.href = "/admin/dashboard";
    }
    // Mengirim data form ke fungsi handleSubmitData di AuthHandler
  };

  useEffect(() => {
    setIsButtonDisabled(authHandler.handleLoginValidation(formData));
  }, [formData.email, formData.password]);

  return (
    <>
      <div className="p-4 md:flex md:h-screen md:justify-center md:items-center">
        <div className="max-w-screen-sm mx-auto p-5 border border-zinc-200 rounded bg-white md:p-10">
          {/* Judul form login */}
          <h1 className="font-bold text-2xl mb-9 md:text-3xl">
            WELCOME TO ADMIN PANEL
          </h1>
          <form onSubmit={handleSubmit} className="mb-6">
            {/* Input Email */}
            <div className="mb-6">
              <label className="block mb-2 font-medium text-gray-900">
                Email address
              </label>
              <input
                type="email"
                id="email"
                className="bg-zinc-100 hover:bg-zinc-200 transition-all focus:border-red-500 text-gray-900 text-sm rounded-sm block w-full p-3"
                placeholder="Enter your email address"
                value={formData.email}
                onChange={handleChangeEmail}
                required
              />
            </div>
            {/* Input Password */}
            <div className="mb-6">
              <label className="block mb-2 font-medium text-gray-900">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="bg-zinc-100 hover:bg-zinc-200 transition-all focus:border-red-500 text-gray-900 text-sm rounded-sm block w-full p-3 mb-1"
                placeholder="min 8 characters"
                value={formData.password}
                onChange={handleChangePassword}
                required
              />
            </div>
            {/* Tombol Login, dibungkus dengan Link */}

            <Button
              type="primary"
              text="Login"
              isButtonDisable={isButtonDisabled} // Mengontrol aktif/tidaknya tombol login
            />
          </form>
        </div>
      </div>
    </>
  );
}

export default AdminLogin;
