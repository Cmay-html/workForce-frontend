import api from './index.js';

// Chat-related API services
export const chatService = {
  // Conversations
  getConversations: async (projectId = null) => {
    return api.get('/chat/conversations', { params: projectId ? { projectId } : {} });
  },

  createConversation: async (conversationData) => {
    return api.post('/chat/conversations', conversationData);
  },

  // Messages
  getMessages: async (conversationId, beforeMessageId = null, limit = 20) => {
    const params = { limit };
    if (beforeMessageId) {
      params.before = beforeMessageId;
    }
    return api.get(`/chat/conversations/${conversationId}/messages`, { params });
  },

  sendMessage: async (conversationId, messageData) => {
    return api.post(`/chat/conversations/${conversationId}/messages`, messageData);
  },

  // File uploads
  uploadFile: async (file, conversationId = null) => {
    const formData = new FormData();
    formData.append('file', file);
    if (conversationId) {
      formData.append('conversationId', conversationId);
    }

    return api.post('/chat/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  // Real-time connection (WebSocket)
  connectToChat: (projectId = null) => {
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const host = window.location.host;
    const url = projectId
      ? `${protocol}//${host}/api/chat/ws?projectId=${projectId}`
      : `${protocol}//${host}/api/chat/ws`;

    return new WebSocket(url);
  },

  // Typing indicators
  sendTypingIndicator: async (conversationId, isTyping) => {
    return api.post(`/chat/conversations/${conversationId}/typing`, { isTyping });
  },

  // Message status updates
  markMessagesAsRead: async (conversationId, messageIds) => {
    return api.post(`/chat/conversations/${conversationId}/read`, { messageIds });
  },

  // User presence/online status
  getOnlineUsers: async (projectId = null) => {
    return api.get('/chat/online', { params: projectId ? { projectId } : {} });
  },
};
