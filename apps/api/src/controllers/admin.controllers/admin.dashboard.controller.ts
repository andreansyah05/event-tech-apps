import { Request, Response } from "express";
import { AdminDashboardService } from "../../services/admin.services/admin.dashboard.service";

export class AdminDashboardController {
  private adminService: AdminDashboardService;
  constructor() {
    this.adminService = new AdminDashboardService();
  }
  // Metode asinkron 'getUserCount' yang menerima request (req) dan response (res) dari Express
  async getUserCount(req: Request, res: Response) {
    const userCount = await this.adminService.getUserCount();
    if (userCount) {
      res.status(200).send(userCount);
    } else {
      res.status(500).send({ message: "Error fetching user count" });
    }
  }

  // Metode asinkron 'getAnalyticMonthlyRegistration' yang menerima request (req) dan response (res) dari Express
  async getAnalyticMonthlyRegistration(req: Request, res: Response) {
    const monthlyRegistration =
      await this.adminService.getAnlyticMontlyhRegister();
    if (monthlyRegistration) {
      res.status(200).send(monthlyRegistration);
    } else {
      res.status(500).send({
        data: monthlyRegistration,
        detail: res.statusMessage,
        message: "Error fetching monthly registration",
      });
    }
  }

  // Metode asinkron 'getTotalTransaction' yang menerima request (req) dan response (res) dari Express
  async getTotalTransaction(req: Request, res: Response) {
    const totalTransaction = await this.adminService.getTotalTransaction();
    if (totalTransaction) {
      res.status(200).send({
        data: totalTransaction,
      });
    } else {
      res.status(500).send({ message: "Error fetching total transaction" });
    }
  }

  async getTotalTransactionValue(req: Request, res: Response) {
    const totalTransactionValue =
      await this.adminService.getTotalTransactionValue();
    if (totalTransactionValue) {
      res.status(200).send(totalTransactionValue);
    } else {
      res
        .status(500)
        .send({ message: "Error fetching total transaction value" });
    }
  }

  // Metode asinkron 'getTotalListEvents' yang menerima request (req) dan response (res) dari Express
  async getTotalListEvents(req: Request, res: Response) {
    const totalEvents = await this.adminService.getTotalListEvents();
    if (totalEvents) {
      res.status(200).send(totalEvents);
    } else {
      res.status(500).send({ message: "Error fetching total events" });
    }
  }
  // Metode asinkron 'getMonthlyTransaction' yang menerima request (req) dan response (res) dari Express
  async getMonthlyTransaction(req: Request, res: Response) {
    const monthlyTransaction = await this.adminService.getAnlyticTransaction();
    if (monthlyTransaction) {
      res.status(200).send(monthlyTransaction);
    } else {
      res.status(500).send({ message: "Error fetching monthly transaction" });
    }
  }
}
