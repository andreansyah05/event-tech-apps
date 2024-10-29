import { Router } from "express";
import { AuthController } from "../../controllers/user.controllers/auth.controller";
import { AuthMiddleware } from "../../middlewares/user.middleware/auth.middleware";

const router = Router();
const authController = new AuthController();
const authMiddleware = new AuthMiddleware();
// Init router
router.post(
  "/register-user",
  authMiddleware.validateRegisterInput.bind(authMiddleware),
  authController.registerUser.bind(authController)
);
router.post("/login-user", authController.loginUser.bind(authController));
router.put(
  "/update-token",
  authController.refreshAccessToken.bind(authController)
);
router.put(
  "/logout-user/:user_id",
  authController.logoutUser.bind(authController)
);

export default router;
