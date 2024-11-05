// Mendefinisikan interface ButtonProps untuk tipe properti yang diterima oleh komponen Button
interface ButtonProps {
  type: "primary" | "white" | "secondary"; // Tipe tombol yang diterima hanya bisa berupa "primary", "white", atau "secondary"
  text: string; // Teks yang akan ditampilkan di dalam tombol
  isButtonDisable: boolean; // Mengatur apakah tombol dalam keadaan nonaktif atau tidak
}

// Komponen Button untuk menghasilkan tombol dengan berbagai gaya berdasarkan tipe yang dipilih
function Button({ type, text, isButtonDisable }: ButtonProps) {
  // Menggunakan switch untuk menentukan gaya tombol berdasarkan tipe
  switch (type) {
    case "primary":
      return (
        <button
          disabled={isButtonDisable} // Tombol dinonaktifkan jika isButtonDisable bernilai true
          className={`font-semibold py-3 px-4 bg-indigo-600 rounded-sm text-white transition-all hover:bg-indigo-800 ${
            isButtonDisable ? "opacity-40 hover:bg-indigo-600" : ""
          }`} // Gaya khusus untuk tombol primary, dengan efek hover yang lebih gelap; jika tombol dinonaktifkan, opacity dikurangi dan efek hover dihilangkan
        >
          {text} {/* Menampilkan teks yang diterima sebagai props */}
        </button>
      );

    case "secondary":
      return (
        <button
          disabled={isButtonDisable} // Tombol dinonaktifkan jika isButtonDisable bernilai true
          className={`font-semibold py-3 px-4 bg-white bg-opacity-25 rounded-sm text-white transition-all hover:bg-indigo-800 ${
            isButtonDisable ? "opacity-40 hover:bg-indigo-600" : ""
          }`} // Gaya khusus untuk tombol secondary, memiliki warna dasar transparan dengan hover warna indigo
        >
          {text} {/* Menampilkan teks yang diterima sebagai props */}
        </button>
      );

    case "white":
      return (
        <button
          disabled={isButtonDisable} // Tombol dinonaktifkan jika isButtonDisable bernilai true
          className={`font-semibold py-3 px-4 bg-white bg-opacity-25 rounded-sm text-white transition-all hover:bg-indigo-800 ${
            isButtonDisable ? "opacity-40 hover:bg-indigo-600" : ""
          }`} // Gaya khusus untuk tombol white, mirip dengan secondary tetapi dengan perbedaan desain (dapat diubah sesuai kebutuhan)
        >
          {text} {/* Menampilkan teks yang diterima sebagai props */}
        </button>
      );
  }
}

export default Button; // Mengekspor komponen Button sebagai default
