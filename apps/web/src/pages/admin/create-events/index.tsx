import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Createeventadmin } from "@/pages/api/Create-event-admin";
import { CreateEvent } from "@/models/createevent";

function CreateEventForm() {
  const router = useRouter();
  const [formData, setFormData] = useState<CreateEvent>({
    event_name: "",
    event_image: "",
    event_description: "",
    event_price: 0,
    event_location: "",
    event_capacity: 0,
    categoryId: 0, // Misalkan kita set default ID kategori
    event_start_date: "",
    event_end_date: "",
    is_online: true, // Default ke online
    is_paid: false, // Default ke gratis
    discount_percentage: 0,
    is_active: true, // Default ke active
  });

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e: { target: { files: any[] } }) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prevData) => ({
        ...prevData,
        event_image: URL.createObjectURL(file), // Simpan URL sementara
      }));
    }
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // event_name: string; // Nama acara
    // event_image: string; // URL gambar acara
    // event_description: string; // Deskripsi acara
    // event_price: number; // Harga acara
    // event_location: string; // Lokasi acara
    // event_capacity: number; // Kapasitas acara
    // categoryId: number; // ID kategori
    // event_start_date: string; // Tanggal dan waktu mulai acara
    // event_end_date: string; // Tanggal dan waktu selesai acara
    // is_online: string | boolean; // Apakah acara ini online
    // is_paid: string | boolean; // Apakah acara ini bayar atau gratis
    // discount_percentage: number; // Persentase diskon
    // is_active: string | boolean; // Status aktif diskon

    console.log("testiiii", formData);
    const data = new FormData();
    data.append("event_name", formData.event_name);
    data.append("event_description", formData.event_description);
    data.append("event_price", formData.event_price.toString());
    data.append("event_location", formData.event_location);
    data.append("event_capacity", formData.event_capacity.toString());
    data.append("categoryId", formData.categoryId.toString());
    data.append("event_start_date", formData.event_start_date);
    data.append("event_end_date", formData.event_end_date);
    data.append("is_online", formData.is_online.toString());
    data.append("is_paid", formData.is_paid.toString());
    data.append("discount_percentage", formData.discount_percentage.toString());
    data.append("is_active", formData.is_active.toString());
    data.append("event_image", formData.event_image);

    try {
      await Createeventadmin(data).then((response) => {
        if (response) {
          console.log(response);
          alert("Event berhasil dibuat!");
          router.push("/admin/list-events");
        }
      });
    } catch (error) {
      alert("Terjadi kesalahan: ");
    }
  }

  // const handleSubmit = async (e: { preventDefault: () => void }) => {
  //   e.preventDefault();

  //   // Ubah event start dan end date ke format yang sesuai
  //   const eventPayload = {
  //     ...formData,
  //     event_start_date: new Date(formData.event_start_date),
  //     event_end_date: new Date(formData.event_end_date),
  //   };
  //   console.log(eventPayload);

  //   try {
  //     Createeventadmin(eventPayload);
  //     alert("Event berhasil dibuat!");
  //   } catch (error) {
  //     alert("Terjadi kesalahan: ");
  //   }
  // };
  // console.log(formData);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-2">
          {/* EVENT NAME */}
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="event_name"
          >
            Event Name
          </label>
          <input
            onChange={(e: any) => {
              handleChange({
                target: {
                  name: "event_name",
                  value: e.target.value,
                },
              });
            }}
            className="w-full px-3 py-2 border rounded-md shadow-sm
          placeholder-gray-400 focus:outline-none focus:ring-2
          focus:ring-blue-500"
            type="text"
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          {/* EVENT DESCRIPTION */}
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="event_description"
          >
            Event description
          </label>
          <input
            onChange={(e: any) => {
              handleChange({
                target: {
                  name: "event_description",
                  value: e.target.value,
                },
              });
            }}
            className="w-full px-3 py-2 border rounded-md shadow-sm
          placeholder-gray-400 focus:outline-none focus:ring-2
          focus:ring-blue-500"
            type="text"
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          {/* EVENT IMAGE */}
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="event-image"
          >
            Event Image
          </label>
          <input
            className="w-full px-3 py-2 border rounded-md shadow-sm
          placeholder-gray-400 focus:outline-none focus:ring-2
          focus:ring-blue-500"
            type="file"
            accept="image/"
            onChange={(e: any) => {
              if (e.target.files && e.target.files.length > 0) {
                handleChange({
                  target: {
                    name: "event_image",
                    value: e.target.files[0],
                  },
                });
              }
            }}
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          {/* EVENT PRICE */}
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="event_name"
          >
            Event Price
          </label>
          <input
            onChange={(e: any) => {
              handleChange({
                target: {
                  name: "event_price",
                  value: e.target.value,
                },
              });
            }}
            className="w-full px-3 py-2 border rounded-md shadow-sm
          placeholder-gray-400 focus:outline-none focus:ring-2
          focus:ring-blue-500"
            type="number"
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          {/* EVENT NAME */}
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="event_name"
          >
            Event Location
          </label>
          <input
            onChange={(e: any) => {
              handleChange({
                target: {
                  name: "event_location",
                  value: e.target.value,
                },
              });
            }}
            className="w-full px-3 py-2 border rounded-md shadow-sm
          placeholder-gray-400 focus:outline-none focus:ring-2
          focus:ring-blue-500"
            type="text"
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          {/* EVENT CAPACITY */}
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="event_name"
          >
            Event Capacity
          </label>
          <input
            onChange={(e: any) => {
              handleChange({
                target: {
                  name: "event_capacity",
                  value: e.target.value,
                },
              });
            }}
            className="w-full px-3 py-2 border rounded-md shadow-sm
          placeholder-gray-400 focus:outline-none focus:ring-2
          focus:ring-blue-500"
            type="number"
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          {/* EVENT CATEGORY */}
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="event_name"
          >
            Select Category
          </label>
          <select
            onChange={(e: any) => {
              handleChange({
                target: {
                  name: "categoryId",
                  value: e.target.value,
                },
              });
            }}
            className="w-full px-3 py-2 border rounded-md shadow-sm
          placeholder-gray-400 focus:outline-none focus:ring-2
          focus:ring-blue-500"
            name="category"
            id="category"
          >
            <option value="1"></option>
            <option value="1"></option>
            <option value="1"></option>
          </select>
        </div>

        <div className="flex flex-col gap-2">
          {/* EVENT START DATE */}
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="event_name"
          >
            Event Start Data
          </label>
          <input
            onChange={(e: any) => {
              handleChange({
                target: {
                  name: "event_start_date",
                  value: e.target.value,
                },
              });
            }}
            className="w-full px-3 py-2 border rounded-md shadow-sm
          placeholder-gray-400 focus:outline-none focus:ring-2
          focus:ring-blue-500"
            type="date"
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          {/* EVENT END DATE */}
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="event_name"
          >
            Event END DATE
          </label>
          <input
            onChange={(e: any) => {
              handleChange({
                target: {
                  name: "event_end_date",
                  value: e.target.value,
                },
              });
            }}
            className="w-full px-3 py-2 border rounded-md shadow-sm
          placeholder-gray-400 focus:outline-none focus:ring-2
          focus:ring-blue-500"
            type="date"
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          {/* EVENT CAPACITY */}
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="event_name"
          >
            Event Capacity
          </label>
          <input
            onChange={(e: any) => {
              handleChange({
                target: {
                  name: "event_capacity",
                  value: e.target.value,
                },
              });
            }}
            className="w-full px-3 py-2 border rounded-md shadow-sm
          placeholder-gray-400 focus:outline-none focus:ring-2
          focus:ring-blue-500"
            type="number"
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          {/* DISCOUNTED PERCENTAGE */}
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="event_name"
          >
            Discounted Percentage
          </label>
          <input
            onChange={(e: any) => {
              handleChange({
                target: {
                  name: "discount_percentage",
                  value: e.target.value,
                },
              });
            }}
            className="w-full px-3 py-2 border rounded-md shadow-sm
          placeholder-gray-400 focus:outline-none focus:ring-2
          focus:ring-blue-500"
            type="number"
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          {/* DISCOUNTED PRICE */}
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="event_name"
          >
            Discounted Price
          </label>
          <input
            onChange={(e: any) => {
              handleChange({
                target: {
                  name: "event_name",
                  value: e.target.value,
                },
              });
            }}
            className="w-full px-3 py-2 border rounded-md shadow-sm
          placeholder-gray-400 focus:outline-none focus:ring-2
          focus:ring-blue-500"
            type="number"
            required
            disabled
          />
        </div>

        <div className="flex flex-col gap-2">
          {/* DISCOUNTED PRICE */}
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="event_name"
          >
            Event Online?
          </label>
          <div className="flex gap-1">
            <input
              onChange={(e: any) => {
                handleChange({
                  target: {
                    name: "is_online",
                    value: true,
                  },
                });
              }}
              id="is_online"
              name="is_online"
              className="w-full px-3 py-2 border rounded-md shadow-sm
            placeholder-gray-400 focus:outline-none focus:ring-2
              focus:ring-blue-500"
              type="radio"
              required
            />
            <label htmlFor="is_online">Event Online</label>
          </div>
          <div className="flex gap-1">
            <input
              onChange={(e: any) => {
                handleChange({
                  target: {
                    name: "is_online",
                    value: false,
                  },
                });
              }}
              id="is_online"
              name="is_online"
              className="w-full px-3 py-2 border rounded-md shadow-sm
            placeholder-gray-400 focus:outline-none focus:ring-2
              focus:ring-blue-500"
              type="radio"
              required
            />
            <label htmlFor="is_online">Event Offline</label>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          {/* DISCOUNTED PRICE */}
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="event_name"
          >
            Is event free?
          </label>
          <div className="flex gap-1">
            <input
              onChange={(e: any) => {
                handleChange({
                  target: {
                    name: "is_paid",
                    value: true,
                  },
                });
              }}
              value="PAID"
              id="is_paid"
              name="is_paid"
              className="w-full px-3 py-2 border rounded-md shadow-sm
            placeholder-gray-400 focus:outline-none focus:ring-2
              focus:ring-blue-500"
              type="radio"
              required
            />
            <label htmlFor="is_paid">Paid Event</label>
          </div>
          <div className="flex gap-1">
            <input
              onChange={(e: any) => {
                handleChange({
                  target: {
                    name: "is_paid",
                    value: false,
                  },
                });
              }}
              id="is_paid"
              name="is_paid"
              className="w-full px-3 py-2 border rounded-md shadow-sm
            placeholder-gray-400 focus:outline-none focus:ring-2
              focus:ring-blue-500"
              type="radio"
              value="FREE"
              required
            />
            <label htmlFor="is_paid">Free Event</label>
          </div>
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-gray-400 text-white rounded-md font-bold hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
        >
          CREATE NEW EVENT
        </button>
      </form>
    </>
  );
}

export default CreateEventForm;
