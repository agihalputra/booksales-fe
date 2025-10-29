import { useEffect, useState } from "react";
import { showBook } from "../../../_services/books";
import { useParams } from "react-router-dom";
import { bookImageStorage } from "../../../_api";

export default function ShowBook() {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await showBook(id);
        setBook(data);
      } catch (err) {
        console.error("Error fetching book:", err);
      }
    };
    fetchData();
  }, [id]);

  const getCoverPhoto = (photo) => {
    if (!photo) {
      return "https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front.svg";
    }
    if (photo.startsWith("http://") || photo.startsWith("https://")) {
      return photo;
    }
    return `${bookImageStorage}/${photo}`;
  };

  if (!book) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500 dark:text-gray-400 animate-pulse">
          Loading book details...
        </p>
      </div>
    );
  }

  return (
    <section className="py-12 bg-gray-50 dark:bg-gray-900 antialiased transition-all duration-300">
      <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0">
        <div className="lg:grid lg:grid-cols-2 lg:gap-12 xl:gap-16 items-center">
          {/* Gambar Buku */}
          <div className="flex justify-center">
            <div className="relative group">
              <img
                src={getCoverPhoto(book.cover_photo)}
                alt={book.title || "Book cover"}
                className="rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 w-[90%] h-auto object-cover"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 rounded-2xl transition"></div>
            </div>
          </div>

          {/* Detail Buku */}
          <div className="mt-8 lg:mt-0 space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {book.title}
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                JK Rowling
              </p>
            </div>

            <p className="text-4xl font-extrabold text-indigo-600 dark:text-indigo-400">
              Rp{book.price?.toLocaleString("id-ID")}
            </p>

            <div className="flex items-center gap-4">
              <button
                className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
                title="Add to cart"
              >
                <svg
                  className="w-5 h-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-1.293 6.293A1 1 0 007.68 21h8.64a1 1 0 00.973-.707L19 13M9 21a2 2 0 104 0m-4 0a2 2 0 104 0"
                  />
                </svg>
                Add to Cart
              </button>

              <button
                className="px-6 py-3 border border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white rounded-xl font-medium transition-all duration-300"
              >
                Wishlist
              </button>
            </div>

            <hr className="my-6 border-gray-200 dark:border-gray-700" />

            <div>
              <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
                Tentang Buku
              </h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {book.description ||
                  "Buku ini belum memiliki deskripsi lengkap dari penerbit."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
