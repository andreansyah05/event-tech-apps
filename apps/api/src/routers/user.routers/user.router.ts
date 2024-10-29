import { Router } from "express";
import { UserController } from "../../controllers/user.controller/user.controller";

const router = Router();
const userController = new UserController();

router.get("/events", userController.getAllEvents.bind(userController));
// router.get("/events/:category", userController.getEventCategory.bind(userController));
router.get("/events/:id", userController.getEventById.bind(userController));

export default router;