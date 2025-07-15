import React, { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore.js";
import SidebarSkeleton from "./skeletons/SidebarSkeleton.jsx";
import { Users } from "lucide-react";
import { authUserStore } from "../store/authUserStore.js";
import { appThemeStore } from "../store/appThemeStore.js";

const Sidebar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } =
    useChatStore();

  const { onlineUsers, authUser } = authUserStore();
  const { isDarkMode } = appThemeStore();

  const [showOnlineUsers, setShowOnlineUsers] = useState(false);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const filteredUsers = showOnlineUsers
    ? users.filter((user) => onlineUsers.includes(user._id))
    : users;
  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <div className=" flex w-auto flex-col gap-3 h-full overflow-y-auto md:w-80 ">
      <div className="flex flex-col gap-x-2 gap-2 items-center md:ml-9 md:items-start">
        <div className="flex gap-x-2 items-center">
          <Users color="#ff7b00" size={24} />
          <p className="hidden md:block kosugi-maru-regular text-orange-app1 text-xl  ">
            CONTACTS
          </p>
        </div>

        <div className="flex items-center gap-x-2">
          <input
            id="showOnline"
            justify-center
            items-center
            className="checkbox checkbox-sm"
            type="checkbox"
            checked={showOnlineUsers}
            style={{ borderColor: "#ff7b00", color: "#ff7b00" }}
            onChange={(e) => setShowOnlineUsers(e.target.checked)}
          />
          <label htmlFor="showOnline" className="flex items-center gap-x-2">
            <span className="hidden md:block kosugi-maru-regular text-sm text-orange-app1">
              Show Online Users
            </span>
            <span className="hidden md:block text-xs text-gray-500 kosugi-maru-regular">
              ({onlineUsers.filter((id) => id !== authUser._id).length} online)
            </span>
          </label>
        </div>
      </div>
      {(showOnlineUsers ? filteredUsers : users).map((user) => (
        <button
          key={user._id}
          onClick={() => setSelectedUser(user)}
          className={`${selectedUser?._id === user._id ? "bg-app" : ""} ${
            isDarkMode ? "user-btn" : "user-btn-lgt"
          } p-2 md:px-9`}
        >
          <div className="flex items-center gap-x-2">
            <div className="relative">
              <img
                src={user.profilePic || "../avatar.jpg"}
                alt={user.fullName}
                className="h-14 w-14 rounded-full overflow-hidden object-cover"
              />
              {onlineUsers.includes(user._id) && (
                <span className="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full ring-2 ring-zinc-900" />
              )}
            </div>
            <div className="hidden md:block text-left">
              <p className="text-md text-orange-app1 kosugi-maru-regular">
                {user.fullName}
              </p>
              <p
                className={`text-xs kosugi-maru-regular ${
                  onlineUsers.includes(user._id)
                    ? "text-green-500"
                    : "text-gray-600"
                }`}
              >
                {onlineUsers.includes(user._id) ? "online" : "offline"}
              </p>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
};

export default Sidebar;
