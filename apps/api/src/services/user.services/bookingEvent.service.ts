import {
  BookingData,
  BookingStatus,
  BookingServiceCode,
} from "../../models/booking.interface";
import { PrismaClient } from "@prisma/client";

export class BookingEventService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async getUserbookings(user_id: number) {
    // 1. Check if user exist
    const bookings = await this.prisma.users.findUnique({
      where: { user_id: user_id },
      include: {
        transaction: true,
      },
    });
    if (!bookings) {
      throw new Error("User not found");
    } else {
      return bookings.transaction;
    }

    // // 2. Get all booking records that related to the user
    // const bookings = await this.prisma.users.findUnique({
    //   where: {
    //     user_id: user_id,
    //   },
    //   include: {
    //     transaction: true,
    //   },
    // });
  }

  async createBookingEvent(bookingData: BookingData) {
    // 1. Make sure the user that booking is exist
    // 2. Make sure the event that user booking is exist
    // 3. Check if the event is still have quota and its stil able to registration (start data)
    // 4. Create a new booking record in the database
    // 5. Decrease the quota of the event
    // 6. Return the booking status and service code

    // 1. Check if user exist
    const user = await this.prisma.users.findUnique({
      where: { user_id: bookingData.user_id },
    });
    if (!user) {
      throw new Error("User not found");
    }

    // 2. Check if event exist
    const event = await this.prisma.event.findUnique({
      where: {
        event_id: bookingData.event_id,
      },
    });
    if (!event) {
      throw new Error("Event not found");
    }

    // Check are the user already joined to the event
    // 1. if the status of transaction is pending user not able to join
    // 2. If the status transaction already failed user able to apply again

    try {
      const checkUserJoined = await this.prisma.transaction.findFirst({
        where: {
          AND: [
            {
              eventId: {
                equals: bookingData.event_id,
              },
            },
            {
              userId: {
                equals: bookingData.user_id,
              },
            },
          ],
        },
      });

      if (checkUserJoined) {
        console.log("Checked", checkUserJoined);
        console.log("Checked status", checkUserJoined.status_order);
        console.log("enum:", BookingStatus.WaitingForPayment);
        if (checkUserJoined.status_order === BookingStatus.WaitingForPayment) {
          console.log("execute");
          return {
            code: BookingServiceCode.WaitingForPayment,
            message: "User already joined to the event but not yet paid",
          };
        }
      }
    } catch (error) {
      console.log(error);
    }

    // 3. Check if event is still have quota and its still able to registration
    const eventStartDate = new Date(event.event_start_date);
    const currentDate = new Date();

    if (currentDate > eventStartDate) {
      return {
        code: BookingServiceCode.RegistarationClose,
        message: "Registration close",
      };
    }

    if (event.event_capacity === 0) {
      return {
        code: BookingServiceCode.NAQuoata,
        message: "Event is full",
      };
    }

    // 4. Create a new booking record in the database

    const newBooking = await this.prisma.transaction.create({
      data: {
        userId: bookingData.user_id,
        eventId: bookingData.event_id,
        usePoint: bookingData.usePoint,
        payment_ammount:
          bookingData.usePoint === 0
            ? bookingData.payment_ammount
            : bookingData.payment_ammount - bookingData.usePoint,
        payment_method: bookingData.payment_method,
        is_Discount: bookingData.is_discount,
        status_order: BookingStatus.WaitingForPayment,
        order_date: currentDate,
      },
    });

    // 5. Decrease the quota of the event
    await this.prisma.event.update({
      where: {
        event_id: bookingData.event_id,
      },
      data: {
        event_capacity: {
          decrement: 1,
        },
      },
    });

    // 5. Decrement the user point if the book use point
    if (bookingData.usePoint !== 0) {
      await this.prisma.users.update({
        where: {
          user_id: bookingData.user_id,
        },
        data: {
          points: {
            decrement: bookingData.usePoint,
          },
        },
      });
    }

    return {
      code: BookingServiceCode.BookingCreated,
      newBooking,
    };
  }

  async updateStatusToPaid(transaction_id: number, user_id: number) {
    // 1.Make sure the transaction is exist in Database
    // 2. Make sure the user of the request own the transaction
    // 3. Update the status of transaction to paid

    const transaction = await this.prisma.transaction.findUnique({
      where: {
        transaction_id: transaction_id,
      },
    });
    if (!transaction) {
      return {
        status: BookingServiceCode.NoTransactionFound,
        message: "Transaction not found",
      };
    } else if (transaction.userId !== user_id) {
      return {
        status: BookingServiceCode.Unauthorized,
        message: "User not authorized to update this transaction",
      };
    } else if (transaction.status_order !== BookingStatus.WaitingForPayment) {
      return {
        status: BookingServiceCode.NoTransactionFound,
        message: "Transaction status is not waiting for payment",
      };
    }

    try {
      const updateTransaction = await this.prisma.transaction.update({
        where: {
          transaction_id: transaction_id,
        },
        data: {
          status_order: BookingStatus.Paid,
        },
      });
      return {
        data: updateTransaction,
        status: BookingServiceCode.UpdateToPaid,
        message: "Transaction updated to paid",
      };
    } catch (error) {
      console.log(error);
    }
  }

  async cancelBooking(transaction_id: number, user_id: number) {
    // 1.Make sure the transaction is exist in Database
    // 2. Make sure the user of the request own the transaction
    // 3. Update the status of transaction to paid

    const transaction = await this.prisma.transaction.findUnique({
      where: {
        transaction_id: transaction_id,
      },
    });
    if (!transaction) {
      return {
        status: BookingServiceCode.NoTransactionFound,
        message: "Transaction not found",
      };
    } else if (transaction.userId !== user_id) {
      return {
        status: BookingServiceCode.Unauthorized,
        message: "User not authorized to update this transaction",
      };
    } else if (
      transaction.status_order === BookingStatus.Paid ||
      transaction.status_order === BookingStatus.Completed
    ) {
      return {
        status: BookingServiceCode.NoTransactionFound,
        message:
          "Transaction with status paid or completed or cancelled cannot be cancelled",
      };
    } else if (transaction.status_order === BookingStatus.Canceled) {
      return {
        status: BookingServiceCode.NoTransactionFound,
        message: "This transaction already cancel",
      };
    }

    try {
      const updateTransaction = await this.prisma.transaction.update({
        where: {
          transaction_id: transaction_id,
        },
        data: {
          status_order: BookingStatus.Canceled,
          Event: {
            update: {
              event_capacity: {
                increment: 1,
              },
            },
          },
          Users: {
            update: {
              points: {
                increment:
                  transaction.usePoint === 0 ? 0 : transaction.usePoint,
              },
            },
          },
        },
        include: {
          Event: true,
          Users: true,
        },
      });

      return {
        data: updateTransaction,
        status: BookingServiceCode.UpdateToCanceled,
        message: "Transaction updated to canceled",
      };
    } catch (error) {
      console.log(error);
    }
  }
}
