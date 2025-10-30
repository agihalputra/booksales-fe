import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login, useDecodedToken } from "../../_services/auth";

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Ambil token dari localStorage
  const token = localStorage.getItem("accessToken");
  const decodedData = useDecodedToken(token);

  // Handle input perubahan
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await login(formData);

      // Simpan token dan user info di localStorage
      localStorage.setItem("accessToken", response.token);
      localStorage.setItem("userInfo", JSON.stringify(response.user));

      // Arahkan user berdasarkan role
      if (response.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }

      console.log("Login response:", response);


    } catch (error) {
      // Tampilkan pesan error dari backend jika ada
      const message =
        error?.response?.data?.message ||
        "Login gagal. Periksa kembali email dan password Anda.";
      setError(message);
      console.error("Login error:", message);
    } finally {
      setLoading(false);
    }
  };

  // Jika user sudah login dan token masih valid → redirect
  useEffect(() => {
    if (token && decodedData?.success) {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      if (userInfo?.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    }
  }, [token, decodedData, navigate]);
  

  return (
    <section className="bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center">
      <div className="w-full bg-white rounded-lg shadow dark:border sm:max-w-md dark:bg-gray-800 dark:border-gray-700">
        <div className="p-6 space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center">
            Sign in to your account
          </h1>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 text-sm px-4 py-2 rounded">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                placeholder="name@company.com"
                required
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                required
              />
            </div>

            <div className="flex items-start">
              <input
                id="terms"
                type="checkbox"
                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-indigo-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-indigo-600"
                required
              />
              <label
                htmlFor="terms"
                className="ml-2 text-sm font-light text-gray-500 dark:text-gray-300"
              >
                I accept the{" "}
                <Link
                  to="#"
                  className="font-medium text-indigo-600 hover:underline dark:text-indigo-500"
                >
                  Terms and Conditions
                </Link>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>

            <p className="text-sm font-light text-gray-500 dark:text-gray-400 text-center">
              Don’t have an account yet?{" "}
              <Link
                to="/register"
                className="font-medium text-indigo-600 hover:underline dark:text-indigo-500"
              >
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
