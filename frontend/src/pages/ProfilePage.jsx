import React, { useEffect, useState } from "react";
import { User, Mail, Camera } from "lucide-react";
import { authUserStore } from "../store/authUserStore.js";
import { appThemeStore } from "../store/appThemeStore.js";

const ProfilePage = () => {
  const { authUser, updateProfile, isUpdatingProfile } = authUserStore();
  const [selectedImg, setSelectedImg] = useState(null);
  const { isDarkMode } = appThemeStore();
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };

  return (
    <div className="relative h-full bg-[url('/mainbg.jpg')] w-full overflow-hidden bg-cover bg-center bg-no-repeat justify-center items-center flex flex-col">
      <div className="absolute inset-0 z-0 bg-black/70  backdrop-blur-xs"></div>
      <div className="relative z-10 flex flex-col justify-center space-y-5">
        <div
          className={`${
            isDarkMode ? "bg-black" : "bg-white"
          } p-10 flex flex-col justify-center items-center min-w-full space-y-3 px-20`}
          style={{ borderRadius: "15px" }}
        >
          <img src="../RF.svg" className="h-10" alt="RF" />
          <div className="relative">
            <img
              src={selectedImg || authUser.profilePic || "/avatar.jpg"}
              className="h-24 overflow-hidden w-24 object-cover"
              style={{
                border: "3px solid #ff7b00",
                borderRadius: "100%",
              }}
            />
            <div
              className="bg-white max-w-fit justify-center items-center p-1 absolute right-0 bottom-0"
              style={{ borderRadius: "30px", border: "solid 2px #ff7b00" }}
            >
              <label htmlFor="imageUpload">
                <Camera color="#ff7b00" size={20} />
                <input
                  id="imageUpload"
                  type="file"
                  accept="image/*"
                  className="hidden
                  "
                  disabled={isUpdatingProfile}
                  onChange={handleImageUpload}
                />
              </label>
            </div>
          </div>
          <p className="text-sm text-orange-app2 kosugi-maru-regular">
            Click on the camera to change profile picture
          </p>
          <div>
            <div className="flex space-x-0.5 mb-1">
              <User color="#ff7b00" size={20} />
              <label
                htmlFor="fullname"
                className="label app-input-label kosugi-maru-regular"
              >
                Full Name
              </label>
            </div>
            <input
              id="fullname"
              type="text"
              className="input app-input pr-32"
              value={authUser.fullName}
              disabled={true}
            />
          </div>
          <div>
            <div className="flex space-x-1 mb-1">
              <Mail color="#ff7b00" size={20} />
              <label
                htmlFor="email"
                className="label app-input-label kosugi-maru-regular"
              >
                Email
              </label>
            </div>
            <input
              disabled={true}
              id="email"
              type="email"
              className="app-input input pr-32"
              value={authUser.email}
            />
          </div>
        </div>
        <div
          className={`${isDarkMode ? "bg-black" : "bg-white"} p-10 `}
          style={{ borderRadius: "15px" }}
        >
          <p className="kosugi-maru-regular text-orange-app1">
            Account Information
          </p>
          <div className="p-3 flex flex-col space-y-2">
            <div className="flex justify-between">
              <label
                className="app-input-label kosugi-maru-regular text-xs"
                htmlFor="creation"
              >
                Member since
              </label>
              <input
                id="creation"
                type="text"
                value={authUser.createdAt.slice(0, 10)}
                className="text-sm text-orange-app2"
                disabled={true}
                style={{
                  textAlign: "right",
                  fontFamily: "Kosugi Maru",
                }}
              />
            </div>
            <div className="flex justify-between">
              <label
                className="app-input-label kosugi-maru-regular text-xs"
                htmlFor="status"
              >
                Active Status
              </label>
              <input
                id="status"
                type="text"
                className="text-sm"
                style={
                  authUser
                    ? {
                        textAlign: "right",
                        color: "#32c700",
                        fontFamily: "Kosugi Maru",
                      }
                    : {
                        textAlign: "right",
                        color: "#665f5f",
                        fontFamily: "Kosugi Maru",
                      }
                }
                disabled={true}
                value={authUser ? "active" : "offline"}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
