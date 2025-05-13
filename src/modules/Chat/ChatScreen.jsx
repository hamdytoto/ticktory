/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useRef } from "react";
import { useGetAllMessagesQuery } from "../../redux/feature/chat/messages/messages.apislice";
import moment from "moment"; // Optional for formatting time

const ChatScreen = ({ user, conversationId, ticketId }) => {
  const endRef = useRef(null);

  const { data: messagesData, isLoading } = useGetAllMessagesQuery({
    id: conversationId,
    ticket_id: ticketId,
  });

  const messages = messagesData?.data || [];

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

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
            {/* Avatar (only for received messages) */}
            {!isSender && (
              <img
                src={msg.user?.avatar}
                alt={msg.user?.name}
                className="w-9 h-9 rounded-full mr-3 border border-gray-300"
              />
            )}

            <div
              className={`rounded-2xl px-4 py-2 max-w-xs text-sm shadow-md ${
                isSender
                  ? "bg-blue-600 text-white rounded-br-none"
                  : "bg-white text-black border border-gray-200 rounded-bl-none"
              }`}
            >
              {/* Reply to parent message */}
              {msg.parent_message && (
                <div className="text-xs italic text-gray-500 border-b border-gray-300 mb-1 pb-1">
                  Replying to: {msg.parent_message.content}
                </div>
              )}

              {/* Main message content */}
              <p>{msg.content}</p>

              {/* Optional timestamp */}
              <p className="text-[10px] text-gray-400 mt-1 text-right">
                {moment(msg.created_at).format("hh:mm A")}
              </p>
            </div>

            {/* Avatar for sender (if needed) */}
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
