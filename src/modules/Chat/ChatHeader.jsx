/* eslint-disable react/prop-types */
// import LoadingSpinner from "../../common/Loadingspinner";`
import { useGetUserConversationQuery } from "../../redux/feature/chat/conversation/conversation.apiSlice";
const ChatHeader = ({ selectedUser }) => {
  const { data: conversationData, isLoading } = useGetUserConversationQuery({
    user_id: selectedUser,
  });

  const otherUser = conversationData?.data?.other_user;

  if (isLoading || !otherUser) {
    return (
      <div className="flex items-center gap-3 p-4 border-b border-gray-200">
        {/* <p className="text-sm text-gray-500"><LoadingSpinner /></p> */}
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3 p-4 border-b border-gray-200">
      {/* User Avatar */}
      <div className="relative w-10 h-10">
        <img
          src={otherUser.avatar}
          alt={otherUser.name}
          className="w-10 h-10 rounded-full border border-gray-300"
        />
        {/* Online Status */}
        <span
          className={`absolute bottom-0 right-0 w-3 h-3 border-2 border-white rounded-full ${otherUser.online ? "bg-green-500" : "bg-green-500"
            }`}
        ></span>
      </div>

      {/* User Info */}
      <div>
        <p className="text-lg font-semibold">{otherUser.name }</p>
        <p className="text-xs text-gray-500">
          {otherUser.online ? "Online" : "Online"}
        </p>
      </div>
    </div>
  );
};

export default ChatHeader;
