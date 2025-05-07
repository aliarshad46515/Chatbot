import Message from "./Message";
import { Loader2 } from "lucide-react";

function MessageList({ messages, isLoading, selectedBot }) {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((message) => (
        <Message key={message.id} message={message} />
      ))}
      {isLoading && (
        <div className="flex justify-start">
          <div className="flex items-center space-x-2 bg-gray-100 p-3 rounded-lg text-gray-500">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>{selectedBot.name} is typing...</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default MessageList;
