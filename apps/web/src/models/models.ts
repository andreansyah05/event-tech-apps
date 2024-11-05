export interface LoginAuth {
  email: string;
  password: string;
}

export interface UserProps {
  name: string;
  userReferralId: number;
  referral_use: string | null;
  points: number;
  user_role: string;
  refresh_token: string;
}

export interface CategoryProps {
  category_id: number; // ID kategori
  category_name: string; // Nama kategori
}

export interface RegisterForm {
  name: string;
  email: string;
  password: string;
  role?: "user";
}

export interface EventCardProps {
  event_id: number | string;
  event_name: string; // Nama acara
  event_image: string; // URL gambar acara
  event_price: number; // Harga acara
  event_capacity: number; // Kapasitas acara
  category_name: string;
  event_start_date: string; // Tanggal dan waktu mulai acara
  event_end_date: string; // Tanggal dan waktu selesai acara
  discounted_price?: number; // Harga diskon (opsional)
  is_online: boolean; // Apakah acara ini online
  is_paid: boolean; // Apakah acara ini bayar atau gratis
  event_description: string;
  onClick?: () => void;
}
