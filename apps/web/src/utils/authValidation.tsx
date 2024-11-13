import { LoginAuth, RegisterForm } from "@/models/models";
import Cookies from "js-cookie";
import axios, { AxiosResponse } from "axios";

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

        console.log("Handle Login Admin", data);
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

        Cookies.set("access_token", data.data.access_token, {
          expires: in60Minutes, // Cookie access_token kedaluwarsa dalam 1 jam
        });
        Cookies.set("refresh_token", data.data.user.refresh_token, {
          expires: 7,
        });
        return data;
      } else {
        return data;
      }
    } catch (error) {
      console.log(error); // Menampilkan error jika terjadi kesalahan
      return error;
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
      return response;
    } catch (error: any) {
      return error.response.data;
    }
  }

  async validateUserToken(token: string) {
    try {
      const response = await axios.get("/api/auth/validate-token", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Set the data from the response to userState
      if (response) {
        console.log("its execute");
        return response.data.data;
      } else {
        return null;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async refreshUserAcessToken(refreshToken: string) {
    try {
      // Get new access token
      const response = await axios.get("/api/auth/update-token", {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      });

      // Get New Access Token
      const newAccessToken = response.data.data;
      const in60Minutes = 60 / (24 * 60);

      // Check if return access token
      if (!newAccessToken) {
        return undefined;
      }

      // Update access token in cookies
      Cookies.set("access_token", newAccessToken, {
        expires: in60Minutes,
      });

      // Validate access token after refreshing it
      try {
        const validateResponse = await this.validateUserToken(newAccessToken);
        if (validateResponse) {
          return validateResponse;
        } else {
          return null;
        }
      } catch (error) {
        console.log("Error validating token after refresh", error);
      }
    } catch (error) {
      console.log(error); // Menampilkan error jika terjadi kesalahan
    }
  }
}
