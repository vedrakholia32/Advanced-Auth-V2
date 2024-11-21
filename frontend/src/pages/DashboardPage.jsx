import { motion } from "framer-motion";
import { useAuthStore } from "../store/authStore";
import { formatDate } from "../utils/date";
import { Navigate } from "react-router-dom";

const DashboardPage = () => {
  const { user, logout, isCheckingAuth } = useAuthStore();

  // Loading or not authenticated logic
  if (isCheckingAuth) {
    return (
      <div className="flex justify-center items-center min-h-screen text-xl text-gray-600">
        Loading...
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const handleLogout = () => {
    logout();
    Navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col w-screen">
      {/* Navigation Bar */}
      <header className="bg-gray-800 text-white shadow-md">
        <div className="container mx-auto px-4 md:px-6 py-4 flex justify-between items-center">
          <h1 className="text-lg md:text-2xl font-bold">Dashboard</h1>
          <button
            onClick={handleLogout}
            className="py-2 px-4 bg-white text-gray-700 font-semibold rounded-lg shadow hover:bg-gray-100"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 flex-col md:flex-row">
        {/* Sidebar */}
        <aside className="w-full md:w-1/4 bg-white shadow-lg p-4 md:p-6 border-b md:border-r border-gray-200">
          <h2 className="text-base md:text-lg font-semibold mb-4 md:mb-6">
            Navigation
          </h2>
          <ul className="space-y-2 md:space-y-4">
            <li>
              <a
                href="/profile"
                className="block py-2 px-3 bg-gray-100 rounded-lg text-gray-800 font-medium hover:bg-gray-200"
              >
                Profile
              </a>
            </li>
          </ul>
        </aside>

        {/* Main Section */}
        <main className="flex-1 bg-gray-50 p-4 md:p-8">
          <div className="container mx-auto max-w-xl md:max-w-4xl">
            {/* Profile Section */}
            <section className="mb-6 md:mb-8">
              <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">
                Profile Information
              </h2>
              <div className="bg-white rounded-lg shadow-md p-4 md:p-6 space-y-3 md:space-y-4">
                <p>
                  <span className="font-semibold">Name:</span> {user.name}
                </p>
                <p>
                  <span className="font-semibold">Email:</span> {user.email}
                </p>
              </div>
            </section>

            {/* Account Activity Section */}
            <section>
              <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">
                Account Activity
              </h2>
              <div className="bg-white rounded-lg shadow-md p-4 md:p-6 space-y-3 md:space-y-4">
                <p>
                  <span className="font-semibold">Joined:</span>{" "}
                  {new Date(user.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
                <p>
                  <span className="font-semibold">Last Login:</span>{" "}
                  {formatDate(user.lastLogin)}
                </p>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;
