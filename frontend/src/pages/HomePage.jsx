import React from "react";
import Sidebar from "../components/Sidebar";
import { useChatStore } from "../store/useChatStore.js";
import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatContainer";
import { appThemeStore } from "../store/appThemeStore.js";

const HomePage = () => {
  const { selectedUser } = useChatStore();
  const { isDarkMode } = appThemeStore();
  return (
    <div
      className={`${
        isDarkMode ? "bg-black" : "bg-white"
      } h-screen overflow-hidden flex`}
    >
      <Sidebar />

      {selectedUser ? <ChatContainer /> : <NoChatSelected />}
    </div>
  );
};

export default HomePage;
