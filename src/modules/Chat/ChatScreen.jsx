/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useRef } from "react";
import { useGetAllMessagesQuery } from "../../redux/feature/chat/messages/messages.apislice";
import moment from "moment";

const ChatScreen = ({ user, conversationId, ticketId }) => {
    const endRef = useRef(null);

    const { data: messagesData, isLoading } = useGetAllMessagesQuery({
        id: conversationId,
        ticket_id: ticketId,
        per_page: 100,
    });

    const messages = messagesData?.data || [];

    useEffect(() => {
        endRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const renderMedia = (mediaUrl) => {
        const isImage = /\.(jpeg|jpg|png|gif|webp)$/i.test(mediaUrl);
        const isVideo = /\.(mp4|webm|ogg)$/i.test(mediaUrl);
        const isAudio = /\.(mp3|wav|ogg)$/i.test(mediaUrl);

        if (isImage) {
            return (
                <img
                    src={mediaUrl}
                    alt="media"
                    className="mt-2 max-w-full rounded-lg border border-gray-300"
                />
            );
        }

        if (isVideo) {
            return (
                <video
                    controls
                    className="mt-2 max-w-full rounded-lg border border-gray-300"
                >
                    <source src={mediaUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            );
        }

        if (isAudio) {
            return (
                <audio controls className="mt-2 w-full">
                    <source src={mediaUrl} type="audio/mpeg" />
                    Your browser does not support the audio tag.
                </audio>
            );
        }

        // Generic file download
        return (
            <a
                href={mediaUrl}
                download
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-block text-blue-600 underline"
            >
                Download attachment
            </a>
        );
    };

    if (isLoading) return <p className="text-center py-4">Loading messages...</p>;

    return (
        <div className="flex flex-col bg-gray-100 px-4 py-6 space-y-4 overflow-y-auto h-[calc(100vh-250px)]">
            {messages.map((msg) => {
                const isSender = msg.user?.id === user?.id;

                return (
                    <div
                        key={msg.id}
                        className={`flex items-end ${isSender ? "justify-end" : "justify-start"}`}
                    >
                        {!isSender && (
                            <img
                                src={msg.user?.avatar}
                                alt={msg.user?.name}
                                className="w-9 h-9 rounded-full mr-3 border border-gray-300"
                            />
                        )}

                        <div
                            className={`rounded-2xl px-4 py-2 max-w-xs text-sm shadow-md ${isSender
                                ? "bg-blue-600 text-white rounded-br-none"
                                : "bg-white text-black border border-gray-200 rounded-bl-none"
                                }`}
                        >
                            {/* Reply preview */}
                            {msg.parent_message && (
                                <div className="text-xs italic text-gray-500 border-b border-gray-300 mb-1 pb-1">
                                    Replying to: {msg.parent_message.content}
                                </div>
                            )}

                            {/* Message text */}
                            {msg.content && <p>{msg.content}</p>}

                            {/* Render media if exists */}
                            {msg.media && renderMedia(msg.media)}

                            <p className="text-[10px] text-gray-400 mt-1 text-right">
                                {moment(msg.created_at).format("hh:mm A")}
                            </p>
                        </div>

                        {isSender && (
                            <img
                                src={user.avatar}
                                alt={user.name}
                                className="w-9 h-9 rounded-full ml-3 border border-gray-300"
                            />
                        )}
                    </div>
                );
            })}

            <div ref={endRef} />
        </div>
    );
};

export default ChatScreen;
