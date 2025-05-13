/* eslint-disable react/prop-types */

const ChatScreen = ({ messages, user }) => {
    return (
        <div className="flex flex-col bg-gray-100 p-6 space-y-4 overflow-y-auto h-[calc(100vh-160px)]">
            {messages.map((msg, index) => (
                <div
                    key={index}
                    className={`flex items-center ${msg.sender === user.name ? "justify-end" : "justify-start"}`}
                >
                    {msg.sender !== user.name && (
                        <img
                            src={msg.avatar}
                            alt="avatar"
                            className="w-8 h-8 rounded-full mr-2 border border-gray-300"
                        />
                    )}
                    <div
                        className={`rounded-lg px-4 py-2 max-w-xs ${msg.sender === user.name ? "bg-black text-white" : "bg-white text-black border"
                            }`}
                    >
                        <p>{msg.text}</p>
                    </div>
                    {msg.sender === user.name && (
                        <img
                            src={user.avatar}
                            alt="avatar"
                            className="w-8 h-8 rounded-full ml-2 border border-gray-300"
                        />
                    )}
                </div>
            ))}
        </div>
    );
};

export default ChatScreen;
