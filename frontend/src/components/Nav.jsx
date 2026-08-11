import { Settings, Sparkles } from "lucide-react";
import { useSelector } from "react-redux";

function ChatNavbar() {
  const { selectedConversation } = useSelector(
    (state) => state.conversations
  );

  const { userData } = useSelector((state) => state.user);

  return (
    <header className="h-16 w-full border-b border-gray-800 bg-[#171717] flex items-center justify-between px-6">
      {/* Left */}
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center">
          <Sparkles className="w-5 h-5 text-white" />
        </div>

        <div>
          <h2 className="text-white font-semibold text-lg">
            {selectedConversation?.title || "New Chat"}
          </h2>

          <p className="text-gray-400 text-sm">
            CortexAI Assistant
          </p>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">
        <div className="hidden md:flex items-center gap-2 bg-gray-800 px-3 py-1 rounded-full">
          <span className="w-2 h-2 rounded-full bg-green-500"></span>
          <span className="text-sm text-gray-300">
            GPT-OSS 120B
          </span>
        </div>

        <button className="p-2 rounded-lg hover:bg-gray-800 transition">
          <Settings className="w-5 h-5 text-gray-300" />
        </button>

        {userData?.avatar ? (
          <img
            src={userData.avatar}
            alt="User"
            className="w-10 h-10 rounded-full object-cover border border-gray-700"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-white font-semibold">
            U
          </div>
        )}
      </div>
    </header>
  );
}

export default ChatNavbar;