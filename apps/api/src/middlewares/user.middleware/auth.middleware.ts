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

  validateToken(req: Request, res: Response, next: NextFunction) {
    // To check, to access to the router they need a token
    // 1. Get the user token from the header
    // 2. Check if the toke is available or not --> if not retun required token
    // 3. else next
    try {
      const token = req.headers.authorization?.split(" ")[1] as string;

      if (!token) {
        res.status(401).send({
          status: res.statusCode,
          message: "Token is required",
        });
      }

      const decodeToken = jwt.verify(token, SECRET_KEY) as TokenPayloadProps;
      (req as any).user = decodeToken;
      next();
    } catch (error) {
      console.error(error);
      res.status(401).send({ message: "Invalid token" });
    }

    // We already get the token and we need to verify the token
  }

  authorizeRole(role: "admin" | "user"): any {
    return (req: Request, res: Response, next: NextFunction) => {
      try {
        const token = req.headers.authorization?.split(" ")[1] as string;
        const decodeToken = jwt.verify(token, SECRET_KEY) as TokenPayloadProps;

        console.log("middleware decodetoken:", decodeToken);

        //   Check the active token role with the role that assign to the router
        if (decodeToken.user_role !== role) {
          res.status(403).send({
            status: res.statusCode,
            message: "Unauthorized",
          });
        } else {
          next();
        }
      } catch (error) {
        console.log(error);
        res.status(401).send({
          status: res.statusCode,
          message: "Invalid Token",
        });
      }
    };
  }
}
