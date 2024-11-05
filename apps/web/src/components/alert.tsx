// Mendefinisikan interface Toast untuk mendefinisikan tipe props yang diterima
interface Toast {
  showToast: boolean; // Properti boolean untuk mengontrol tampilan komponen
}

// Komponen Toast untuk menampilkan notifikasi di layar
function Toast({ showToast }: Toast) {
  return (
    <div
      // Mengatur posisi dan gaya dari komponen Toast
      className={`absolute top-10 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-4 mb-4 text-green-800 rounded-lg bg-green-50 w-fit ${
        // Menentukan gaya transisi berdasarkan nilai showToast
        showToast
          ? "opacity-100 translate-y-0 shadow-md" // Jika showToast true, tampilkan dengan opacity penuh dan bayangan
          : "opacity-0 -translate-y-5" // Jika false, sembunyikan dengan opacity 0 dan geser sedikit ke atas
      } transition-all duration-300 ease-in-out`} // Mengatur transisi untuk perubahan tampilan
      role="alert" // Atribut ARIA untuk menandakan ini sebagai alert
    >
      {/* Teks notifikasi yang akan ditampilkan */}
      <span className="font-medium">Success Register Account</span> redirect you
      to login page
    </div>
  );
}

export default Toast; // Mengekspor komponen Toast sebagai default
