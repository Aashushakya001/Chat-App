import React from "react";

export const Message = () => {
  return (
    <div className="chat chat-end">
      <div className=" chat-image avatar">
        <div className="w-10 rounded-full">
          <img
            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
            alt="tailwind css chat buble"
          />
        </div>
      </div>
      <div className="{`chat-bubble text-white ${bubbleBgColor} ${shakeClass} pb-2`}"> Hi ! What is upp?</div>
      <div className="'chat-footer opacity-50 text-xs flex gap-1 items-center">12:42</div>
    </div>
  );
};
