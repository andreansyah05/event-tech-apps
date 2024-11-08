export interface BookingData {
  user_id: number;
  event_id: number;
  usePoint: number;
  payment_ammount: number;
  payment_method: "QRIS" | "bank bca" | "bca_virtual account";
  is_discount: boolean;
}

export enum BookingStatus {
  Canceled = "Canceled",
  WaitingForPayment = "Waiting Payment",
  Paid = "Paid",
  Completed = "Completed",
}

export enum BookingServiceCode {
  BookingCreated = "BC",
  NAQuoata = "NAQ",
  RegistarationClose = "RC",
  WaitingForPayment = "WFP",
  NoTransactionFound = "NOF",
  UpdateToPaid = "UP",
  UpdateToCanceled = "UC",
  Unauthorized = "UT",
}
