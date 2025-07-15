import React, { use, useState, useRef } from "react";
import { useChatStore } from "../store/useChatStore.js";
import { Image, Send, X } from "lucide-react";

const MessageInput = () => {
  const [text, setText] = useState("");
  const [imgPreview, setImgPreview] = useState(null);
  const fileInputRef = useRef(null);
  const { sendMessage } = useChatStore();
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload a valid image file.");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      setImgPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim() && !imgPreview) return;
    try {
      await sendMessage({
        text: text.trim(),
        image: imgPreview,
      });

      setText("");
      setImgPreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Failed to send message. Please try again.");
    }
  };
  const removeImg = () => {
    setImgPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="flex flex-col w-full">
      {imgPreview && (
        <div className="relative max-w-fit p-2.5">
          <img
            src={imgPreview}
            alt="img"
            className="max-w-lg max-h-32 rounded-2xl object-cover overflow-hidden"
          />
          <button
            onClick={() => removeImg()}
            className="absolute top-1 right-1 bg-app2 rounded-full p-1"
          >
            <X color="white" size={14} />
          </button>
        </div>
      )}
      <form onSubmit={handleSendMessage} className="flex items-center gap-4">
        <input
          type="text"
          placeholder="Type a message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="input app-send pl-5 w-full"
        />
        <label htmlFor="imgUpload">
          <input
            type="file"
            accept="image/*"
            id="imgUpload"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImageChange}
          />
          <Image color="#ff7b00" size={24} />
        </label>
        <button type="submit" disabled={!text && !imgPreview}>
          <Send
            color={!text && !imgPreview ? "#964800" : "#ff7b00"}
            size={24}
          />
        </button>
      </form>
    </div>
  );
};

export default MessageInput;
