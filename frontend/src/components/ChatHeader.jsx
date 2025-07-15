import React from "react";
import { useChatStore } from "../store/useChatStore.js";
import { authUserStore } from "../store/authUserStore.js";
import { X } from "lucide-react";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = authUserStore();
  return (
    <div className=" flex justify-between items-center w-full ">
      <div className="flex items-center gap-x-3">
        <img
          src={selectedUser.profilePic || "../avatar.jpg"}
          alt={selectedUser.fullName}
          className="h-14 w-14 rounded-full object-cover overflow-hidden"
        />
        <div>
          <p className="kosugi-maru-regular text-orange-app1 ">
            {selectedUser.fullName}
          </p>
          <p
            className={`kosugi-maru-regular text-sm ${
              onlineUsers.includes(selectedUser._id)
                ? "text-green-500"
                : "text-gray-600"
            }`}
          >
            {onlineUsers.includes(selectedUser._id) ? "online" : "offline"}
          </p>
        </div>
      </div>
      <button onClick={() => setSelectedUser(null)}>
        <X color="#ff7b00" size={24} />
      </button>
    </div>
  );
};

export default ChatHeader;
