import { Router } from "express";
import { AdminController } from "../../controllers/admin.controllers/admin.event.controller";
import { AdminListUser } from "../../controllers/admin.controllers/admin.list.user.controller";
import { EventAdminMiddleware } from "../../middlewares/admin.middleware/event.middleware";
import { AuthMiddleware } from "../../middlewares/user.middleware/auth.middleware";
import upload from "../../middlewares/upload.middleware";

const router = Router();
const authMiddleware = new AuthMiddleware();
const eventAdminMiddleware = new EventAdminMiddleware();
const adminListUser = new AdminListUser();
const adminController = new AdminController();

router.get("/events", adminController.getAllEvents.bind(adminController));

router.get("/events/:id", adminController.getEventById.bind(adminController));

router.get("/list-users", adminListUser.getAllUsers.bind(adminListUser));

router.post(
  "/events",
  upload.single("event_image"),
  eventAdminMiddleware.validateCreateEventInput.bind(eventAdminMiddleware),
  adminController.createEvent.bind(adminController)
);

router.put(
  "/events/:id",
  upload.single("event_image"),
  eventAdminMiddleware.validateEventUpdateInput.bind(eventAdminMiddleware),
  adminController.updateEvent.bind(adminController)
);

router.delete("/events/:id", adminController.deleteEvent.bind(adminController));

router.get(
  "/events-search",
  adminController.getEventBySearch.bind(adminController)
);

export default router;
