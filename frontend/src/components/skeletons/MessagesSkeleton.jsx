import React from "react";

const MessagesSkeleton = () => {
  return (
    <div className="flex flex-col mt-10 px-4 flex-1 gap-y-5">
      <div className="flex w-52 flex-col gap-4">
        <div className="flex items-center gap-4">
          <div className="skeleton h-16 w-16 shrink-0 rounded-full"></div>
          <div className="flex flex-col gap-4">
            <div className="skeleton h-4 w-20"></div>
            <div className="skeleton h-4 w-28"></div>
          </div>
        </div>
      </div>
      <div className="">
        <div className="flex flex-col gap-4 w-full">
          <div className="flex align-bottom gap-4">
            <div className="skeleton h-16 w-16 shrink-0 rounded-full"></div>
            <div className="skeleton h-56 w-56"></div>
          </div>
        </div>
        <div className="flex flex-col gap-4 items-end w-full">
          <div className="flex align-bottom gap-4">
            <div className="flex flex-col gap-4 items-end">
              <div className="skeleton h-4 w-20"></div>
              <div className="skeleton h-4 w-28"></div>
              <div className="skeleton h-32 w-52"></div>
            </div>
            <div className="skeleton h-16 w-16 shrink-0 rounded-full"></div>
          </div>
        </div>
        <div className="flex w-52 flex-col gap-4">
          <div className="flex align-bottom gap-4">
            <div className="skeleton h-16 w-16 shrink-0 rounded-full"></div>
            <div className="flex flex-col gap-4">
              <div className="skeleton h-4 w-20"></div>
              <div className="skeleton h-4 w-40"></div>
              <div className="skeleton h-4 w-40"></div>
              <div className="skeleton h-4 w-40"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessagesSkeleton;
