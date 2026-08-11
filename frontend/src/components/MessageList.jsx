import React from "react";
import { useSelector } from "react-redux";
import { Sparkles } from "lucide-react";
import MessageBubble from "./MessageBubble";

function MessageList() {
  const { selectedConversation } = useSelector(
    (state) => state.conversations
  );

  const { messages } = useSelector((state) => state.message);

  return (
    <div className="flex-1 overflow-y-auto bg-[#212121] px-6 py-8">
      {!selectedConversation || messages?.length === 0 ? (
        <div className="h-full flex flex-col items-center justify-center text-center">
          <div className="w-20 h-20 rounded-full bg-blue-600 flex items-center justify-center mb-6 shadow-lg">
            <Sparkles className="w-10 h-10 text-white" />
          </div>

          <h1 className="text-4xl font-bold text-white mb-3">
            Cortex AI
          </h1>

          <p className="text-gray-300 text-lg">
            How can I help you today?
          </p>

          <p className="text-gray-500 mt-2">
            Ask me anything. I'm here to help.
          </p>
        </div>
      ) : (
        <div className="max-w-5xl mx-auto space-y-6">
          {messages?.map((msg, index) => (
                <MessageBubble
                    key={msg._id || index}
                    role={msg.role}
                    content={msg.content}
                />
            ))}
        </div>
      )}
    </div>
  );
}

export default MessageList;