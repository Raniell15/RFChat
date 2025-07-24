import React, { useState } from "react";
import { User, Mail, Key, Eye, EyeOff, Loader, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { authUserStore } from "../store/authUserStore.js";
import { appThemeStore } from "../store/appThemeStore.js";
import toast from "react-hot-toast";

const SignupPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showCPassword, setShowCPassword] = useState(false);
  const { isDarkMode } = appThemeStore();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const [cPass, setcPass] = useState({ pass: "" });

  const { signup, isSigningUp } = authUserStore();
  const validateForm = () => {
    if (!formData.fullName.trim()) return toast.error("Full name is required");
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email))
      return toast.error("Invalid email format");
    if (!formData.password) return toast.error("Password is required");
    if (formData.password.length < 6)
      return toast.error("Password must be at least 6 characters");
    if (formData.password !== cPass.pass) {
      return toast.error("Password must be the same");
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = validateForm();
    if (success === true) {
      signup(formData);
    }
  };
  return (
    <div className="relative h-full bg-[url('/mainbg.jpg')] w-full overflow-hidden bg-cover bg-center bg-no-repeat">
      <div className="absolute inset-0 z-0 bg-black/70  backdrop-blur-xs"></div>
      <div className="relative z-10 flex justify-center mt-20">
        <div
          className={`${
            isDarkMode ? "bg-black" : "bg-white"
          } grid  p-10 gap-x-10 justify-center items-center sm:grid-cols-2`}
          style={{ borderRadius: "15px" }}
        >
          <form
            action=""
            onSubmit={handleSubmit}
            className="fieldset flex-col rounded-box w-xs space-y-2 justify-center items-center"
          >
            <div>
              <div className="flex gap-0.5">
                <User color="#ff7b00" className="mb-1" size={20} />
                <label
                  for="fullname"
                  className="label mb-1 app-input-label kosugi-maru-regular"
                >
                  Full Name
                </label>
              </div>

              <input
                id="fullname"
                type="text"
                className="input app-input"
                placeholder="John Doe"
                value={formData.fullName}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    fullName: e.target.value,
                  })
                }
              />
            </div>

            <div>
              <div className="flex gap-1">
                <Mail color="#ff7b00" className="mb-1" size={20} />
                <label
                  for="email"
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
                  for="password"
                  className="label mb-1 app-input-label kosugi-maru-regular"
                >
                  Password
                </label>
              </div>

              <div className="relative">
                <input
                  id="app-input"
                  type={showPassword ? "text" : "password"}
                  className="input app-input"
                  placeholder="Password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      password: e.target.value,
                    })
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

            <div>
              <div className="flex gap-1">
                <Key color="#ff7b00" className="mb-1" size={20} />
                <label
                  for="cpassword"
                  className="label mb-1 app-input-label kosugi-maru-regular"
                >
                  Confirm Password
                </label>
              </div>
              <div className="relative">
                <input
                  id="cpassword"
                  type={showCPassword ? "text" : "password"}
                  className="input app-input"
                  placeholder="Confirm Password"
                  value={cPass.pass}
                  onChange={(e) => setcPass({ ...cPass, pass: e.target.value })}
                />
                <button
                  type="button"
                  onClick={() => setShowCPassword(!showCPassword)}
                >
                  {showCPassword ? (
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
              className="btn btn-neutral mt-1 app-btn kosugi-maru-regular"
              type="submit"
              disabled={isSigningUp}
            >
              {isSigningUp ? (
                <>
                  <Loader2 className="size-5 animate-spin" />
                  Loading...
                </>
              ) : (
                "Create Account"
              )}
            </button>
            <p
              className={`${
                isDarkMode ? "text-white" : "text-zinc-600"
              } kosugi-maru-regular text-xs text-center`}
            >
              Already have an account?{" "}
              <Link to="/login" className="text-orange-app1 underline">
                Sign in
              </Link>
            </p>
          </form>
          <div className="hidden sm:block max-w-xs place-items-center text-justify space-y-5 pt-5">
            <img src="/RF.svg" className="h-14" />
            <img style={{ borderRadius: "15px" }} src="/callcentercat.jpg" />
            <p
              className={`${
                isDarkMode ? "text-white" : "text-zinc-800"
              } kosugi-maru-regular mx-9`}
            >
              <span className="text-orange-app1">RFChat</span>—Where real-time
              conversations spark lasting friendships and vibrant communities.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
