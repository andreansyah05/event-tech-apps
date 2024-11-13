export interface BookingData {
  user_id: number;
  is_paid: boolean;
  event_id: number;
  usePoint: number;
  payment_method: "QRIS" | "bank bca" | "bca_virtual account";
}

export enum BookingStatus {
  Canceled = "Canceled",
  WaitingForPayment = "Waiting Payment",
  Paid = "Paid",
  Completed = "Completed",
}

export enum BookingServiceCode {
  TransactionAvailable = "TA",
  BookingCreated = "BC",
  NAQuoata = "NAQ",
  RegistarationClose = "RC",
  WaitingForPayment = "WFP",
  NoTransactionFound = "NOF",
  UpdateToPaid = "UP",
  UpdateToCanceled = "UC",
  Unauthorized = "UT",
  FreeEvent = "FREE",
  NotEnoughPoint = "NEP",
}
