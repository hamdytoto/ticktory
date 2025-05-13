/* eslint-disable react/prop-types */
import { FaSearch } from "react-icons/fa";

const ChatSidebar = ({ chats, activeChat, setActiveChat, user }) => {
    return (
        <div className="w-full md:w-80 p-4 bg-white">
            <div className="flex items-center gap-3">
                <div className="relative w-10 h-10">
                    <img className="w-10 h-10 rounded-full" src={user.avatar} alt="test" />
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                </div>
                {/* Search Bar */}
                <div className="flex items-center bg-gray-100 p-3 rounded-[15px]">
                    <FaSearch className="text-gray-400 mx-2" />
                    <input
                        type="text"
                        placeholder="Search"
                        className="bg-transparent outline-none w-full text-sm"
                    />
                </div>
            </div>

            {/* Chat List */}
            <h1 className="text-2xl mt-5 font-bold my-4">Chats</h1>
            <div className="space-y-2">
                {chats.map(chat => (
                    <div
                        key={chat.id}
                        className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all ${activeChat === chat.id ? 'bg-blue-900 text-white' : 'hover:bg-gray-100'}`}
                        onClick={() => setActiveChat(chat.id)}
                    >
                        <img src={chat.avatar} alt={chat.name} className="w-10 h-10 rounded-full" />
                        <div className="flex-1">
                            <p className="font-medium">{chat.name}</p>
                            <p className={`text-sm ${activeChat === chat.id ? 'text-gray-200' : 'text-gray-500'}`}>{chat.lastMessage}</p>
                        </div>
                        <span className={`text-xs ${activeChat === chat.id ? 'text-gray-300' : 'text-gray-400'}`}>{chat.time}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ChatSidebar;
