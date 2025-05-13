/* eslint-disable react/prop-types */

const ChatHeader = ({ selectedUser }) => {
  return (
    <div className="flex items-center gap-3 p-4 border-b border-gray-200">
      {/* User Avatar */}
      <div className="relative w-10 h-10">
        <img
          src={selectedUser.avatar}
          alt={selectedUser.name}
          className="w-10 h-10 rounded-full border border-gray-300"
        />
        {/* Online Status */}
        <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
      </div>
      {/* Username */}
      <span className="text-lg font-semibold">{selectedUser.name}</span>
    </div>
  );
};

export default ChatHeader;