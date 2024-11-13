import { PrismaClient } from "@prisma/client";
import { Event, EventResponse } from "../../models/admin.interface";

export class UserService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async getAllEvents(): Promise<EventResponse[]> {
    // Metode untuk mengambil semua acara dari database.
    const response = await this.prisma.event.findMany({
      include: {
        Category: true,
      },
    });

    // Remap the response
    const listEvent: EventResponse[] = response.map((event) => {
      return {
        event_id: event.event_id,
        event_name: event.event_name,
        categoryId: event.Category.category_id,
        category_name: event.Category.category_name,
        event_image: event.event_image,
        event_description: event.event_description,
        event_price: event.event_price,
        event_location: event.event_location,
        event_capacity: event.event_capacity,
        event_start_date: new Date(event.event_start_date).toLocaleDateString(),
        event_end_date: new Date(event.event_end_date).toLocaleDateString(),
        discounted_price: event.discounted_price,
        is_online: event.is_online,
        is_paid: event.is_paid,
      };
    });

    return listEvent;
  }

  async getEventById(event_id: number): Promise<EventResponse | undefined> {
    // Metode untuk mengambil acara berdasarkan ID.
    const response = await this.prisma.event.findUnique(
      // Mencari acara yang unik berdasarkan ID yang diberikan.
      {
        include: {
          Category: true,
        },

        where: { event_id: event_id },
      }
    ); // Menentukan kondisi pencarian berdasarkan event_id.
    if (response) {
      return {
        event_id: response.event_id,
        event_name: response.event_name,
        categoryId: response.Category.category_id,
        category_name: response.Category.category_name,
        event_image: response.event_image,
        event_description: response.event_description,
        event_price: response.event_price,
        event_location: response.event_location,
        event_capacity: response.event_capacity,
        event_start_date: new Date(
          response.event_start_date
        ).toLocaleDateString(),
        event_end_date: new Date(response.event_end_date).toLocaleDateString(),
        discounted_price: response.discounted_price,
        is_online: response.is_online,
        is_paid: response.is_paid,
      };
    } else {
      return undefined;
    }
  }

  async getEventBySearch(searchString: string): Promise<EventResponse[]> {
    const response = await this.prisma.event.findMany({
      include: {
        Category: true,
      },
      where: {
        event_name: {
          contains: searchString,
          mode: "insensitive",
        },
      },
    });

    if (response) {
      const listEvent: EventResponse[] = response.map((event) => {
        return {
          event_id: event.event_id,
          event_name: event.event_name,
          categoryId: event.Category.category_id,
          category_name: event.Category.category_name,
          event_image: event.event_image,
          event_description: event.event_description,
          event_price: event.event_price,
          event_location: event.event_location,
          event_capacity: event.event_capacity,
          event_start_date: new Date(
            event.event_start_date
          ).toLocaleDateString(),
          event_end_date: new Date(event.event_end_date).toLocaleDateString(),
          discounted_price: event.discounted_price,
          is_online: event.is_online,
          is_paid: event.is_paid,
        };
      });

      return listEvent;
    } else {
      console.log("No event found with this search string.");
      return [];
    }
  }

  // async getEventCategory (                                                 // Metode untuk mengambil acara berdasarkan kategori dan pencarian.
  //     search:string,                                                      // Parameter untuk kata kunci pencarian.
  //     category_Id:number,                                               // Parameter untuk nama kategori.
  //     sortBy: 'event_price' | 'event_start_date' = 'event_start_date',    // Parameter untuk menentukan kolom yang digunakan untuk pengurutan, default adalah 'event_start_date'.
  //     sortOrder: 'asc' | 'desc' = 'asc'                                   // Parameter untuk menentukan urutan pengurutan, default adalah 'asc'.
  // ){
  //    return await this.prisma.event.findUnique ({                                           // Mengambil banyak acara berdasarkan kriteria pencarian dan pengurutan.
  //         where : {
  //             OR: [                                                                       // Menggunakan kondisi OR untuk mencari berdasarkan nama acara atau nama kategori.
  //                 { event_name: { contains: search, mode: "insensitive" } },                  // Mencari nama acara yang mengandung string pencarian, tanpa memperhatikan kapitalisasi.
  //                 {category_Id: { contains: category_Id, mode: "insensitive" } },    // Mencari nama kategori yang mengandung nama kategori yang diberikan, tanpa memperhatikan kapitalisasi.
  //             ],
  //         },
  //         orderBy: {
  //             [sortBy]: sortOrder,                                                        // Mengurutkan hasil berdasarkan kolom dan urutan yang ditentukan.
  //         },
  //     })
  // }
}
