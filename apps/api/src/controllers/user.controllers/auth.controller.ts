import { Request, Response } from "express";

import { AuthService } from "../../services/user.services/auth.service";

export class AuthController {
  private authService: AuthService;
  constructor() {
    this.authService = new AuthService();
  }

  async registerUser(req: Request, res: Response) {
    const response = await this.authService.registerUser(req.body);
    console.log("Resp:", response);
    if (response.status === 201) {
      res.status(201).send({
        message: "User registered successfully",
        data: response.data,
        status: res.statusCode,
      });
    } else {
      res.status(400).send({
        message: "Failed to register user",
        details: response.message,
        data: response.data,
        status: res.statusCode,
      });
    }
  }

  async loginUser(req: Request, res: Response) {
    const { email, password } = req.body;
    const response = await this.authService.loginUser(email, password);
    if (response.status === 200) {
      res.status(200).send({
        message: "User logged in successfully",
        data: {
          user: response.data?.user,
          access_token: response.data?.access_token,
          refresh_token: response.data?.refresh_token,
        },
        status: res.statusCode,
      });
    } else {
      res.status(401).send({
        message: "Invalid email or password",
        detail: response.message,
        data: response.data?.user,
        status: res.statusCode,
      });
    }
  }

  async refreshAccessToken(req: Request, res: Response) {
    const { refresh_token } = req.body;
    const response = await this.authService.refreshAccessToken(refresh_token);
    if (response) {
      res.status(200).send({
        message: "Access token refreshed successfully",
        data: response,
        status: res.statusCode,
      });
    } else {
      res.status(401).send({
        message: "Invalid refresh token",
        data: response,
        status: res.statusCode,
      });
    }
  }

  async logoutUser(req: Request, res: Response) {
    const user_id = Number(req.params.user_id);
    const response = await this.authService.logoutUser(user_id);
    if (response.status === 200) {
      res.status(200).send({
        message: "User logged out successfully",
        status: res.statusCode,
      });
    } else {
      res.status(404).send({
        message: "Failed to log out user",
        status: res.statusCode,
      });
    }
  }
}