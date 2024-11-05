import { EventCardProps } from "./models";

export const events: any[] = [
  // ... data acara yang sudah Anda buat sebelumnya ...

  {
    event_name: "Lomba Lari Maraton Jakarta",
    event_image:
      "https://i.pinimg.com/564x/c6/5d/41/c65d41095846c3ced34638f8d2009518.jpg",
    event_description: "Ajang lari maraton tahunan di Jakarta.",
    event_price: 300000,
    event_location: "Monas, Jakarta",
    event_capacity: 1000,
    category: {
      category_id: 2, // Kategori musik
      category_name: "Musik",
    },
    event_start_date: new Date("2024-12-01T06:00:00"),
    event_end_date: new Date("2024-12-01T12:00:00"),
    is_online: false,
    is_paid: true,
  },
  {
    event_name: "Konser Musik Jazz",
    event_image:
      "https://i.pinimg.com/564x/c6/5d/41/c65d41095846c3ced34638f8d2009518.jpg",
    event_description: "Nikmati alunan musik jazz dari musisi ternama.",
    event_price: 150000,
    event_location: "Hall A, Jakarta Convention Center",
    event_capacity: 500,
    category: {
      category_id: 2, // Kategori musik
      category_name: "Musik",
    },
    event_start_date: new Date("2025-01-10T19:00:00"),
    event_end_date: new Date("2025-01-10T22:00:00"),
    is_online: false,
    is_paid: true,
  },
  {
    event_name: "Workshop Memasak Vegan",
    event_image:
      "https://i.pinimg.com/564x/c6/5d/41/c65d41095846c3ced34638f8d2009518.jpg",
    event_description: "Belajar membuat berbagai hidangan vegan yang lezat.",
    event_price: 250000,
    event_location: "Studio Memasak, Jakarta Selatan",
    event_capacity: 30,
    category: {
      category_id: 2, // Kategori musik
      category_name: "Musik",
    },
    event_start_date: new Date("2024-11-25T13:00:00"),
    event_end_date: new Date("2024-11-25T16:00:00"),
    is_online: false,
    is_paid: true,
  },
  {
    event_name: "Hackathon Innovation Tech",
    event_image:
      "https://i.pinimg.com/564x/c6/5d/41/c65d41095846c3ced34638f8d2009518.jpg",
    event_description:
      "Kompetisi pembuatan aplikasi inovatif selama 24 jam nonstop.",
    event_price: 0, // Gratis
    event_location: "Gedung Inovasi, Jakarta Pusat",
    event_capacity: 100,
    category: {
      category_id: 2, // Kategori musik
      category_name: "Musik",
    },
    event_start_date: new Date("2024-12-10T10:00:00"),
    event_end_date: new Date("2024-12-11T10:00:00"),
    is_online: false,
    is_paid: false,
  },
  {
    event_name: "Pameran Seni Rupa Kontemporer",
    event_image:
      "https://i.pinimg.com/564x/c6/5d/41/c65d41095846c3ced34638f8d2009518.jpg",
    event_description:
      "Pameran karya seni rupa terbaru dari seniman lokal dan internasional.",
    event_price: 20000,
    event_location: "Galeri Nasional Indonesia",
    event_capacity: 500,
    category: {
      category_id: 2, // Kategori musik
      category_name: "Musik",
    },
    event_start_date: new Date("2025-01-15T10:00:00"),
    event_end_date: new Date("2025-01-25T18:00:00"),
    is_online: false,
    is_paid: true,
  },
  {
    event_name: "Webinar Keuangan Pribadi",
    event_image:
      "https://i.pinimg.com/564x/c6/5d/41/c65d41095846c3ced34638f8d2009518.jpg",
    event_description: "Belajar mengelola keuangan pribadi secara efektif.",
    event_price: 50000,
    event_location: "Online",
    event_capacity: 1000,
    category: {
      category_id: 2, // Kategori musik
      category_name: "Musik",
    },
    event_start_date: new Date("2024-11-20T19:00:00"),
    event_end_date: new Date("2024-11-20T21:00:00"),
    is_online: true,
    is_paid: true,
  },
];
