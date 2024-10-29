import { PrismaClient } from "@prisma/client";
import { Event, Discount } from "../../models/models";

export class AdminService {
    private prisma: PrismaClient;
    constructor() {
        this.prisma = new PrismaClient();
    }

    async getAllEvents() {
        return this.prisma.event.findMany();
    }

    async getEventById(event_id: number) {
        return this.prisma.event.findUnique({ where: { event_id }, });
    }


    async createEvent(eventData: Event, discountPercentage: number , is_active: boolean) {

          // Menghitung harga setelah diskon
          const originalPrice = eventData.event_price as number;
          const discountedPrice = originalPrice * (1 - discountPercentage / 100);

        // Buat acara baru

        
        const newEvent = await this.prisma.event.create({ data: {
            event_name: eventData.event_name,
            event_image: eventData.event_image,
            event_description: eventData.event_description,
            discounted_price: discountedPrice,
            event_price: eventData.event_price,
            event_location: eventData.event_location,
            event_capacity: eventData.event_capacity,
            categoryId: eventData.categoryId,
            event_start_date: new Date(eventData.event_start_date),
            event_end_date: new Date(eventData.event_end_date),
            is_online: eventData.is_online,
            is_paid: eventData.is_paid,
        } });


        // Buat promo baru untuk acara
        const newDiscount = await this.prisma.dicount_Event.create({
            data: {
                eventId: newEvent.event_id,
                discount_percentage:discountPercentage,
                is_active: is_active,
                end_date: new Date(newEvent.event_end_date), // Tanggal berakhir promo sesuai dengan tanggal selesai acara
            },
        });

        // // Update harga acara setelah diskon
        // await this.prisma.event.update({
        //     where: { event_id: newEvent.event_id },
        //     data: { 
        //         discounted_price:discountPercentage
        //      },
        // });

        console.log("Acara dan promo berhasil dibuat:", { newEvent, newDiscount });
        return { newEvent, newDiscount };
    }

    async updateEvent(event_id: number, discount_id: number, updatedEventData: Event, discountPercentage: number, is_active: boolean){
        // Menghitung harga setelah diskon
        const originalPrice = updatedEventData.event_price as number;
        const discountedPrice = originalPrice * (1 - discountPercentage / 100);

        // Update acara
        const updatedEvent = await this.prisma.event.update({
            where: { event_id: event_id },
            data: {
                event_name: updatedEventData.event_name,
                event_image: updatedEventData.event_image,
                event_description: updatedEventData.event_description,
                discounted_price: discountedPrice,
                event_price: updatedEventData.event_price,
                event_location: updatedEventData.event_location,
                event_capacity: updatedEventData.event_capacity,
                categoryId: updatedEventData.categoryId,
                event_start_date: new Date(updatedEventData.event_start_date),
                event_end_date: new Date(updatedEventData.event_end_date),
                is_online: updatedEventData.is_online,
                is_paid: updatedEventData.is_paid,
    }})

    const newDiscount = await this.prisma.dicount_Event.update({
        where: {discount_id: discount_id} ,
        data: {
           
            discount_percentage:discountPercentage,
            is_active: is_active,
            end_date: new Date(updatedEventData.event_end_date), // Tanggal berakhir promo sesuai dengan tanggal selesai acara
        },
    });
    return {updatedEvent,newDiscount}
    }

    async deleteEvent(event_id: number) {
        console.log("Memang babi kau nih:", event_id);
    
        // Hapus semua entri terkait di Discount_Event
        await this.prisma.dicount_Event.deleteMany({
            where: { eventId: event_id },
        });
    
        // Hapus event
        const deleteEvent = await this.prisma.event.delete({
            where: { event_id: event_id },
        });
    
        return deleteEvent;
    }
    
    

    

    // async UpdateDiscountPromo(event_id: number, discountPercentage: number){
    //    // Ambil acara berdasarkan ID
    // const event = await this.prisma.events.findUnique({
    // where: { event_id: event_id },
    // });

    // // Cek apakah acara ditemukan
    // if (!event) {
    // throw new Error("Acara tidak ditemukan");
    // }

    // // Ambil promo acara berdasarkan event ID
    // const discount = await this.prisma.discount.findUnique({
    // where: { eventId: event_id },
    // });

    // // Jika promo ditemukan, toggle status is_active
    //     if (discount) {
    //     const updatedDiscount = await this.prisma.discount.update({
    //     where: { discount_id: discount.discount_id },
    //     data: {
    //         is_active: !discount.is_active, // Toggle status
    //     },
    // });
    // console.log("Promo diupdate:", updatedDiscount);
    // } else {
    // console.log("Promo tidak ditemukan untuk acara ini.");
    // }


    //     // menghitung harga promo setelah diskon
    //     const originalPrice = event?.event_price as number;
    //     const discountedPrice = originalPrice * (1 - discountPercentage / 100);

    //     // update harga setelah diskon
    //     await this.prisma.events.update({
    //         where: { event_id: event_id },
    //         data: { discountedPrice }
    //     })
    //     return event;
    // 

}



