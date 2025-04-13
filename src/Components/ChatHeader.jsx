function ChatHeader({ selectedBot }) {
  return (
    <div className="bg-white border-b border-gray-200 p-4">
      <div className="flex items-center space-x-3">
        {selectedBot.icon}
        <div>
          <h2 className="font-bold text-gray-800">{selectedBot.name}</h2>
          <p className="text-sm text-gray-500">{selectedBot.description}</p>
        </div>
      </div>
    </div>
  );
}

export default ChatHeader;
