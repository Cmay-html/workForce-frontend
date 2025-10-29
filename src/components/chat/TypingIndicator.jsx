import React, { useState, useEffect } from 'react';

const TypingIndicator = ({ conversationId }) => {
  const [isTyping, setIsTyping] = useState(false);
  const [typingUsers, setTypingUsers] = useState([]);

  // Mock typing indicator - in real implementation, this would listen to WebSocket events
  useEffect(() => {
    if (!conversationId) return;

    // Simulate random typing for demo purposes
    const interval = setInterval(() => {
      setIsTyping(Math.random() > 0.7); // 30% chance of showing typing
      if (Math.random() > 0.5) {
        setTypingUsers(['John Freelancer']);
      } else {
        setTypingUsers([]);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [conversationId]);

  if (!isTyping || typingUsers.length === 0) {
    return null;
  }

  const typingText = typingUsers.length === 1
    ? `${typingUsers[0]} is typing...`
    : `${typingUsers.slice(0, -1).join(', ')} and ${typingUsers[typingUsers.length - 1]} are typing...`;

  return (
    <div className="flex items-center space-x-2 text-sm text-gray-500 px-4 py-2">
      <div className="flex space-x-1">
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
      </div>
      <span>{typingText}</span>
    </div>
  );
};

export default TypingIndicator;
