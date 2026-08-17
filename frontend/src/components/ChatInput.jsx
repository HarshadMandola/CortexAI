import { Mic, Paperclip, Send } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import sendMessages from "../features/sendMessages";
import { addMessage, setLoading } from "../redux/messageSlice";
import { createConversation } from "../features/createConversation";
import { setSelectedConversation, updateConversationTitle } from "../redux/conversationSlice";
import { updateConversation } from "../features/updateConversation";
import { setArtifact } from "../redux/artifactSlice";

function ChatInput() {
  const [value, setValue] = useState("");

  const { selectedConversation } = useSelector(
    (state) => state.conversations
  );
  const { isLoading } = useSelector((state) => state.message);

  const dispatch = useDispatch();

  const handleSendMessage = async () => {
    if (!value.trim()) return;
    let conversation=selectedConversation
    if (!conversation?._id){
      const conv=await createConversation()
      dispatch(setSelectedConversation(conv))
      conversation=conv
    }
    if (!conversation?._id) return
    const prompt = value.trim();
    if(conversation.title=="New Chat"){
        await updateConversation({id:conversation._id,title:prompt})
        dispatch(updateConversationTitle({conversationId:conversation._id,title:prompt}))
    }


    const payload = {
      prompt,
      conversationId: conversation._id,
    };

    dispatch(
      addMessage({
        role: "user",
        content: prompt,
      })
    );

    setValue("");
    dispatch(setLoading(true));

    try {
      const data = await sendMessages(payload);

      if (data?.artifact) {
        dispatch(setArtifact(data.artifact))
      }

      dispatch(
        addMessage({
          role: "assistant",
          content: data?.answer || "I couldn't generate a response. Please try again.",
          images: data?.images || [],
        })
      );
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="w-full bg-[#212121] border-t border-gray-800 px-6 py-4">
      <div className="max-w-5xl mx-auto bg-[#2f2f2f] rounded-3xl border border-gray-700 p-4">
        <textarea
          rows={2}
          placeholder="Ask anything..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="w-full bg-transparent text-white placeholder-gray-400 resize-none outline-none text-base"
        />

        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-full hover:bg-gray-700 transition">
              <Paperclip className="w-5 h-5 text-gray-300" />
            </button>

            <button className="p-2 rounded-full hover:bg-gray-700 transition">
              <Mic className="w-5 h-5 text-gray-300" />
            </button>
          </div>

          <button
            disabled={!value.trim() || isLoading}
            onClick={handleSendMessage}
            className={`p-3 rounded-full transition ${
              value.trim() && !isLoading
                ? "bg-blue-600 hover:bg-blue-700 text-white"
                : "bg-gray-700 text-gray-500 cursor-not-allowed"
            }`}
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatInput;
