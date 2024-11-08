import { Request, Response } from "express";
import { BookingEventService } from "../../services/user.services/bookingEvent.service";
import {
  BookingData,
  BookingServiceCode,
} from "../../models/booking.interface";
import { AuthUtils } from "../../utils/auth.utils";

export class BookingEventController {
  private bookingEventService: BookingEventService;
  private authUtils: AuthUtils;

  constructor() {
    this.bookingEventService = new BookingEventService();
    this.authUtils = new AuthUtils();
  }

  async getUsersBooking(req: Request, res: Response) {
    // Decoded Token
    const decodedToken = await this.authUtils.getAuthenticatedUser(req);

    if (decodedToken) {
      try {
        const bookingData = await this.bookingEventService.getUserbookings(
          decodedToken.user_id
        );
        res.status(200).send({
          message: "User booking retrieved successfully",
          status: res.statusCode,
          data: bookingData,
        });
      } catch (error) {
        console.log(error);
      }
    }
  }

  async createBookingEvent(req: Request, res: Response) {
    // Decoded Token
    const decodedToken = await this.authUtils.getAuthenticatedUser(req);

    if (decodedToken) {
      const {
        event_id,
        is_discount,
        usePoint,
        payment_ammount,
        payment_method,
      }: BookingData = req.body;

      const bookingData: BookingData = {
        event_id: event_id,
        is_discount: is_discount,
        usePoint: usePoint || 0,
        payment_ammount: payment_ammount,
        payment_method: payment_method,
        user_id: decodedToken.user_id,
      };

      try {
        const bookingEvent =
          await this.bookingEventService.createBookingEvent(bookingData);

        if (bookingEvent.code === BookingServiceCode.BookingCreated) {
          res.status(201).send({
            message: "Booking event successfully created",
            data: bookingEvent.newBooking,
            status: res.statusCode,
          });
        } else if (
          // Close Registration
          bookingEvent.code === BookingServiceCode.RegistarationClose
        ) {
          res.status(403).send({
            message: "Registration is closed",
            status: res.statusCode,
          });
        } else if (
          // Quota is full
          bookingEvent.code === BookingServiceCode.NAQuoata
        ) {
          res.status(404).send({
            message: "Event is full",
            status: res.statusCode,
          });
        } else if (
          // Status transaction still waiting payment
          bookingEvent.code === BookingServiceCode.WaitingForPayment
        ) {
          res.status(403).send({
            message:
              "User already booking this event but still waiting for payment, complete it or cancel it to book this event again",
            status: res.statusCode,
          });
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      res
        .status(401)
        .send({ message: "Invalid token", status: res.statusCode });
    }
  }

  async updateStatusToPaid(req: Request, res: Response) {
    // Decoded Token
    const decodedToken = await this.authUtils.getAuthenticatedUser(req);

    if (decodedToken) {
      const { transaction_id } = req.params;
      const user_id = decodedToken.user_id;

      try {
        const updateStatus = await this.bookingEventService.updateStatusToPaid(
          Number(transaction_id),
          user_id
        );

        if (updateStatus?.status === BookingServiceCode.UpdateToPaid) {
          res.status(200).send({
            message: updateStatus.message,
            status: res.statusCode,
          });
        } else if (
          // No transaction is found
          updateStatus?.status === BookingServiceCode.NoTransactionFound
        ) {
          res.status(404).send({
            message: updateStatus.message,
            status: res.statusCode,
          });
        } else if (
          // User is not authorized to update the transaction (user id in transaction is not the same in the token)
          updateStatus?.status === BookingServiceCode.Unauthorized
        ) {
          res.status(403).send({
            message: updateStatus.message,
            status: res.statusCode,
          });
        } else {
          res.status(500).send({
            message: "Failed to update status to paid",
            status: res.statusCode,
          });
        }
      } catch (error) {
        console.log(error);
        res.status(500).send({
          message: "Failed to update status to paid",
          status: res.statusCode,
        });
      }
    } else {
      res
        .status(401)
        .send({ message: "Invalid token", status: res.statusCode });
    }
  }

  async cancelBooking(req: Request, res: Response) {
    // Decoded Token
    const decodedToken = await this.authUtils.getAuthenticatedUser(req);

    if (decodedToken) {
      const { transaction_id } = req.params;
      const user_id = decodedToken.user_id;

      try {
        const updateStatus = await this.bookingEventService.cancelBooking(
          Number(transaction_id),
          user_id
        );
        if (updateStatus?.status === BookingServiceCode.UpdateToCanceled) {
          res.status(200).send({
            message: updateStatus.message,
            status: res.statusCode,
          });
        } else if (
          updateStatus?.status === BookingServiceCode.NoTransactionFound
        ) {
          res.status(404).send({
            message: updateStatus.message,
            status: res.statusCode,
          });
        } else if (updateStatus?.status === BookingServiceCode.Unauthorized) {
          res.status(403).send({
            message: updateStatus.message,
            status: res.statusCode,
          });
        }
      } catch (error) {}
    }
  }
}
