import React from "react";

const NoChatSelected = () => {
  return (
    <div className="flex flex-col items-center flex-1">
      <img className="mt-56 h-24 animate-bounce" src="../RF.svg" />
      <p className="kosugi-maru-regular text-orange-app2 text-sm pt-1.5">
        RFChat—Real-time connections. lasting friendships.
      </p>
      <p className="kosugi-maru-regular text-orange-app1 text-xl p-4">
        Select a contact to start a conversation!
      </p>
    </div>
  );
};

export default NoChatSelected;
