import { LoginAuth, RegisterForm } from "@/models/auth"; // Mengimpor tipe data LoginAuth dan RegisterForm untuk validasi tipe data
import Cookies from "js-cookie"; // Mengimpor js-cookie untuk mengatur cookies
import axios from "axios"; // Mengimpor axios untuk membuat request HTTP

export class AuthHandler {
  // Fungsi untuk validasi form login
  handleLoginValidation(formData: LoginAuth) {
    const emailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g; // Pola regex untuk validasi email
    const checkEmail = emailPattern.test(formData.email); // Mengecek apakah email sesuai dengan pola

    // Mengembalikan true jika email atau password kosong atau email tidak valid
    if (formData.email === "" || formData.password === "" || !checkEmail) {
      return true;
    } else {
      return false; // Mengembalikan false jika semua validasi terpenuhi
    }
  }

  async handleLoginAdmin(formData: LoginAuth) {
    try {
      const response = await axios.post("/api/auth/login-user", {
        email: formData.email,
        password: formData.password,
      });

      const data = response.data;

      // Jika respons status adalah 200, set cookies untuk access_token dan refresh_token
      if (response.status === 200) {
        const in60Minutes = 1 / 24; // Mengatur masa kedaluwarsa access_token (60 menit)

        console.log(data);
        Cookies.set("access_token", data.data.access_token, {
          expires: in60Minutes,
        });
        Cookies.set("refresh_token", data.data.refresh_token, {
          expires: 7,
        });
        return true; // Login berhasil
      } else {
        return false; // Login gagal
      }
    } catch (error) {
      console.error("Login error:", error);
      return false; // Login gagal
    }
  }

  //   try {
  //     const response = await axios.post("/api/auth/login-user", {
  //       email: formData.email, // Mengirim email dari form
  //       password: formData.password, // Mengirim password dari form
  //     });

  //     const data = response.data; // Menyimpan respons data

  //     // Jika respons status adalah 200, set cookies untuk access_token dan refresh_token
  //     if (response.status === 200) {
  //       const in60Minutes = 1 / 24; // Mengatur masa kedaluwarsa access_token (60 menit)

  //       console.log(data);
  //       Cookies.set("access_token", data.data.access_token, {
  //         expires: in60Minutes, // Cookie access_token kedaluwarsa dalam 1 jam
  //       });
  //       Cookies.set("refresh_token", data.data.refresh_token, {
  //         expires: 7, // Cookie refresh_token kedaluwarsa dalam 7 hari
  //       });
  //       return { status: 200, message: "Login successful" };
  //     } else {
  //       return {
  //         status: response.status,
  //         message: "Failed to login",
  //       };
  //     }
  //   } catch (error) {
  //     console.error("Login error:", error);
  //     return { status: 500, message: "An error occurred during login" };
  //   }
  // }

  // Fungsi untuk validasi form registrasi
  handleRegistrationValidation(formData: RegisterForm) {
    const emailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g; // Pola regex untuk validasi email
    const checkEmail = emailPattern.test(formData.email); // Mengecek apakah email sesuai dengan pola

    // Mengembalikan true jika salah satu kondisi tidak terpenuhi (email atau password kosong, password kurang dari 6 karakter, nama kosong, atau email tidak valid)
    if (
      formData.email === "" ||
      formData.password === "" ||
      formData.password.length < 6 ||
      formData.name === "" ||
      !checkEmail
    ) {
      return true;
    } else {
      return false; // Mengembalikan false jika semua validasi terpenuhi
    }
  }

  // Fungsi untuk mengirim data login ke server
  async handleSubmitData(formData: LoginAuth) {
    try {
      const response = await axios.post("/api/auth/login-user", {
        email: formData.email, // Mengirim email dari form
        password: formData.password, // Mengirim password dari form
      });
      const data = response.data; // Menyimpan respons data
      console.log("anjing:", data);

      // Jika respons status adalah 200, set cookies untuk access_token dan refresh_token
      if (response.status === 200) {
        const in60Minutes = 60 / (24 * 60); // Mengatur masa kedaluwarsa access_token (60 menit)

        console.log(data);
        Cookies.set("access_token", data.data.access_token, {
          expires: in60Minutes, // Cookie access_token kedaluwarsa dalam 1 jam
        });
        Cookies.set("refresh_token", data.data.refresh_token, {
          expires: 7, // Cookie refresh_token kedaluwarsa dalam 7 hari
        });
        return response; // Mengembalikan respons jika berhasil
      } else {
        return response; // Mengembalikan respons jika tidak berhasil
      }
    } catch (error) {
      console.log(error); // Menampilkan error jika terjadi kesalahan
    }
  }

  // Fungsi untuk mengirim data registrasi ke server
  async handleRegistrationUser(formData: RegisterForm) {
    try {
      const response = await axios.post("/api/auth/register-user", {
        name: formData.name, // Mengirim nama dari form
        email: formData.email, // Mengirim email dari form
        password: formData.password, // Mengirim password dari form
        role: "user", // Mengatur role user sebagai "user"
      });
      return response; // Mengembalikan respons jika registrasi berhasil
    } catch (error) {
      console.log(error); // Menampilkan error jika terjadi kesalahan
    }
  }
}
