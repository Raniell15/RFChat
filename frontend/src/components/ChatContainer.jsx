import React, { useEffect, useRef } from "react";
import { useChatStore } from "../store/useChatStore.js";
import MessagesSkeleton from "./skeletons/MessagesSkeleton.jsx";
import ChatHeader from "./ChatHeader.jsx";
import MessageInput from "./MessageInput.jsx";
import { authUserStore } from "../store/authUserStore.js";
import { formatMessageTime } from "../lib/utils.js";

const ChatContainer = () => {
  const {
    selectedUser,
    messages,
    getMessages,
    isMessagesLoading,
    subscribeToMessages,
    unsubscribeToMessages,
  } = useChatStore();

  const messageEndRef = useRef(null);

  const { authUser } = authUserStore();

  useEffect(() => {
    getMessages(selectedUser?._id);
    subscribeToMessages();

    return () => unsubscribeToMessages();
  }, [
    getMessages,
    selectedUser?._id,
    subscribeToMessages,
    unsubscribeToMessages,
  ]);

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (isMessagesLoading) return <MessagesSkeleton />;

  return (
    <div className="flex flex-col items-center h-full px-4 pb-4 flex-1">
      <ChatHeader />

      <div className="flex-1 overflow-y-auto space-y-4 py-2 w-full">
        {messages.map((message) => (
          <div
            key={message._id}
            className={`chat ${
              message.senderId === authUser._id ? "chat-end" : "chat-start"
            }`}
            ref={messageEndRef}
          >
            <div className="chat-image avatar">
              <div className="size-10 rounded-full">
                <img
                  className=""
                  src={
                    message.senderId === authUser._id
                      ? authUser.profilePic || "../avatar.jpg"
                      : selectedUser.profilePic || "../avatar.jpg"
                  }
                />
              </div>
            </div>
            <div className="chat-header mb-1">
              <time className="text-xs text-gray-600 ml-1 kosugi-maru-regular ">
                {formatMessageTime(message.createdAt)}
              </time>
            </div>
            <div
              className="chat-bubble flex flex-col bg-transparent border"
              style={{ borderColor: "#ff7b00" }}
            >
              {message.image && (
                <img
                  src={message.image}
                  alt="attachment"
                  className="sm:max-w-[200px] rounded-md mb-2"
                />
              )}
              {message.text && (
                <p className="kosugi-maru-regular text-orange-app1">
                  {message.text}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
      <MessageInput />
    </div>
  );
};

export default ChatContainer;
