import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  MessageSquare,
  X,
  Send,
  User,
  Bot,
  ArrowRight,
} from "lucide-react";
import { chatService } from "@/lib/chatService";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  id: number;
  message: string;
  isUser: boolean;
  timestamp: Date;
}

const LiveChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [connectionStatus, setConnectionStatus] = useState<
    "connecting" | "connected" | "disconnected" | "error"
  >("disconnected");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      chatService.connect();
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  };

  useEffect(() => {
    if (isOpen) {
      const removeMessageListener = chatService.onMessage((message) => {
        setMessages((prev) => [...prev, message]);
      });

      const removeStatusListener = chatService.onStatusChange((status) => {
        setConnectionStatus(status);
        if (status === "error") {
          toast({
            variant: "destructive",
            title: "Connection Error",
            description: "Failed to connect to chat service.",
          });
        }
      });

      return () => {
        removeMessageListener();
        removeStatusListener();
      };
    }
  }, [isOpen, toast]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    chatService.sendMessage(message);
    setMessage("");
  };

  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-20 right-6 w-96 bg-white rounded-xl shadow-2xl overflow-hidden z-50 border"
          >
            <div className="gradient-bg text-white p-4 flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                  <Bot className="h-5 w-5 text-primary" />
                </div>
                <div className="ml-3">
                  <p className="font-semibold">AI Marketing Assistant</p>
                  <p className="text-xs text-primary-100">
                    {connectionStatus === "connected"
                      ? "Online | Typically replies instantly"
                      : connectionStatus === "connecting"
                      ? "Connecting..."
                      : "Offline"}
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleChat}
                className="text-white hover:bg-white/20"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            <div className="p-4 h-80 overflow-y-auto bg-gray-50">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex mb-4 ${
                    msg.isUser ? "justify-end" : "justify-start"
                  }`}
                >
                  {!msg.isUser && (
                    <div className="w-8 h-8 rounded-full bg-primary-100 flex-shrink-0 flex items-center justify-center">
                      <Bot className="h-4 w-4 text-primary" />
                    </div>
                  )}
                  <div
                    className={`mx-2 p-3 rounded-lg shadow-sm max-w-[75%] ${
                      msg.isUser
                        ? "bg-primary text-white"
                        : "bg-white text-gray-800"
                    }`}
                  >
                    <p>{msg.message}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {formatTime(msg.timestamp)}
                    </p>
                  </div>
                  {msg.isUser && (
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex-shrink-0 flex items-center justify-center">
                      <User className="h-4 w-4 text-gray-600" />
                    </div>
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <form onSubmit={sendMessage} className="p-4 border-t">
              <div className="relative">
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Type your message..."
                  className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
                <Button
                  type="submit"
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-primary hover:text-primary/80"
                  disabled={!message.trim()}
                >
                  <Send className="h-5 w-5" />
                </Button>
              </div>
              <p className="text-xs text-gray-500 mt-2 text-center">
                Powered by AI Marketing Pro
              </p>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="fixed bottom-6 right-6 z-50">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleChat}
          className="w-16 h-16 rounded-full gradient-bg text-white shadow-lg flex items-center justify-center hover:opacity-90 transition-opacity focus:outline-none"
        >
          {isOpen ? <X className="h-6 w-6" /> : <MessageSquare className="h-6 w-6" />}
        </motion.button>
      </div>
    </>
  );
};

export default LiveChat;
