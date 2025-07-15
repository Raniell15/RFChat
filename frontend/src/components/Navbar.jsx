import React from "react";
import { Settings, LogOut, User, Moon, Sun } from "lucide-react";
import { Link } from "react-router-dom";
import { authUserStore } from "../store/authUserStore";
import { appThemeStore } from "../store/appThemeStore";
const Navbar = () => {
  const { logout, authUser } = authUserStore();
  const { isDarkMode, toggleDarkMode } = appThemeStore();
  return (
    <div
      className={`flex justify-between items-center w-full max-w-screen p-4 ${
        isDarkMode ? "bg-black" : "bg-white"
      }`}
    >
      <Link to="/">
        <img className="max-h-12 object-contain" src="/RFCHAT.svg" />
      </Link>

      {authUser ? (
        <div className="flex items-center space-x-4">
          <Link
            className="kosugi-maru-regular text-orange-app1 text-xl flex space-x-1 items-center"
            to="/profile"
          >
            <span className="hidden sm:block">PROFILE</span>
            <User color="#ff7b00" />
          </Link>

          <button
            className="kosugi-maru-regular text-orange-app1 app-navbarbtn text-xl flex space-x-1 items-center"
            onClick={() => logout()}
          >
            <span className="hidden sm:block">LOGOUT</span>
            <LogOut color="#ff7b00" />
          </button>

          {isDarkMode ? (
            <button className="app-navbarbtn" onClick={() => toggleDarkMode()}>
              <Moon color="#ff7b00" />
            </button>
          ) : (
            <button className="app-navbarbtn" onClick={() => toggleDarkMode()}>
              <Sun color="#ff7b00" />
            </button>
          )}
        </div>
      ) : (
        <div className="flex items-center space-x-1">
          <div className="flex items-center space-x-2">
            {isDarkMode ? (
              <button
                className="app-navbarbtn"
                onClick={() => toggleDarkMode()}
              >
                <Moon color="#ff7b00" />
              </button>
            ) : (
              <button
                className="app-navbarbtn"
                onClick={() => toggleDarkMode()}
              >
                <Sun color="#ff7b00" />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
