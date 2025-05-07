import { User, Bot as BotIcon } from "lucide-react";

function Message({ message }) {
  const formatMessage = (message) => {
    const sections = message
      .split(/(###|\n)/)
      .map((section) => section.trim())
      .filter(Boolean);
    return sections.map((section, index) => (
      <div key={index} className="mb-2">
        {/^[0-9]+\.\s/.test(section) ? (
          <p className="mb-1">
            {section
              .split(/(\*\*[^*]+\*\*)/)
              .map((part, i) =>
                part.startsWith("**") && part.endsWith("**") ? (
                  <strong key={i}>{part.slice(2, -2)}</strong>
                ) : (
                  part
                )
              )}
          </p>
        ) : (
          <p>
            {section
              .split(/(\*\*[^*]+\*\*)/)
              .map((part, i) =>
                part.startsWith("**") && part.endsWith("**") ? (
                  <strong key={i}>{part.slice(2, -2)}</strong>
                ) : (
                  part
                )
              )}
          </p>
        )}
      </div>
    ));
  };
  return (
    <div
      className={`flex ${
        message.sender === "user" ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`flex items-start space-x-2 max-w-xl ${
          message.sender === "user" ? "flex-row-reverse space-x-reverse" : ""
        }`}
      >
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center ${
            message.sender === "user"
              ? "bg-blue-100 text-blue-600"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          {message.sender === "user" ? (
            <User className="w-5 h-5" />
          ) : (
            <BotIcon className="w-5 h-5" />
          )}
        </div>
        <div
          className={`p-3 rounded-lg ${
            message.sender === "user"
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-800"
          }`}
        >
          {formatMessage(message.content)}
        </div>
      </div>
    </div>
  );
}

export default Message;
