/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { FaCommentDots } from "react-icons/fa";
import getUserRole from "../../context/userType";
import { useStoreConversationMutation } from "../../redux/feature/chat/conversation/conversation.apislice";
import { useTranslation } from "react-i18next";

export default function ChatActions({ currentUser, ticket }) {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const role = getUserRole(currentUser?.type);
    const [storeConversation] = useStoreConversationMutation();

    const handleChat = async (userId) => {
        const conversation = await storeConversation({
            user_id: userId,
            type: 0,
        });
        navigate(`/dashboard/chat/${conversation.data?.data.id}?ticket_id=${ticket.id}&user_id=${userId}`);
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
                label: t("chat.technician"),
                color: "green",
                user: ticket.technician?.user,
            },
            {
                label: t("chat.manager"),
                color: "purple",
                user: ticket.manager?.user,
            },
        ],
        manager: [
            {
                label: t("chat.user"),
                color: "blue",
                user: ticket.user,
            },
            {
                label: t("chat.technician"),
                color: "green",
                user: ticket.technician?.user,
            },
        ],
        technician: [
            {
                label: t("chat.user"),
                color: "blue",
                user: ticket.user,
            },
            {
                label: t("chat.manager"),
                color: "purple",
                user: ticket.manager?.user,
            },
        ],
    };

    return (
        <div className="mt-12">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">{t("chat.quickChat")}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {buttons[role]?.map(({ label, color, user }) => {
                    const isAssigned = !!user?.id;
                    const isChatDisabled = ticket.status === 2 || ticket.status === 3;
                    const isAvailable = isAssigned && !isChatDisabled;
                    return (
                        <button
                            key={label}
                            onClick={() => isAvailable && handleChat(user.id)}
                            disabled={!isAvailable}
                            aria-label={t("chat.chatWith", { label })}
                            className={`
                                flex items-center justify-between w-full px-5 py-3 rounded-xl shadow-md 
                                text-white font-semibold transition-all duration-200
                                ${isAvailable ? colorClasses[color] : colorClasses.gray}
                            `}
                        >
                            <div className="flex items-center gap-3">
                                <FaCommentDots size={18} />
                                <span>
                                    {t("chat.chatWith", { label })}{user?.name ? " " + user.name : ""}
                                </span>
                            </div>
                            {!isAvailable && (
                                <span className="text-sm italic opacity-80">
                                    {isChatDisabled
                                        ? t("chat.resolvedOrClosed")
                                        : t("chat.notAssigned")}
                                </span>
                            )}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
