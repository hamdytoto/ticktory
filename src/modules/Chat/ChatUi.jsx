import { useState } from "react";
// import ChatSidebar from "./sideChat.jsx";
import ChatHeader from "./ChatHeader.jsx";
import ChatScreen from "./ChatScreen.jsx";
import ChatInput from "./ChatMessage.jsx";
import { useUser } from "../../context/userContext.jsx";
import { useParams } from "react-router-dom";
import useQueryParams from "../../hooks/useQueryParams.js";

const users = [
    {
        id: 1,
        name: "Waldemar Mannering",
        lastMessage: "Lorem ipsum dolor sit amet",
        time: "5 Minutes",
        avatar: "https://i.pravatar.cc/40?img=1",
    },
    {
        id: 2,
        name: "Felecia Rower",
        lastMessage: "Lorem ipsum dolor sit amet",
        time: "5 Minutes",
        avatar: "https://i.pravatar.cc/40?img=2",
    },
];

const ChatUI = () => {
    const { user } = useUser();
    const { conversationId } = useParams()
    console.log('conversationId', conversationId)
    const queryParams = useQueryParams();
    const ticketId = queryParams.get("ticket_id");
    const userId = queryParams.get("user_id");


    // eslint-disable-next-line no-unused-vars
    const [selectedUser, setSelectedUser] = useState(users[1]);
    const [messages, setMessages] = useState([
        { text: "Hey! How U doing?", sender: "other" },
        { text: "I'm doing Well\nHow can I help You?!", sender: user.name },
        { text: "Hi", sender: "other" },
        { text: "How are you?", sender: user.name },
        { text: "I'm doing well, thanks for asking!", sender: "other" },
        { text: "What about you?", sender: user.name },
        { text: "I'm good too, thanks!", sender: "other" },
        { text: "What are you up to?", sender: user.name },
        { text: "Just working on some projects.", sender: "other" },
        { text: "Sounds interesting!", sender: user.name },
        { text: "What are you working on?", sender: user.name },
        { text: "I'm working on a new project.", sender: "other" },
        { text: "That's cool!", sender: user.name },
        { text: "What are you working on?", sender: user.name },
        { text: "I'm working on a new project.", sender: "other" },
        { text: "That's cool!", sender: user.name },
        { text: "What are you working on?", sender: user.name },
        { text: "I'm working on a new project.", sender: "other" },
    ]);
    const [newMessage, setNewMessage] = useState("");

    const sendMessage = () => {
        if (!newMessage.trim()) return;
        setMessages([...messages, { text: newMessage, sender: user.name }]);
        setNewMessage("");
    };

    return (
        <div className="flex flex-col md:flex-row h-100vh w-full overflow-hidden bg-gray-100">
            {/* Sidebar - optional
            <div className="hidden md:block w-full md:w-1/4 bg-white border-r">
                <ChatSidebar
                    user={user}
                    activeChat={selectedUser.id}
                    setActiveChat={setSelectedUser}
                    chats={users}
                />
            </div> */}

            {/* Chat Section */}
            <div className="flex flex-col flex-1 bg-white shadow-md rounded-none md:rounded-xl">
                <ChatHeader selectedUser={userId} />
                <div className="flex-1 overflow-y-auto px-4 py-2">
                    <ChatScreen user={user} conversationId={conversationId} ticketId={ticketId} userId={userId} />
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
