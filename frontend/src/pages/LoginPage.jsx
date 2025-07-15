import React, { useState } from "react";
import { User, Mail, Key, Eye, EyeOff, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { authUserStore } from "../store/authUserStore.js";
import toast from "react-hot-toast";
import { appThemeStore } from "../store/appThemeStore.js";

const LoginPage = () => {
  const { login, isLoggingIn } = authUserStore();
  const { isDarkMode } = appThemeStore();
  const validateForm = () => {
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email))
      return toast.error("Invalid email format");
    if (!formData.password.trim()) return toast.error("Password is required");
    if (formData.password.length < 6)
      return toast.error("Password must be at least 6 characters");

    return true;
  };

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const success = validateForm();

    if (success === true) {
      login(formData);
    }
  };

  return (
    <div className="relative h-full bg-[url('/mainbg.jpg')] w-full overflow-hidden bg-cover bg-center bg-no-repeat">
      <div className="absolute inset-0 z-0 bg-black/70  backdrop-blur-xs"></div>
      <div className="relative z-10 flex justify-center mt-20">
        <div
          className={`${
            isDarkMode ? "bg-black" : "bg-white"
          } p-10 gap-x-10 flex flex-col items-center`}
          style={{ borderRadius: "15px" }}
        >
          <img src="../RF.svg" className="h-16" />
          <p className="kosugi-maru-regular text-orange-app1">
            Welcome to RFChat
          </p>
          <form
            action=""
            onSubmit={handleSubmit}
            className="fieldset rounded-box w-xs p-4 space-y-3"
          >
            <div>
              <div className="flex gap-1">
                <Mail color="#ff7b00" className="mb-1" size={20} />
                <label
                  htmlFor="email"
                  className="label mb-1 app-input-label kosugi-maru-regular"
                >
                  Email
                </label>
              </div>
              <input
                id="email"
                type="email"
                className="input app-input"
                placeholder="Email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>

            <div>
              <div className="flex gap-1">
                <Key color="#ff7b00" className="mb-1" size={20} />
                <label
                  htmlFor="password"
                  className="label mb-1 app-input-label kosugi-maru-regular"
                >
                  Password
                </label>
              </div>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  className="input app-input"
                  placeholder="Password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <Eye
                      className="absolute top-4 right-4"
                      color="#ff7b00"
                      size={20}
                    />
                  ) : (
                    <EyeOff
                      className="absolute top-4 right-4"
                      color="#ff7b00"
                      size={20}
                    />
                  )}
                </button>
              </div>
            </div>

            <button
              className="btn btn-neutral mt-2 app-btn kosugi-maru-regular"
              type="submit"
              disabled={isLoggingIn}
            >
              {isLoggingIn ? (
                <>
                  <Loader2 className="size-5 animate-spin" />
                  Loading...
                </>
              ) : (
                "Login"
              )}
            </button>
          </form>
          <p
            className={`kosugi-maru-regular text-xs ${
              isDarkMode ? "text-white" : "text-gray-600"
            }`}
          >
            Don't have an account?{" "}
            <Link to="/signup" className="underline text-orange-app1">
              Create one!
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
