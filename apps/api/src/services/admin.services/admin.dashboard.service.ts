import { PrismaClient } from "@prisma/client";
import {
  BookingServiceCode,
  BookingStatus,
} from "../../models/booking.interface";
import { log } from "console";

interface GetMonthlyUserCountsResult {
  totalUsers: number;
  monthlyUsers: { month: number; count: number }[];
}

export class AdminDashboardService {
  private prisma: PrismaClient;
  constructor() {
    this.prisma = new PrismaClient();
  }

  async getUserCount() {
    try {
      const userCount = await this.prisma.users.count({
        where: {
          user_role: "user",
        },
      });
      return { userCount };
    } catch (error) {
      console.error("Error counting users:", error);
      throw new Error("Could not fetch user count.");
    }
  }

  async getAnlyticMontlyhRegister(): Promise<
    {
      month: number | null;
      count: number | null;
    }[]
  > {
    try {
      const result: { month: number; total_users: BigInt }[] = await this.prisma
        .$queryRawUnsafe(`
            SELECT 
            EXTRACT(MONTH FROM created_at) AS month, 
            COUNT(*) AS total_users
    FROM 
    techevent.techevent."Users"
    WHERE 
    created_at >= NOW() - INTERVAL '6 month'
    AND created_at < NOW()
    GROUP BY 
    EXTRACT(MONTH FROM created_at)
    ORDER BY 
    EXTRACT(MONTH FROM created_at) DESC;`);

      console.log("result", result);
      const monthlyStatistic = result.map((totalRow: any) => {
        return {
          month: totalRow.month ?? null,
          count: totalRow.total_users ? Number(totalRow.total_users) : 0,
        };
      });

      return monthlyStatistic;
    } catch (error) {
      return [];
    }
  }

  async getAnlyticTransaction(): Promise<
    {
      month: number | null;
      count: number | null;
    }[]
  > {
    try {
      const result: { month: number; total_amount: BigInt }[] = await this
        .prisma.$queryRawUnsafe(`
           SELECT
            EXTRACT(MONTH FROM order_date) AS month,
            SUM(payment_ammount) AS total_amount
    FROM
        techevent.techevent."Transaction"
    WHERE
        order_date >= NOW() - INTERVAL '6 month'
        AND order_date < NOW()
         AND status_order = 'Paid'
    GROUP BY
         EXTRACT(MONTH FROM order_date)
    ORDER BY
        EXTRACT(MONTH FROM order_date) DESC;`);

      console.log("result", result);
      const monthlyStatistic = result.map((totalRow: any) => {
        return {
          month: totalRow.month ?? null,
          count: totalRow.total_amount ? Number(totalRow.total_amount) : 0,
        };
      });

      return monthlyStatistic;
    } catch (error) {
      return [];
    }
  }

  //   async getAnalyticMonthlyRegistration() {
  //     try {
  //       // Mendapatkan jumlah pengguna yang mendaftar dalam 6 bulan terakhir
  //       const monthlyRegistration = await this.prisma.users.count({
  //         where: {
  //           user_role: "user", // Memfilter pengguna dengan peran "user"
  //           created_at: {
  //             gte: new Date(new Date().setMonth(new Date().getMonth() - 6)), // Memfilter pengguna yang didaftarkan dalam 6 bulan terakhir
  //           },
  //         },
  //       });

  //       // Mengembalikan jumlah pendaftaran pengguna dalam sebulan terakhir
  //       return { monthlyRegistration };
  //     } catch (error) {
  //       // Menangani error yang terjadi selama eksekusi query
  //       console.error("Error fetching monthly registration:", error);
  //       // Mengembalikan error atau response lainnya sesuai kebutuhan
  //       throw new Error("Gagal mendapatkan data pendaftaran pengguna");
  //     }
  //   }

  async getTotalListEvents() {
    // Mendapatkan jumlah event yang terjadi di seluruh tempat yang mendaftar
    const totalEvents = await this.prisma.event.count();
    return { totalEvents };
  }

  async getMonthlyTransaction() {
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const monthlyTransaction = await this.prisma.users.count({
      where: {
        created_at: {
          gte: sixMonthsAgo,
        },
      },
    });

    return { monthlyTransaction };
  }

  async getTotalTransaction() {
    const transactions = await this.prisma.transaction.findMany({
      where: {
        status_order: BookingStatus.Paid,
      },
    });

    // Menghitung total transaksi dengan mengakumulasi jumlahnya
    const totalTransactionCount = transactions.length;
    return totalTransactionCount;
  }

  async getTotalTransactionValue() {
    const totalTransactionPaid = await this.prisma.transaction.aggregate({
      _sum: {
        payment_ammount: true,
      },
      where: {
        status_order: BookingStatus.Paid,
      },
    });

    return totalTransactionPaid || 0;
  }
}