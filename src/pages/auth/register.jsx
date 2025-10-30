import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// Catatan: Karena kita membuat satu file mandiri, kita akan mengasumsikan Link/Router ada,
// tetapi dalam implementasi ini, kita tidak menggunakan routing yang sebenarnya.

// Komponen Register yang sudah disempurnakan dengan state dan validasi
const Register = () => {
  // 1. State untuk menyimpan nilai input form
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    username: '',
    password: '',
    terms: false,
  });

  // 2. State untuk menyimpan pesan kesalahan (error)
  const [errors, setErrors] = useState({});
  const [formMessage, setFormMessage] = useState({ type: '', message: '' });

  // 3. Fungsi utilitas untuk validasi email
  const validateEmail = (email) => {
    // Regex sederhana untuk validasi format email
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // 4. Handler perubahan input
  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: type === 'checkbox' ? checked : value,
    }));
    // Hapus error saat pengguna mulai mengetik
    if (errors[id]) {
        setErrors((prev) => ({ ...prev, [id]: '' }));
    }
    setFormMessage({ type: '', message: '' }); // Clear general message
  };

  // 5. Handler submit form dan Validasi
  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    // Validasi Field Tidak Boleh Kosong
    if (!formData.name.trim()) newErrors.name = 'Nama lengkap tidak boleh kosong.';
    if (!formData.email.trim()) newErrors.email = 'Email tidak boleh kosong.';
    if (!formData.username.trim()) newErrors.username = 'Username tidak boleh kosong.';
    if (!formData.password) newErrors.password = 'Password tidak boleh kosong.';

    // Validasi Format Email
    if (formData.email.trim() && !validateEmail(formData.email)) {
      newErrors.email = 'Format email tidak valid.';
    }

    // Validasi Password Minimal
    if (formData.password && formData.password.length < 6) {
      newErrors.password = 'Password minimal 6 karakter.';
    }

    // Validasi Persetujuan Ketentuan
    if (!formData.terms) newErrors.terms = 'Anda harus menyetujui Syarat & Ketentuan.';

    // Set error dan cek apakah ada error
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      setFormMessage({ type: 'error', message: 'Terdapat kesalahan dalam pengisian formulir.' });
      return;
    }

    // Jika berhasil (simulasi registrasi)
    console.log('Data Registrasi:', formData);
    setFormMessage({ type: 'success', message: 'Registrasi berhasil! Data Anda telah terkirim.' });
    // Reset form (opsional)
    // setFormData({ name: '', email: '', username: '', password: '', terms: false });
  };


  // Helper component for error display
  const ErrorMessage = ({ message }) => (
    <p className="mt-1 text-xs text-red-500">{message}</p>
  );

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 font-sans">
      <div className="w-full max-w-md bg-white rounded-xl shadow-2xl dark:border dark:bg-gray-800 dark:border-gray-700 mx-4">
        <div className="p-6 space-y-6 sm:p-8">
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white text-center">
            Daftar Akun Baru
          </h1>
          
          {/* Form Message (Success/Error) */}
          {formMessage.message && (
            <div className={`p-3 rounded-lg text-sm ${
              formMessage.type === 'success' ? 'bg-green-100 text-green-700 border border-green-300' : 'bg-red-100 text-red-700 border border-red-300'
            }`}>
              {formMessage.message}
            </div>
          )}

          <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
            
            {/* 1. Nama Lengkap */}
            <div>
              <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Nama Lengkap
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={handleChange}
                className={`bg-gray-50 border ${errors.name ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 transition duration-150`}
                placeholder="Masukkan nama lengkap Anda"
              />
              {errors.name && <ErrorMessage message={errors.name} />}
            </div>

            {/* 2. Email */}
            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Alamat Email
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                className={`bg-gray-50 border ${errors.email ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 transition duration-150`}
                placeholder="nama@contoh.com"
              />
              {errors.email && <ErrorMessage message={errors.email} />}
            </div>

            {/* 3. Username */}
            <div>
              <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Username
              </label>
              <input
                type="text"
                id="username"
                value={formData.username}
                onChange={handleChange}
                className={`bg-gray-50 border ${errors.username ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 transition duration-150`}
                placeholder="Pilih username unik"
              />
              {errors.username && <ErrorMessage message={errors.username} />}
            </div>

            {/* 4. Password */}
            <div>
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className={`bg-gray-50 border ${errors.password ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 transition duration-150`}
              />
              {errors.password && <ErrorMessage message={errors.password} />}
            </div>
            
            {/* 5. Terms and Conditions */}
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="terms"
                  type="checkbox"
                  checked={formData.terms}
                  onChange={handleChange}
                  className={`w-4 h-4 border ${errors.terms ? 'border-red-500' : 'border-gray-300'} rounded bg-gray-50 focus:ring-3 focus:ring-indigo-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-indigo-600 dark:ring-offset-gray-800 cursor-pointer`}
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="terms" className="font-light text-gray-500 dark:text-gray-300 cursor-pointer">
                  Saya setuju dengan{" "}
                  <a
                    className="font-medium text-indigo-600 hover:underline dark:text-indigo-500"
                    href="#"
                    onClick={(e) => e.preventDefault()} // Mencegah navigasi placeholder
                  >
                    Syarat & Ketentuan
                  </a>
                </label>
                {errors.terms && <ErrorMessage message={errors.terms} />}
              </div>
            </div>

            {/* Tombol Submit */}
            <button
              type="submit"
              className="w-full text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-lg px-5 py-3 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800 transition duration-150 transform hover:scale-[1.02]"
            >
              Buat Akun
            </button>
            
            {/* Tautan Login */}
            <p className="text-sm font-light text-gray-500 dark:text-gray-400 text-center pt-2">
              Sudah punya akun?{" "}
              <Link
                to="/login"
                className="font-medium text-indigo-600 hover:underline dark:text-indigo-500"
                onClick={(e) => e.preventDefault()} // Mencegah navigasi placeholder
              >
                Masuk di sini
              </Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

// Main App component
export default function App() {
  // Dalam setup file tunggal, kita hanya me-render komponen Register
  return <Register />;
}
