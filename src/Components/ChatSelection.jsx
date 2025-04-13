function ChatbotSelection({ chatbots, selectedBot, setSelectedBot }) {
  return (
    <div className="w-80 bg-white border-r border-gray-200 p-4">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Select Chatbot</h2>
      <div className="space-y-2">
        {chatbots.map((bot) => (
          <button
            key={bot.id}
            onClick={() => setSelectedBot(bot)}
            className={`w-full p-3 flex items-center space-x-3 rounded-lg transition-colors ${
              selectedBot.id === bot.id
                ? "bg-blue-50 text-blue-600"
                : "hover:bg-gray-50 text-gray-700"
            }`}
          >
            <div className="flex-shrink-0">{bot.icon}</div>
            <div className="flex-1 text-left">
              <p className="font-medium">{bot.name}</p>
              <p className="text-sm text-gray-500">{bot.description}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

export default ChatbotSelection;
