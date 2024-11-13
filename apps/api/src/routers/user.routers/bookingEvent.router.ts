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
router.get(
  "/get-bookings/:transaction_id",
  authMiddleware.validateToken.bind(authMiddleware),
  authMiddleware.authorizeRole("user").bind(authMiddleware),
  bookingEventController.getDetailUserBooking.bind(bookingEventController)
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

// Berhubungan dengan admin
// 1. Lakukan validasi token terlebih dahulu
// 2. apabila validasi token berhasil maka cek role dari user yang didapat dari token.
// 3. Apabila validasi role berhasil maka cek req body (input) pastikan data req tidak ada yang kosong <-- Create dan update
// 4. Apabila validasi input berhasil maka lanjut ke controller masing-masig function

export default router;
