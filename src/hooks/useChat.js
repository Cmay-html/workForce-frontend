import { useState, useEffect, useCallback, useRef } from 'react';
import { chatService } from '../services/api/chatService';

export const useChat = (projectId) => {
  const [activeConversation, setActiveConversation] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [connectionError, setConnectionError] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState(new Set());
  const wsRef = useRef(null);

  // WebSocket connection
  useEffect(() => {
    if (!projectId) return;

    const connectWebSocket = () => {
      try {
        const ws = chatService.connectToChat(projectId);

        ws.onopen = () => {
          setIsConnected(true);
          setConnectionError(null);
        };

        ws.onmessage = (event) => {
          const data = JSON.parse(event.data);

          switch (data.type) {
            case 'user_online':
              setOnlineUsers(prev => new Set([...prev, data.userId]));
              break;
            case 'user_offline':
              setOnlineUsers(prev => {
                const newSet = new Set(prev);
                newSet.delete(data.userId);
                return newSet;
              });
              break;
            case 'new_message':
              // Handle new message - could emit to other hooks
              break;
            default:
              break;
          }
        };

        ws.onerror = (error) => {
          setConnectionError('WebSocket connection failed');
          setIsConnected(false);
        };

        ws.onclose = () => {
          setIsConnected(false);
        };

        wsRef.current = ws;
      } catch (error) {
        setConnectionError('Failed to connect to chat');
        setIsConnected(false);
      }
    };

    connectWebSocket();

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, [projectId]);

  // Join conversation
  const joinConversation = useCallback((conversationId) => {
    setActiveConversation(conversationId);
    // Send join message via WebSocket if needed
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({
        type: 'join_conversation',
        conversationId
      }));
    }
  }, []);

  // Send message
  const sendMessage = useCallback(async (content, type = 'text', attachments = []) => {
    if (!activeConversation) return;

    try {
      const response = await chatService.sendMessage(activeConversation, {
        content,
        type,
        attachments
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      // Message sent successfully - WebSocket will handle real-time updates
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  }, [activeConversation]);

  // Check if user is online
  const isUserOnline = useCallback((userId) => {
    return onlineUsers.has(userId);
  }, [onlineUsers]);

  return {
    activeConversation,
    isConnected,
    connectionError,
    joinConversation,
    sendMessage,
    isUserOnline
  };
};
