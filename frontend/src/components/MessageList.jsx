import { useSelector } from "react-redux";
import { Bot, Sparkles } from "lucide-react";
import MessageBubble from "./MessageBubble";

function MessageList() {
  const { selectedConversation } = useSelector(
    (state) => state.conversations
  );

  const { messages, isLoading } = useSelector((state) => state.message);

  return (
    <div className="flex-1 overflow-y-auto bg-[#212121] px-6 py-8">
      {!selectedConversation || (messages?.length === 0 && !isLoading) ? (
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
                    images={msg.images}
                />
            ))}
          {isLoading && (
            <div className="flex items-start gap-3" aria-live="polite" aria-label="CortexAI is thinking">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-700 text-gray-200">
                <Bot size={18} />
              </div>
              <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-md border border-gray-700 bg-[#2b2b2b] px-4 py-4">
                <span className="h-2 w-2 animate-bounce rounded-full bg-blue-400 [animation-delay:-0.3s]" />
                <span className="h-2 w-2 animate-bounce rounded-full bg-blue-400 [animation-delay:-0.15s]" />
                <span className="h-2 w-2 animate-bounce rounded-full bg-blue-400" />
                <span className="ml-2 text-sm text-gray-400">CortexAI is thinking</span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default MessageList;
