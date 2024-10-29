import { Router } from "express";
import { ReferralContoller } from "../../controllers/user.controllers/referral.controller";

const router = Router();
const referralController = new ReferralContoller();

router.put(
  "/use-referral/:referral_code",
  referralController.useReferral.bind(referralController)
);

export default router;
