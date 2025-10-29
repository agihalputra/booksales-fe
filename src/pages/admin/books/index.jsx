import { useEffect, useState } from "react";
import { deleteBook, getBooks } from "../../../_services/books";
import { Link, useNavigate } from "react-router-dom";

export default function AdminBooks() {
  const [books, setBooks] = useState([]);
  const [openDropdownId, setOpenDropdown] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [booksData] = await Promise.all([getBooks()]);
        setBooks(booksData);
      } catch (error) {
        console.error("Failed to fetch books:", error);
      }
    };
    fetchData();
  }, []);

  const toggleDropdown = (id) => {
    setOpenDropdown(openDropdownId === id ? null : id);
  };

  const handleEdit = (id) => {
    navigate(`/admin/books/edit/${id}`);
    setOpenDropdown(null);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this book?");

    if (confirmDelete) {
      await deleteBook(id);
      setBooks(books.filter((book) => book.id !== id));
    }
  };

  const handleAdd = () => {
    navigate("/admin/books/create");
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5">
      <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
        {/* 🔍 Search Bar + Add Button */}
        <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
          <div className="w-full md:w-1/2">
            <form className="flex items-center">
              <label htmlFor="simple-search" className="sr-only">Search</label>
              <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5 text-gray-500 dark:text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  id="simple-search"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                  placeholder="Search"
                  required
                />
              </div>
            </form>
          </div>

          <div className="w-full md:w-auto flex justify-end">
            <button
              type="button"
              onClick={handleAdd}
              className="flex items-center justify-center text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:ring-indigo-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-indigo-600 dark:hover:bg-indigo-700 focus:outline-none"
            >
              <svg
                className="h-3.5 w-3.5 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  clipRule="evenodd"
                  fillRule="evenodd"
                  d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                />
              </svg>
              Add Product
            </button>
          </div>
        </div>

        {/* 📘 Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Price</th>
                <th className="px-4 py-3">Stock</th>
                <th className="px-4 py-3">Cover</th>
                <th className="px-4 py-3">Genre</th>
                <th className="px-4 py-3">Author</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              {books.length > 0 ? (
                books.map((book) => (
                  <tr key={book.id} className="border-b dark:border-gray-700">
                    <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {book.title}
                    </td>
                    <td className="px-4 py-3">{book.price}</td>
                    <td className="px-4 py-3">{book.stock}</td>
                    <td className="px-4 py-3">
                      {book.cover_photo ? (
                        <a
                          href={`http://127.0.0.1:8000/storage/${book.cover_photo}`}
                          target="_blank"
                          rel="noreferrer"
                          className="text-indigo-600 hover:underline"
                        >
                          {book.cover_photo}
                        </a>
                      ) : (
                        "-"
                      )}
                    </td>

                    <td className="px-4 py-3">{book.genre?.name}</td>
                    <td className="px-4 py-3">{book.author?.name}</td>
                    <td className="px-4 py-3 text-right relative">
                      <button
                        onClick={() => toggleDropdown(book.id)}
                        className="p-1 text-gray-500 hover:text-gray-800 dark:text-gray-400"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM18 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                      </button>

                      {openDropdownId === book.id && (
                        <div className="absolute z-10 right-0 mt-2 w-44 bg-white rounded shadow dark:bg-gray-700">
                          <ul className="py-1 text-sm text-gray-700 dark:text-gray-200">
                            <li>
                              <button
                                onClick={() => handleEdit(book.id)}
                                className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600"
                              >
                                Edit
                              </button>
                            </li>
                            <li>
                              <button
                                onClick={() => handleDelete(book.id)}
                                className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600"
                              >
                                Delete
                              </button>
                            </li>
                          </ul>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center py-4 text-gray-500">
                    Data tidak ditemukan
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
