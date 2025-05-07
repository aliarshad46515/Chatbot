import React, { useState } from "react";
import ChatHeader from "./Components/ChatHeader";
import ChatbotSelection from "./Components/ChatSelection";
import InputArea from "./Components/InputArea";
import MessageList from "./Components/MessageList";
import { Bot, BrainCircuit, Sparkles } from "lucide-react";
import { GoogleGenAI } from "@google/genai";

const gemini = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GEMINI_API_KEY,
});

const chatbots = [
  {
    id: "general",
    name: "General Assistant",
    description: "A helpful assistant for general queries",
    icon: <Bot className="w-6 h-6" />,
  },
  {
    id: "creative",
    name: "Creative Writer",
    description: "Specialized in creative writing and storytelling",
    icon: <Sparkles className="w-6 h-6" />,
  },
  {
    id: "technical",
    name: "Technical Expert",
    description: "For programming and technical questions",
    icon: <BrainCircuit className="w-6 h-6" />,
  },
];

function App() {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [selectedBot, setSelectedBot] = useState(chatbots[0]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    try {
      let botContent = "";

      if (selectedBot.id === "technical") {
        const response = await gemini.models.generateContent({
          model: "gemini-2.0-flash",
          contents: inputMessage,
        });
        botContent = response.text.trim();
      } else {
        const response = await fetch(
          "https://api.aimlapi.com/v1/chat/completions",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              model: "gpt-4o-mini",
              messages: [
                ...messages.map((msg) => ({
                  role: msg.sender === "user" ? "user" : "assistant",
                  content: msg.content,
                })),
                {
                  role: "user",
                  content: inputMessage,
                },
              ],
              temperature: 1,
              top_p: 1,
              max_tokens: 10000,
              stream: false,
              response_format: { type: "text" },
            }),
          }
        );

        const data = await response.json();
        botContent =
          data?.choices?.[0]?.message?.content?.trim() ??
          "No response from the bot.";
      }

      const botMessage = {
        id: (Date.now() + 1).toString(),
        content: botContent,
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("API error:", error);
      const errorMessage = {
        id: (Date.now() + 2).toString(),
        content: "Oops! Something went wrong while fetching a response.",
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <ChatbotSelection
        chatbots={chatbots}
        selectedBot={selectedBot}
        setSelectedBot={setSelectedBot}
      />
      <div className="flex-1 flex flex-col">
        <ChatHeader selectedBot={selectedBot} />
        <MessageList
          messages={messages}
          isLoading={isLoading}
          selectedBot={selectedBot}
        />
        <InputArea
          inputMessage={inputMessage}
          setInputMessage={setInputMessage}
          handleSendMessage={handleSendMessage}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}

export default App;
