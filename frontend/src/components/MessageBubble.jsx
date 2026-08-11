import React from "react";
import { Bot, User } from "lucide-react";

function MessageBubble({ role, content }) {
  const isUser = role === "user";

  return (
    <div
      className={`w-full flex ${
        isUser ? "justify-end" : "justify-start"
      } mb-6`}
    >
      <div
        className={`flex items-start gap-3 max-w-[80%] ${
          isUser ? "flex-row-reverse" : ""
        }`}
      >
        {/* Avatar */}
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
            isUser
              ? "bg-blue-600 text-white"
              : "bg-gray-700 text-gray-200"
          }`}
        >
          {isUser ? <User size={18} /> : <Bot size={18} />}
        </div>

        {/* Message */}
        <div
          className={`px-5 py-3 rounded-2xl shadow-sm whitespace-pre-wrap break-words ${
            isUser
              ? "bg-blue-600 text-white rounded-br-md"
              : "bg-[#2b2b2b] text-gray-100 rounded-bl-md border border-gray-700"
          }`}
        >
          <p className="text-[15px] leading-7">{content}</p>
        </div>
      </div>
    </div>
  );
}

export default MessageBubble;