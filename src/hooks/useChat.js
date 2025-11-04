import { useState, useEffect, useCallback, useRef } from 'react';
import { chatService } from '../services/api/chatService';
import { io } from 'socket.io-client';

export const useChat = (projectId) => {
  const [activeConversation, setActiveConversation] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [connectionError, setConnectionError] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState(new Set());
  const wsRef = useRef(null);
  const socketRef = useRef(null);

  // WebSocket connection (legacy) and Socket.IO (preferred)
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

        ws.onerror = () => {
          setConnectionError('WebSocket connection failed');
          setIsConnected(false);
        };

        ws.onclose = () => {
          setIsConnected(false);
        };

        wsRef.current = ws;
      } catch (e) {
        console.error('Chat connection error:', e);
        setConnectionError('Failed to connect to chat');
        setIsConnected(false);
      }
    };

    const connectSocketIO = () => {
      try {
        const base = import.meta.env.VITE_API_URL || window.location.origin;
        const url = base.replace(/\/$/, '');
        const socket = io(url, {
          path: '/socket.io',
          transports: ['websocket', 'polling'],
          auth: {
            token: localStorage.getItem('authToken') || localStorage.getItem('token') || '',
          },
        });

        socket.on('connect', () => {
          setIsConnected(true);
          setConnectionError(null);
          if (projectId) {
            socket.emit('join_project', { projectId });
          }
          if (activeConversation) {
            socket.emit('join_room', { room: activeConversation });
          }
        });

        socket.on('disconnect', () => {
          setIsConnected(false);
        });

        socket.on('connect_error', (err) => {
          console.error('Socket.IO connect_error:', err);
          setConnectionError('Socket connection failed');
          setIsConnected(false);
        });

        socket.on('user_online', ({ userId }) => {
          setOnlineUsers(prev => new Set([...prev, userId]));
        });
        socket.on('user_offline', ({ userId }) => {
          setOnlineUsers(prev => {
            const newSet = new Set(prev);
            newSet.delete(userId);
            return newSet;
          });
        });

        socketRef.current = socket;
      } catch (e) {
        console.error('Socket.IO connection error:', e);
        setConnectionError('Failed to connect to chat');
        setIsConnected(false);
      }
    };

    connectWebSocket();
    connectSocketIO();

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, [projectId, activeConversation]);

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
    if (socketRef.current && socketRef.current.connected) {
      socketRef.current.emit('join_room', { room: conversationId });
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

      if (response.status >= 400) {
        throw new Error('Failed to send message');
      }

      // Message sent successfully - emit via socket for real-time updates if needed
      if (socketRef.current && socketRef.current.connected) {
        socketRef.current.emit('message', { room: activeConversation, content, type, attachments });
      }
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
