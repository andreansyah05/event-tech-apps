import { Request, Response } from "express";
import { UserService } from "../../services/user.services/event.service";

export class UserController {
  private userService: UserService;
  constructor() {
    this.userService = new UserService();
  }

  async getAllEvents(req: Request, res: Response) {
    const getEvents = await this.userService.getAllEvents();
    if (getEvents) {
      res.status(200).send({
        data: getEvents,
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

  // async getEventCategory(req: Request, res: Response) {
  //     const search = req.query.search as string;
  //     const category_name = req.query.category as string;
  //     const sortBy = req.query.sortBy as 'event_price' | 'event_start_date';
  //     const sortOrder = req.query.sortOrder as 'asc' | 'desc';

  //     const events = await this.userService.getEventCategory(search, category_name, sortBy, sortOrder);
  //     if (events) {
  //         res.status(200).send({
  //             data: events,
  //             status: res.statusCode,
  //         });
  //     } else {
  //         res.status(404).send({
  //             message: "Failed to fetch events",
  //             status: res.statusCode,
  //             details: res.statusMessage,
  //         });
  //     }
  // }
  async getEventById(req: Request, res: Response) {
    const id = Number(req.params.id);
    const event = await this.userService.getEventById(id);
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
      });
    }
  }

  async getEventBySearch(req: Request, res: Response) {
    const searchString = req.query.search as string;
    const events = await this.userService.getEventBySearch(searchString);
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
}
