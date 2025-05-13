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
        <div className="flex items-center p-2 border rounded-full bg-white shadow-sm w-[90%] absolute bottom-25 left-15">
            <input
                type="text"
                className="flex-grow px-4 py-2 text-gray-700 rounded-full focus:outline-none"
                placeholder="Type your message here..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            <button className="text-gray-400 hover:text-gray-600 p-2">
                <AiOutlinePaperClip size={20} />
            </button>
            <button
                className="bg-black text-white px-4 py-2 rounded-full flex items-center gap-1 hover:bg-gray-800"
                onClick={handleSend}
            >
                Send <AiOutlineSend size={16} />
            </button>
        </div>
    );
};

export default ChatInput;
