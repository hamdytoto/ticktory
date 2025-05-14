/* eslint-disable react/prop-types */
import { useState } from "react";
import { AiOutlinePaperClip, AiOutlineSend, AiOutlineClose } from "react-icons/ai";
import { useStoreMessageMutation } from "../../redux/feature/chat/messages/messages.apislice";
import pusher from "./pusherClient";

const ChatInput = ({ onSendMessage, conversationId, ticketId, message, setMessage }) => {
    const [file, setFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);

    const [storeMessage, { isLoading }] = useStoreMessageMutation();

    const handleSend = async () => {
        if (!message.trim() && !file) return;

        const formData = new FormData();
        formData.append("type", file ? "1" : "0");
        formData.append("content", message);
        if (file) formData.append("media", file);
        formData.append("ticket_id", ticketId.toString());
        formData.append("record_duration", "0");
        try {
            await storeMessage({ id: conversationId, body: formData, headers: { "X-Socket-Id": pusher?.connection.socket_id } }).unwrap();
            onSendMessage(message);
            setMessage("");
            setFile(null);
            setPreviewUrl(null);
            // refetch();
        } catch (err) {
            console.error("Failed to send message:", err);
        }
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            if (selectedFile.type.startsWith("image/")) {
                const preview = URL.createObjectURL(selectedFile);
                setPreviewUrl(preview);
            } else {
                setPreviewUrl(null);
            }
        }
    };

    const handleRemoveFile = () => {
        setFile(null);
        setPreviewUrl(null);
    };

    return (
        <div className="flex items-center gap-2 p-3 bg-white border border-gray-200 rounded-full shadow-sm w-full relative">
            {/* File Preview inside input */}
            {file && (
                <div className="absolute left-12 top-1/2 transform -translate-y-1/2 flex items-center gap-2 bg-gray-100 px-2 py-1 rounded-full max-w-[60%] overflow-hidden">
                    {previewUrl ? (
                        <img src={previewUrl} alt="preview" className="w-6 h-6 rounded object-cover" />
                    ) : (
                        <span className="text-xs text-gray-700 truncate">{file.name}</span>
                    )}
                    <button onClick={handleRemoveFile} className="text-red-500 hover:text-red-700">
                        <AiOutlineClose size={12} />
                    </button>
                </div>
            )}

            {/* Attachment Icon */}
            <label className="cursor-pointer text-gray-500 hover:text-gray-700 z-10">
                <AiOutlinePaperClip size={20} />
                <input
                    type="file"
                    className="hidden"
                    onChange={handleFileChange}
                />
            </label>

            {/* Input Field */}
            <input
                type="text"
                className="flex-grow px-4 py-2 text-sm text-gray-800 rounded-full focus:outline-none"
                placeholder={file ? "" : "Type your message..."}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === "Enter") handleSend();
                }}
                style={{
                    paddingLeft: file ? "150px" : undefined, // leave space for file preview
                }}
            />

            {/* Send Button */}
            <button
                className="flex items-center gap-1 px-4 py-2 text-white bg-black rounded-full hover:bg-gray-800 transition"
                onClick={handleSend}
                disabled={isLoading}
            >
                Send <AiOutlineSend size={16} />
            </button>
        </div>
    );
};

export default ChatInput;
