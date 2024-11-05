import { LoginAuth, RegisterForm } from "@/models/models";
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

        Cookies.set("access_token", data.data.access_token, {
          expires: in60Minutes,
        });
        Cookies.set("refresh_token", data.data.user.refresh_token, {
          expires: 7,
        });
        return data;
      } else {
        return data;
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
      console.log(error);
    }
  }
}
