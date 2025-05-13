/* eslint-disable react/prop-types */
import { useState } from "react";
import { AiOutlinePaperClip, AiOutlineSend } from "react-icons/ai";

const ChatInput = ({ onSendMessage }) => {
    const [message, setMessage] = useState("");

    const handleSend = () => {
        if (message.trim()) {
            onSendMessage(message);
            setMessage("");
        }
    };

    return (
        <div className="flex items-center gap-2 p-3 bg-white border border-gray-200 rounded-full shadow-sm w-full">
            <button className="text-gray-500 hover:text-gray-700">
                <AiOutlinePaperClip size={20} />
            </button>
            <input
                type="text"
                className="flex-grow px-4 py-2 text-sm text-gray-800 rounded-full focus:outline-none"
                placeholder="Type your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === "Enter") handleSend();
                }}
            />
            <button
                className="flex items-center gap-1 px-4 py-2 text-white bg-black rounded-full hover:bg-gray-800 transition"
                onClick={handleSend}
            >
                Send <AiOutlineSend size={16} />
            </button>
        </div>
    );
};

export default ChatInput;
