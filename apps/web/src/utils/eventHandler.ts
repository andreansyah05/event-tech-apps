import { EventCardProps } from "@/models/models";
import axios from "axios";

export class EventHandlerApi {
  async getAllEvent() {
    try {
      // Menggunakan axios untuk mengirimkan permintaan GET ke endpoint /api/users/events
      const response = await axios.get(`/api/users/events`);

      // Menampilkan data yang diterima dari respons API (data dan cursor) di console
      console.log({ data: response.data.data, cursor: response.data.cursor });

      // Membuat objek data yang berisi data event dan cursor dari respons API
      const data: { data: EventCardProps; cursor: number } = {
        data: response.data.data, // Menyimpan data event
        cursor: response.data.cursor, // Menyimpan cursor untuk navigasi lebih lanjut (misalnya untuk pagination)
      };

      // Mengembalikan objek data yang berisi data event dan cursor
      return data;
    } catch (error) {
      // Jika terjadi kesalahan dalam proses pengambilan data, tampilkan pesan kesalahan di console
      console.error("Error fetching events:", error);

      // Mengembalikan array kosong jika terjadi kesalahan
      return [];
    }
  }

  async getEventByFilter(searchString?: string, selectedCategory?: string) {
    // Menampilkan nilai dari searchString dan selectedCategory yang diterima sebagai parameter di console
    console.log("Front End", searchString, selectedCategory);

    try {
      // Mengirimkan permintaan GET ke endpoint /api/users/search-events dengan parameter searchString dan selectedCategory
      // Parameter ini akan digunakan untuk memfilter hasil pencarian event berdasarkan kata kunci dan kategori
      const response = await axios.get(
        `/api/users/search-events?search=${searchString}&category=${selectedCategory}`
      );

      // Membuat objek data yang berisi data event dan cursor dari respons API
      const data: { data: EventCardProps; cursor: number } = {
        data: response.data.data, // Data event yang diterima
        cursor: response.data.cursor, // Cursor untuk navigasi (pagination) lebih lanjut
      };

      // Mengembalikan objek data yang berisi data event dan cursor
      return data;
    } catch (error) {
      // Menangani kesalahan yang mungkin terjadi selama pengambilan data
      console.error("Error fetching events:", error);

      // Mengembalikan array kosong jika terjadi kesalahan dalam proses pengambilan data
      return [];
    }
  }

  async geEventById(eventId: number) {
    try {
      // Mengirimkan permintaan GET ke endpoint API dengan eventId yang diberikan untuk mengambil event berdasarkan ID
      const response = await axios.get(`/api/users/events/${eventId}`);

      // Menampilkan respons yang diterima dari API di console untuk tujuan debugging
      console.log(response);

      // Mengembalikan data event yang diterima dari respons API
      return response.data;
    } catch (error) {
      // Jika terjadi kesalahan dalam pengambilan data, tampilkan pesan kesalahan di console
      console.log("Error fetch events", error);

      // Mengembalikan array kosong jika terjadi kesalahan
      return [];
    }
  }

  async getMoreEvent(
    lastCursor: number, // Parameter yang menunjukkan posisi terakhir untuk pagination (cursor)
    searchString?: string, // Parameter opsional untuk kata kunci pencarian event
    selectedCategory?: string // Parameter opsional untuk kategori yang dipilih
  ) {
    // Menampilkan kata kunci pencarian di console untuk tujuan debugging
    console.log("Search", searchString);

    try {
      // Mengirimkan permintaan GET ke API untuk memuat lebih banyak event berdasarkan cursor terakhir, pencarian, dan kategori
      const response = await axios.get(
        `/api/users/load-more?search=${searchString}&category=${selectedCategory}&cursor=${lastCursor}`
      );

      // Membuat objek data yang berisi hasil event dan cursor baru untuk navigasi lebih lanjut
      const data: { data: EventCardProps; cursor: number } = {
        data: response.data.data, // Menyimpan data event yang diterima
        cursor: response.data.cursor, // Menyimpan cursor untuk pagination
      };

      // Mengembalikan objek data yang berisi event dan cursor baru
      return data;
    } catch (error) {
      // Menangani kesalahan jika permintaan API gagal
      console.log("Error fetch events", error);

      // Mengembalikan array kosong jika terjadi kesalahan
      return [];
    }
  }

  async getAllCategories() {
    try {
      // Mengirimkan permintaan GET ke endpoint API untuk mengambil data kategori
      const response = await axios.get("/api/users/categories");

      // Mengembalikan data kategori yang diterima dari respons API
      return response.data;
    } catch (error) {
      // Menangani kesalahan yang mungkin terjadi saat pengambilan data
      console.error("Error fetching categories:", error);

      // Mengembalikan array kosong jika terjadi kesalahan dalam pengambilan data
      return [];
    }
  }

  async createEvent(formData: FormData, adminToken: string) {
    try {
      // Mengirimkan permintaan POST ke API untuk membuat event dengan menyertakan formData dan adminToken
      const response = await axios.post("/api/admin/events", formData, {
        headers: {
          // Menyertakan token admin dalam header Authorization untuk autentikasi
          Authorization: `Bearer ${adminToken}`,
        },
      });

      // Mengembalikan data yang diterima dari API (misalnya, data event yang baru dibuat)
      return response.data;
    } catch (error) {
      // Menangani kesalahan yang mungkin terjadi selama proses pembuatan event
      console.error("Error creating event:", error);

      // Memeriksa apakah kesalahan berasal dari axios, dan jika iya, melemparkan pesan kesalahan yang spesifik
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || "Gagal membuat event");
      }

      // Jika kesalahan bukan berasal dari axios, melemparkan kesalahan umum
      throw new Error("Gagal membuat event");
    }
  }

  async updateEvent(formData: FormData, event_id: number, adminToken: string) {
    // Menampilkan data input formData dan token admin untuk tujuan debugging
    console.log("inputd data : ", formData);
    console.log(adminToken);

    try {
      // Mengirimkan permintaan PUT ke API untuk memperbarui event yang sesuai dengan event_id menggunakan formData
      const response = await axios.put(
        `/api/admin/events/${event_id}`, // URL endpoint untuk memperbarui event berdasarkan event_id
        formData, // Data yang dikirim untuk memperbarui event
        {
          headers: {
            // Menambahkan header Authorization dengan Bearer token untuk autentikasi
            Authorization: `Bearer ${adminToken}`,
          },
        }
      );

      // Mengembalikan data yang diterima dari respons API, biasanya data event yang telah diperbarui
      return response.data;
    } catch (error) {
      // Menangani kesalahan jika terjadi selama permintaan PUT
      console.error("Error creating event:", error);

      // Memeriksa apakah kesalahan berasal dari axios
      if (axios.isAxiosError(error)) {
        // Jika kesalahan berasal dari axios, melemparkan pesan kesalahan dari respons API atau pesan default
        throw new Error(error.response?.data?.message || "Gagal membuat event");
      }

      // Jika kesalahan bukan berasal dari axios, melemparkan kesalahan umum
      throw new Error("Gagal membuat event");
    }
  }
}
