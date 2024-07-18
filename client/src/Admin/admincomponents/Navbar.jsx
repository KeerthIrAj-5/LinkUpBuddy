import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../state/index";

export const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/login");
  };

  return (
    <div>
      <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start rtl:justify-end">
              <button
                onClick={toggleSidebar}
                aria-expanded={isSidebarOpen}
                aria-controls="default-sidebar"
                type="button"
                className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              >
                <span className="sr-only">Toggle sidebar</span>
                <svg
                  className="w-6 h-6"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {isSidebarOpen ? (
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M4 5a1 1 0 0 1 0-2h12a1 1 0 1 1 0 2H4zm0 4a1 1 0 0 1 0-2h12a1 1 0 1 1 0 2H4zm0 4a1 1 0 0 1 0-2h12a1 1 0 0 1 0 2H4z"
                    ></path>
                  ) : (
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M4 5a1 1 0 0 1 0-2h12a1 1 0 1 1 0 2H4zm0 4a1 1 0 0 1 0-2h12a1 1 0 0 1 0 2H4zm0 4a1 1 0 0 1 0-2h12a1 1 0 0 1 0 2H4z"
                    ></path>
                  )}
                </svg>
              </button>
              <a href="/admin/alumni" className="flex ms-2 md:me-24">
                <img
                  src="https://www.svgrepo.com/show/27158/student-hat.svg"
                  className="h-8 me-3"
                  alt="LinkUpBuddy Logo"
                />
                <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
                  LinkUpBuddy
                </span>
              </a>
            </div>
            <div className="flex items-center">
              <form className="max-w-md mx-auto">
                <label
                  htmlFor="default-search"
                  className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                >
                  Search
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg
                      className="w-4 h-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 20"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                      />
                    </svg>
                  </div>
                  <input
                    type="search"
                    id="default-search"
                    className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Search here"
                    required
                  />
                  <button
                    type="submit"
                    className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Search
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </nav>

      <aside
        id="default-sidebar"
        className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
            <li>
              <Link
                to="/admin/alumni"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 hover:border-gray-100 dark:hover:bg-gray-700 group"
              >
                <img
                  src="https://www.svgrepo.com/show/481720/student-person-4.svg"
                  className="h-6 me-3"
                  alt="Alumni"
                />
                <span className="ms-3">Alumni</span>
              </Link>
            </li>
            <li>
              <Link
                to="/admin/student"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 hover:border-gray-100 dark:hover:bg-gray-700 group"
              >
                <img
                  src="https://www.svgrepo.com/show/494425/student-management-avatar-people.svg"
                  className="h-6 me-3"
                  alt="Students"
                />
                <span className="ms-3">Students</span>
              </Link>
            </li>
            <li>
              <Link
                to="/admin/companies"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 hover:border-gray-100 dark:hover:bg-gray-700 group"
              >
                <img
                  src="https://www.svgrepo.com/show/487226/company.svg"
                  className="h-6 me-3"
                  alt="Company"
                />
                <span className="flex-1 ms-3 whitespace-nowrap">Company</span>
              </Link>
            </li>
            <li>
              <Link
                to="/admin/queries"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 hover:border-gray-100 dark:hover:bg-gray-700 group"
              >
                <img
                  src="https://www.svgrepo.com/show/270972/mailbox.svg"
                  className="h-6 me-3"
                  alt="Queries"
                />
                <span className="flex-1 ms-3 whitespace-nowrap">Queries</span>
              </Link>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="flex items-center w-full p-2 text-gray-900 rounded-lg bg-white hover:border-gray-100 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 group"
              >
                <img
                  src="https://www.svgrepo.com/show/527785/logout-2.svg"
                  className="h-6 me-3"
                  alt="Logout"
                />
                <span className="ms-3 whitespace-nowrap">Logout</span>
              </button>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  );
};
