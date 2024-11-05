import { Request, Response, NextFunction } from "express";
import { AuthProps } from "../../models/user.interface";
import jwt from "jsonwebtoken";
import environment from "dotenv";
import { TokenPayloadProps } from "../../models/user.interface";

environment.config();
const SECRET_KEY = process.env.SECRET_KEY as string;
const JWT_SECRET = process.env.JWT_SECRET as string;

export class AuthMiddleware {
  async validateLogin() {
    // Middleware will be use to check login input
  }
  async validateRegisterInput(req: Request, res: Response, next: NextFunction) {
    // Middleware will be use to check register input
    const { email, name, password, role }: AuthProps = req.body;
    if (!email || !name || !password || !role) {
      console.log("Fields : ", req.body);
      res.status(400).send({
        status: res.statusCode,
        code: "REQ",
        message: "All fields are required",
        field: {
          email: email || "",
          password: password || "",
          name: name || "",
          role: role || "",
        },
      });
    } else {
      next();
    }
  }

  async validateToken(req: Request, res: Response, next: NextFunction) {
    // To check, to access to the router they need a token
    // 1. Get the user token from the header
    // 2. Check if the toke is available or not --> if not retun required token
    // 3. else next

    const token = req.headers.authorization?.split(" ")[1] as string;

    if (!token) {
      res.status(401).send({
        status: res.statusCode,
        message: "Token is required",
      });
    }
    // We already get the token and we need to verify the token
    jwt.verify(token, JWT_SECRET, (err, user) => {
      if (err) {
        res.status(401).send({
          status: res.statusCode,
          message: "Access denied. Invalid token.",
        });
      } else {
        (req as any).user = user;
        next();
      }
    });
  }

  async authorizeRole(role: "admin" | "user") {
    return (req: Request, res: Response, next: NextFunction) => {
      const token = req.headers.authorization as string;
      const decodeToken = jwt.verify(token, SECRET_KEY) as TokenPayloadProps;

      //   Check the active token role with the role that assign to the router
      if (decodeToken.role !== role) {
        res.status(403).send({
          status: res.statusCode,
          message: "Unauthorized",
        });
      } else {
        next();
      }
    };
  }
}
