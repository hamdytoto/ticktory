import { useEffect, useRef, useState } from "react";
// import ChatSidebar from "./sideChat.jsx";
import ChatHeader from "./ChatHeader.jsx";
import ChatScreen from "./ChatScreen.jsx";
import ChatInput from "./ChatMessage.jsx";
import { useUser } from "../../context/userContext.jsx";
import { useParams } from "react-router-dom";
import useQueryParams from "../../hooks/useQueryParams.js";
import pusher from "./pusherClient.js";
import { useGetAllMessagesQuery } from "../../redux/feature/chat/messages/messages.apislice.js";

const ChatUI = () => {
    const { user } = useUser();
    const { conversationId } = useParams();
    const queryParams = useQueryParams();
    const ticketId = queryParams.get("ticket_id");
    const userId = queryParams.get("user_id");
    const messageChannelRef = useRef(null);
    const { data: messagesData } = useGetAllMessagesQuery({
        id: conversationId,
        ticket_id: ticketId,
        per_page: 100,
    });
    const [messagesMp, setMessagesMp] = useState(undefined)

    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const obj = {}
        messagesData?.data.forEach((i) => {
            obj[i.id] = i.id
        })

        setMessagesMp(obj)
        setMessages(messagesData?.data || []);
    }, [messagesData]);


    // console.log('obj', messagesMp)
    // === PUSHER SUBSCRIPTIONS ===
    useEffect(() => {
        if (!user?.id || !conversationId || messagesMp === undefined) return;

        const messageChannel = pusher.subscribe(`conversations.${conversationId}`);
        console.log('channel', pusher.connection.socket_id)
        messageChannelRef.current = messageChannel;
        // 🔁 Listen for conversation list update (last message, etc.)

        // 📥 Listen for new incoming message
        messageChannel.bind("new-message", (data) => {
            console.log('mp', messagesMp)
            if (messagesMp[data.message.id] !== undefined) return

            const obj = { ...messagesMp }
            obj[data.message.id] = data.message.id
            setMessagesMp(obj => {
                return { ...obj, [data.message.id]: data.message.id }
            })
            setMessages((prevMessages) => [...prevMessages, data.message]);
        });

        // messageChannel.bind('client-typing', function (data) {
        //     console.log('you are typing', data)
        // })
        // ❌ Listen for message deleted
        messageChannel.bind("message-deleted", (deletedMessage) => {
            setMessages((prevMessages) =>
                prevMessages.filter((msg) => msg.id !== deletedMessage.id)
            );
        });

        return () => {
            pusher.unsubscribe(`chat.${user.id}`);
            pusher.unsubscribe(`conversations.${conversationId}`);
        };
    }, [user?.id, conversationId, messagesMp]);

    // Log or handle real-time update to conversation


    const [newMessage, setNewMessage] = useState("");
    const [message, setMessage] = useState("");

    const sendMessage = () => {
        if (!newMessage.trim()) return;
        setNewMessage(""); // We'll rely on ChatScreen's Pusher listener to append the message
    };

    // useEffect(() => {
    // if (!messageChannelRef.current) return;

    // const handleTyping = debounce(() => {
    //     if (message.trim("")) {
    //         messageChannelRef.current.trigger("client-typing", {
    //             user_id: user.id,
    //             conversation_id: conversationId,
    //             type: 'start-typing',
    //         });
    //     } else {
    //         messageChannelRef.current.trigger("client-typing", {
    //             user_id: user.id,
    //             conversation_id: conversationId,
    //             type: 'stop-typing',
    //         });
    //     }
    // }, 500)

    //     handleTyping();

    //     return () => {
    //         handleTyping.cancel();
    //     };

    // }, [message, messageChannelRef])

    return (
        <div className="flex flex-col md:flex-row h-100vh w-full overflow-hidden bg-gray-100">
            {/* Optional Sidebar */}
            {/* <div className="hidden md:block w-full md:w-1/4 bg-white border-r">
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
                    <ChatScreen
                        user={user}
                        conversationId={conversationId}
                        ticketId={ticketId}
                        userId={userId}
                        messages={messages}
                    />
                    <ChatInput
                        message={message}
                        setMessage={setMessage}
                        onSendMessage={sendMessage}
                        newMessage={newMessage}
                        setNewMessage={setNewMessage}
                        conversationId={conversationId}
                        ticketId={ticketId}
                    />
                </div>
            </div>
        </div>
    );
};

export default ChatUI;
