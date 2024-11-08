import { Router } from "express";
import { BookingEventController } from "../../controllers/user.controllers/bookingEvent.controller";
import { AuthMiddleware } from "../../middlewares/user.middleware/auth.middleware";

const router = Router();
const bookingEventController = new BookingEventController();
const authMiddleware = new AuthMiddleware();

router.get(
  "/get-bookings",
  authMiddleware.validateToken.bind(authMiddleware),
  authMiddleware.authorizeRole("user").bind(authMiddleware),
  bookingEventController.getUsersBooking.bind(bookingEventController)
);
router.post(
  "/book-events",
  authMiddleware.validateToken.bind(authMiddleware),
  authMiddleware.authorizeRole("user").bind(authMiddleware),
  bookingEventController.createBookingEvent.bind(bookingEventController)
);
router.put(
  "/update-status/paid/:transaction_id",
  authMiddleware.validateToken.bind(authMiddleware),
  authMiddleware.authorizeRole("user").bind(authMiddleware),
  bookingEventController.updateStatusToPaid.bind(bookingEventController)
);
router.put(
  "/update-status/cancel/:transaction_id",
  authMiddleware.validateToken.bind(authMiddleware),
  authMiddleware.authorizeRole("user").bind(authMiddleware),
  bookingEventController.cancelBooking.bind(bookingEventController)
);

export default router;
