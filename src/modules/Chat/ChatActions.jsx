/* eslint-disable react/prop-types */
// components/ChatActions.jsx
import { useNavigate } from "react-router-dom";
import { FaCommentDots } from "react-icons/fa";
import getUserRole from "../../context/userType";
import { useStoreConversationMutation } from "../../redux/feature/chat/conversation/conversation.apiSlice";

export default function ChatActions({ currentUser, ticket }) {
    const navigate = useNavigate();
    const role = getUserRole(currentUser?.type);
    const [storeConversation] = useStoreConversationMutation();

    const handleChat = async (userId) => {
        console.log('user', userId, ticket.id)
        const conversation = await storeConversation({
            user_id: userId,
            type: 0,
        })
        // console.log('conversation', conversation)
        console.log('conversation', conversation.data?.data.id)

        navigate(`/dashboard/chat/${conversation.data?.data.id}?ticket_id=${ticket.id}&user_id=${userId}`);
        // if (userId) navigate(`/dashboard/chat/${userId}`);
        // if (userId) navigate(`/dashboard/chat/${userId}`, { state: { userId } });
        // if (userId) navigate(`/dashboard/chat`, { state: { userId } });
    };

    const colorClasses = {
        green: "bg-green-500 hover:bg-green-600",
        purple: "bg-blue-500 hover:bg-blue-600",
        blue: "bg-blue-500 hover:bg-blue-600",
        gray: "bg-gray-400 cursor-not-allowed",
    };

    const buttons = {
        user: [
            {
                label: "Technician",
                color: "green",
                user: ticket.technician?.user,
            },
            {
                label: "Manager",
                color: "purple",
                user: ticket.manager?.user,
            },
        ],
        manager: [
            {
                label: "User",
                color: "blue",
                user: ticket.user,
            },
            {
                label: "Technician",
                color: "green",
                user: ticket.technician?.user,
            },
        ],
        technician: [
            {
                label: "User",
                color: "blue",
                user: ticket.user,
            },
            {
                label: "Manager",
                color: "purple",
                user: ticket.manager?.user,
            },
        ],
    };

    return (
        <div className="mt-12">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">💬 Quick Chat</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {buttons[role]?.map(({ label, color, user }) => {
                    const isAvailable = !!user?.id;
                    return (
                        <button
                            key={label}
                            onClick={() => isAvailable && handleChat(user.id)}
                            disabled={!isAvailable}
                            aria-label={`Chat with ${label}`}
                            className={`
                                flex items-center justify-between w-full px-5 py-3 rounded-xl shadow-md 
                                text-white font-semibold transition-all duration-200
                                ${isAvailable ? colorClasses[color] : colorClasses.gray}
                            `}
                        >
                            <div className="flex items-center gap-3">
                                <FaCommentDots size={18} />
                                <span>Chat with {label + " " + user?.name}</span>
                            </div>
                            {!isAvailable && (
                                <span className="text-sm italic opacity-80">Not assigned</span>
                            )}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
