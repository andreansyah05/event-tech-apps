import { Request, Response } from "express";
import { AdminService } from "../../services/admin.services/admin.event.service";
import { CreateEvent, Discount, Event } from "../../models/admin.interface";

export class AdminController {
  private adminService: AdminService;
  getListUsers: any;
  constructor() {
    this.adminService = new AdminService();
  }

  async getAllEvents(req: Request, res: Response) {
    // Mengambil semua event dari adminService
    const events = await this.adminService.getAllEvents();
    if (events) {
      // Jika event berhasil diambil, kirim respon dengan status 200
      res.status(200).send({
        data: events, // Menyertakan data event dalam respon
        status: res.statusCode, // Menyertakan status kode dari respon
      });
    } else {
      // Jika tidak ada event ditemukan, kirim respon dengan status 404
      res.status(404).send({
        message: "Failed to fetch events", // Pesan error
        status: res.statusCode, // Menyertakan status kode dari respon
        details: res.statusMessage, // Menyertakan pesan status
      });
    }
  }

  async getEventById(req: Request, res: Response) {
    const id = Number(req.params.id); // Mengambil ID dari parameter URL dan mengonversinya ke Number
    console.log("test id:", id);
    const event = await this.adminService.getEventById(Number(id)); // Mengambil event berdasarkan ID
    if (event) {
      // Jika event ditemukan, kirim respon dengan status 200
      res.status(200).send({
        message: `Event with id ${id} retrieved successfully`, // Pesan sukses
        status: res.statusCode, // Menyertakan status kode dari respon
        data: event, // Menyertakan data event dalam respon
      });
    } else {
      // Jika event tidak ditemukan, kirim respon dengan status 404
      res.status(404).send({
        message: `Event id ${id} not found`, // Pesan error
        status: res.statusCode, // Menyertakan status kode dari respon
        details: res.statusMessage, // Menyertakan pesan status
      });
    }
  }

  async createEvent(req: Request, res: Response) {
    console.log("req create:", req);
    try {
      const {
        categoryId,
        category_name,
        discount_percentage,
        event_capacity,
        event_description,
        event_end_date,
        event_image,
        event_location,
        event_name,
        event_price,
        event_start_date,
        is_active,
        is_online,
        is_paid,
        discounted_price,
      }: CreateEvent = req.body;
      console.log(req.body);

      const discountData: Discount = {
        discount_percentage: discount_percentage, // Persentase diskon
        is_active: is_active === "true" ? true : false,
      };

      // untuk mengambil image sebagai file
      const image = (req as any).file?.path || "";
      console.log("Event Image", image);

      const updateEventData: Event = {
        event_name: event_name,
        categoryId: categoryId,
        event_description: event_description, // Deskripsi
        event_price: event_price, // Harga acara
        event_location: event_location, // Lokasi acara
        event_capacity: event_capacity, // Kapasitas acara
        event_start_date: new Date(event_start_date), // Tanggal dan waktu mulai acara
        event_end_date: new Date(event_end_date), // Tanggal dan waktu selesai acara
        is_active: is_active === "true" ? true : false,
        is_online: is_online === "true" ? true : false, // Apakah acara ini online
        is_paid: is_paid === "true" ? true : false, // Apakah acara ini bayar atau gratis
        event_image: image, // Gambar acara
      };
      console.log("updated", updateEventData);
      console.log("discount data", discountData);

      const createdEvent = await this.adminService.createEvent(
        updateEventData,
        discountData
      ); // Membuat event baru
      if (createdEvent) {
        // Jika event berhasil dibuat, kirim respon dengan status 201
        res.status(201).send({
          message: "Event created successfully", // Pesan sukses
          status: res.statusCode, // Menyertakan status kode dari respon
          data: createdEvent, // Menyertakan data event yang baru dibuat
        });
      }
    } catch (error) {
      console.log(error);
      res.status(400).send({
        message: "Failed to create event", // Pesan error
        status: res.statusCode, // Menyertakan status kode dari respon
        details: res.statusMessage, // Menyertakan pesan status
      });
    }
  }
  // Fungsi untuk menangani request update event
  async updateEvent(req: Request, res: Response) {
    console.log("ini adakah req :", req);
    try {
      // Mengambil event_id dari parameter URL
      const event_id = Number(req.params.id); // Mendapatkan event_id dari URL

      // Mengambil data dari request body
      const {
        categoryId,
        category_name,
        discount_percentage,
        event_capacity,
        event_description,
        event_end_date,
        event_image,
        event_location,
        event_name,
        event_price,
        event_start_date,
        is_active,
        is_online,
        is_paid,
        discountId,
      }: CreateEvent = req.body;

      console.log("ini reqbody guys:", req.body);

      // Menyediakan file image jika ada
      const image = (req as any).file?.path || ""; // Mengambil path image yang diupload
      console.log("Event Image", image);

      // Menyiapkan data untuk update event
      const updateEventData: Event = {
        event_name: event_name,
        categoryId: categoryId,
        event_description: event_description,
        event_price: event_price,
        event_location: event_location,
        event_capacity: event_capacity,
        event_start_date: new Date(event_start_date), // Konversi ke tipe Date
        event_end_date: new Date(event_end_date), // Konversi ke tipe Date
        is_online: is_online === "true" ? true : false,
        is_paid: is_paid === "true" ? true : false,
        event_image: image,
      };

      console.log("Updated Event Data:", updateEventData);
      console.log("Discount percentage:", discount_percentage); // Log untuk debugging, menampilkan persentase diskon

      // Panggil service untuk memperbarui event dan diskon
      const updatedEvent = await this.adminService.updateEvent(
        event_id, // event_id dari parameter URL
        Number(discountId), // discount_id dari parameter URL
        updateEventData, // Data event yang akan diperbarui
        Number(discount_percentage), // Persentase diskon
        is_active ? true : false // Status aktif diskon
      );

      // Jika event berhasil diperbarui, kirim response
      if (updatedEvent) {
        res.status(200).send({
          message: "Event updated successfully",
          status: res.statusCode,
          data: updatedEvent, // Mengembalikan data event yang telah diperbarui
        });
      } else {
        res.status(404).send({
          message: `Event with ID ${event_id} not found.`,
          status: res.statusCode,
        });
      }
    } catch (error) {
      console.log(error);
      res.status(400).send({
        message: "Failed to update event",
        status: res.statusCode,
        details: res.statusMessage,
      });
    }
  }

  async deleteEvent(req: Request, res: Response) {
    const id = Number(req.params.id); // Mengambil ID dari parameter URL dan mengonversinya ke Number
    console.log("kok missing teerus anjing :", id); // Log untuk debugging, menampilkan ID event yang akan dihapus

    // Menghapus event menggunakan adminService
    const deletedEvent = await this.adminService.deleteEvent(id);
    if (deletedEvent) {
      // Jika event berhasil dihapus, kirim respon dengan status 200
      res.status(200).send({
        message: "Event deleted successfully", // Pesan sukses
        status: res.statusCode, // Menyertakan status kode dari respon
        data: deletedEvent, // Menyertakan data event yang telah dihapus
      });
    } else {
      // Jika event tidak ditemukan, kirim respon dengan status 404
      res.status(404).send({
        message: `Event id ${id} not found`, // Pesan error
        status: res.statusCode, // Menyertakan status kode dari respon
        details: res.statusMessage, // Menyertakan pesan status
      });
    }
  }

  async getEventBySearch(req: Request, res: Response) {
    const searchString = req.query.search as string;
    const events = await this.adminService.getEventBySearch(searchString);
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
