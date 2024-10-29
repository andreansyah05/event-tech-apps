import { PrismaClient } from "@prisma/client"; 
import { Event } from "../../models/models"; 

export class UserService { 
    private prisma: PrismaClient; 

    constructor () { 
        this.prisma = new PrismaClient();
    }

    async getAllEvents() {                                                          // Metode untuk mengambil semua acara dari database.
        return await this.prisma.event.findMany()                                    // Menggunakan Prisma untuk mencari semua acara.
    }

    async getEventById(event_id:number) {                                       // Metode untuk mengambil acara berdasarkan ID.
        return await this.prisma.event.findUnique                                // Mencari acara yang unik berdasarkan ID yang diberikan.
        ({ where: { event_id } })                                             // Menentukan kondisi pencarian berdasarkan event_id.
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
