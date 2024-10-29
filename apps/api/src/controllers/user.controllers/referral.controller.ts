import { Request, Response } from "express";
import { ReferralService } from "../../services/user.services/referral.service";

export class ReferralContoller {
  private referralService: ReferralService;

  constructor() {
    this.referralService = new ReferralService();
  }
  async useReferral(req: Request, res: Response) {
    const token = req.headers.authorization?.split(" ")[1] as string;
    console.log("Token:", token);
    const { referral_code } = req.params;
    const response = await this.referralService.useReferral(
      referral_code,
      token
    );
    if (response.status === 200) {
      res.status(200).send({
        message: "Referral code used successfully",
        status: res.statusCode,
      });
    } else {
      res.status(401).send({
        message: "Invalid referral code or token",
        detailMessage: response.message,
        status: res.statusCode,
      });
    }
  }
}
