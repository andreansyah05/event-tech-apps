import { LoginAuth, RegisterForm } from "@/models/auth";
import Cookies from "js-cookie";
import axios from "axios";

export class AuthHandler {
  handleLoginValidation(formData: LoginAuth) {
    const emailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    const checkEmail = emailPattern.test(formData.email);

    if (formData.email === "" || formData.password === "" || !checkEmail) {
      return true;
    } else {
      return false;
    }
  }

  handleRegistrationValidation(formData: RegisterForm) {
    const emailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    const checkEmail = emailPattern.test(formData.email);
    console.log(formData.password.length);

    if (
      formData.email === "" ||
      formData.password === "" ||
      formData.password.length < 6 ||
      formData.name === "" ||
      !checkEmail
    ) {
      return true;
    } else {
      return false;
    }
  }

  async handleSubmitData(formData: LoginAuth) {
    try {
      const response = await axios.post("/api/auth/login-user", {
        email: formData.email,
        password: formData.password,
      });
      const data = response.data;

      // Wheen the response is valid set cookies for access_token and refresh token
      if (response.status === 200) {
        const in60Minutes = 60 / (24 * 60);

        console.log(data);
        Cookies.set("access_token", data.data.access_token, {
          expires: in60Minutes,
        });
        Cookies.set("refresh_token", data.data.refresh_token, {
          expires: 7,
        });
        return response;
      } else {
        return response;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async handleRegistrationUser(formData: RegisterForm) {
    try {
      const response = await axios.post("/api/auth/register-user", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: "user",
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  }
}
