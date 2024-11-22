import { useState } from "react";
import { useAuthStore } from "../store/authStore";
import { Navigate } from "react-router-dom";

const DashboardPage = () => {
  const { user, logout, isCheckingAuth, updateUser, updateUserPassword } =
    useAuthStore();
  const [activeSection, setActiveSection] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(user?.name || "");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

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

  const saveName = () => {
    updateUser({ ...user, name: editedName });
    setIsEditing(false);
    setSuccessMessage("Name updated successfully!");

    setTimeout(() => {
      setSuccessMessage("");
    }, 2000);
  };

  const handlePasswordChange = () => {

    if (!currentPassword || !newPassword || !confirmPassword) {
      setErrorMessage("Please fill all fields.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }
    updateUserPassword({ currentPassword, newPassword })
      .then(() => {
        setSuccessMessage("Password updated successfully!");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        setErrorMessage("");

        setTimeout(() => {
          setSuccessMessage("");
        }, 2000);
      })
      .catch((err) => {
        setErrorMessage(err.message || "Failed to update password.");
      });
  };

  const renderProfile = () => (
    <section className="mb-6 md:mb-8 ">
      <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">
        Profile Information
      </h2>
      <div className="bg-white rounded-lg shadow-lg p-4 md:p-6 space-y-3 md:space-y-4 ">
        <div className="flex items-center justify-between">
          <p>
            <span className="font-semibold">Name:</span>{" "}
            {isEditing ? (
              <input
                type="text"
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
                className="border rounded-md p-2 w-full md:w-auto"
              />
            ) : (
              user.name
            )}
          </p>
          {isEditing ? (
            <button
              onClick={saveName}
              className="ml-4 py-1 px-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Save
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="ml-4 py-1 px-3 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
            >
              Edit
            </button>
          )}
        </div>
        <p>
          <span className="font-semibold">Email:</span> {user.email}
        </p>
        {successMessage && (
          <div className="mt-4 text-green-600 font-semibold">
            {successMessage}
          </div>
        )}
        {errorMessage && (
          <div className="mt-4 text-red-600 font-semibold">{errorMessage}</div>
        )}
      </div>
    </section>
  );

  const renderAccountActivity = () => (
    <section>
      <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">
        Account Activity
      </h2>
      <div className="bg-white rounded-lg shadow-lg p-4 md:p-6 space-y-3 md:space-y-4">
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
          {user.lastLogin ? new Date(user.lastLogin).toLocaleString() : "N/A"}
        </p>
      </div>
    </section>
  );

  const renderPasswordChange = () => (
    <section className="mb-6 md:mb-8">
      <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">
        Change Password
      </h2>
      <div className="bg-white rounded-lg shadow-lg p-4 md:p-6 space-y-3 md:space-y-4">
        <div className="flex flex-col space-y-3">
          <input
            type="password"
            placeholder="Current Password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="border rounded-md p-2 w-full"
          />
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="border rounded-md p-2 w-full"
          />
          <input
            type="password"
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="border rounded-md p-2 w-full"
          />
          {errorMessage && (
            <div className="mt-2 text-red-600 font-semibold">
              {errorMessage}
            </div>
          )}
          <button
            onClick={handlePasswordChange}
            className="py-1 px-3 bg-gray-600 text-white rounded-md hover:bg-gray-700"
          >
            Change Password
          </button>
        </div>

        {successMessage && (
        <div className="mt-4 text-green-600 font-semibold">{successMessage}</div>
      )}
      </div>
    </section>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col w-screen">
      <header className="bg-gray-800 text-white shadow-md">
        <div className="container mx-auto px-4 md:px-6 py-4 flex justify-between items-center">
          <h1 className="text-lg md:text-2xl font-bold">AuthDashboard</h1>
          <button
            onClick={handleLogout}
            className="py-2 px-4 bg-white text-gray-700 font-semibold rounded-lg shadow hover:bg-gray-100"
          >
            Logout
          </button>
        </div>
      </header>

      <div className="flex flex-1 flex-col md:flex-row">
        <aside className="w-full md:w-1/4 bg-gray-70 shadow-lg p-4 md:p-6 border-b md:border-r border-gray-200 bg-white">
          <h2 className="text-base md:text-lg font-bold mb-4 md:mb-6">
            Navigation
          </h2>
          <ul className="space-y-2 md:space-y-2">
            <li>
              <button
                onClick={() => setActiveSection("profile")}
                className={`block w-full text-left py-2 px-3 rounded-lg  ${
                  activeSection === "profile"
                    ? "bg-gray-100 text-gray-900 font-medium"
                    : " text-gray-800 hover:bg-gray-50"
                }`}
              >
                Profile
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveSection("accountActivity")}
                className={`block w-full text-left py-2 px-3 rounded-lg  ${
                  activeSection === "accountActivity"
                    ? "bg-gray-100 text-gray-900 font-medium"
                    : " text-gray-800 hover:bg-gray-50"
                }`}
              >
                Account Activity
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveSection("changePassword")}
                className={`block w-full text-left py-2 px-3 rounded-lg l ${
                  activeSection === "changePassword"
                    ? "bg-gray-100 text-gray-900 font-medium"
                    : " text-gray-800 hover:bg-gray-50"
                }`}
              >
                Change Password
              </button>
            </li>
          </ul>
        </aside>

        <main className="flex-1 bg-gray-50 p-4 md:p-8">
          <div className="container mx-auto max-w-xl md:max-w-4xl">
            {activeSection === "profile" && renderProfile()}
            {activeSection === "accountActivity" && renderAccountActivity()}
            {activeSection === "changePassword" && renderPasswordChange()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;
