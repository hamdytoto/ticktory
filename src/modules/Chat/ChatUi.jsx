import { useState } from "react";
import ChatSidebar from "./sideChat.jsx";
import ChatHeader from "./ChatHeader.jsx";
import ChatScreen from "./ChatScreen.jsx";
import ChatInput from "./ChatMessage.jsx";
import { useUser } from "../../context/userContext.jsx";

const users = [
    { id: 1, name: "Waldemar Mannering", lastMessage: "Lorem ipsum dolor sit amet", time: "5 Minutes", avatar: "https://i.pravatar.cc/40?img=1" },
    { id: 2, name: "Felecia Rower", lastMessage: "Lorem ipsum dolor sit amet", time: "5 Minutes", avatar: "https://i.pravatar.cc/40?img=2" },
];

const ChatUI = () => {
    const { user } = useUser();
    const [selectedUser, setSelectedUser] = useState(users[1]);
    const [messages, setMessages] = useState([
        { text: "Hey! How U doing?", sender: "other" },
        { text: "I'm doing Well\nHow can I help You?!", sender: user.name },
    ]);
    const [newMessage, setNewMessage] = useState("");

    const sendMessage = () => {
        if (!newMessage.trim()) return;
        setMessages([...messages, { text: newMessage, sender: "me" }]);
        setNewMessage("");
    };

    return (
        <div className="flex h-screen bg-gray-50 text-gray-900">
            {/* Sidebar */}
            <ChatSidebar
                user={user}
                activeChat={selectedUser.id}
                setActiveChat={setSelectedUser}
                chats={users}
            />

            {/* Chat Window */}
            <div className="flex-1 flex flex-col bg-white shadow-md rounded-xl overflow-hidden ">
                <ChatHeader selectedUser={selectedUser} />
                <div className="flex-1 overflow-auto p-4 relative">
                    <ChatScreen messages={messages} user={user} />
                    <ChatInput
                        onSendMessage={sendMessage}
                        newMessage={newMessage}
                        setNewMessage={setNewMessage}
                    />
                </div>
            </div>
        </div>
    );
};

export default ChatUI;
