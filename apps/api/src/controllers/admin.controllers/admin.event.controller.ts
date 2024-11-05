import { Request, Response } from "express";
import { AdminService } from "../../services/admin.services/admin.event.service";

export class AdminController {
  private adminService: AdminService;
  constructor() {
    this.adminService = new AdminService();
  }

  async getAllEvents(req: Request, res: Response) {
    const events = await this.adminService.getAllEvents();
    if (events) {
      res.status(200).send({
        data: events,
        status: res.statusCode,
      });
    } else {
      res.status(404).send({
        message: "Failed to fetch events",
        status: res.statusCode,
        details: res.statusMessage,
      });
    }
  }

  async getEventById(req: Request, res: Response) {
    const id = Number(req.params.id);
    const event = await this.adminService.getEventById(id);
    if (event) {
      res.status(200).send({
        message: `Event with id ${id} retrieved successfully`,
        status: res.statusCode,
        data: event,
      });
    } else {
      res.status(404).send({
        message: `Event id ${id} not found`,
        status: res.statusCode,
        details: res.statusMessage,
      });
    }
  }

  async createEvent(req: Request, res: Response) {
    const eventData = req.body.data;

    const discountPercentage = Number(req.body.discountPercentage);
    const is_active = Boolean(req.body.is_active);
    const createdEvent = await this.adminService.createEvent(
      eventData,
      discountPercentage,
      is_active
    );
    if (createdEvent) {
      res.status(201).send({
        message: "Event created successfully",
        status: res.statusCode,
        data: createdEvent,
      });
    } else {
      res.status(400).send({
        message: "Failed to create event",
        status: res.statusCode,
        details: res.statusMessage,
      });
    }
  }

  async updateEvent(req: Request, res: Response) {
    const id = Number(req.params.id);
    const discount_id = Number(req.body.discount_id);
    const updatedEventData = req.body.data;
    const discountPercentage = Number(req.body.discountPercentage);
    const is_active = Boolean(req.body.is_active);
    const updatedEvent = await this.adminService.updateEvent(
      id,
      discount_id,
      updatedEventData,
      discountPercentage,
      is_active
    );
    if (updatedEvent) {
      res.status(200).send({
        message: "Event updated successfully",
        status: res.statusCode,
        data: updatedEvent,
      });
    } else {
      res.status(404).send({
        message: `Event id ${id} not found`,
        status: res.statusCode,
        details: res.statusMessage,
      });
    }
  }

  async deleteEvent(req: Request, res: Response) {
    const id = Number(req.params.id);
    console.log("kok missing teerus anjing :", id);
    const deletedEvent = await this.adminService.deleteEvent(id);
    if (deletedEvent) {
      res.status(200).send({
        message: "Event deleted successfully",
        status: res.statusCode,
        data: deletedEvent,
      });
    } else {
      res.status(404).send({
        message: `Event id ${id} not found`,
        status: res.statusCode,
        details: res.statusMessage,
      });
    }
  }

  // async CreateDiscountPromo (req: Request, res: Response) {
  //     const eventId = Number (req.params.eventId)
  //     const discountPercentage = Number (req.body.discountPercentage)
  //     const createdPromo = await this.adminService.CreateDiscountPromo(eventId, discountPercentage)
  //     if (createdPromo) {
  //         res.status(201).send ({
  //             message: "Discount Promo created successfully",
  //             status: res.statusCode,
  //             data: createdPromo,
  //         })
  //     } else {
  //         res.status(400).send ({
  //             message: "Failed to create discount promo",
  //             status: res.statusCode,
  //         })
  //     }

  // }
}
