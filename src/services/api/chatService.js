// Chat-related API services
export const chatService = {
  // Conversations
  getConversations: async (projectId = null) => {
    const url = projectId
      ? `/api/chat/conversations?projectId=${projectId}`
      : '/api/chat/conversations';
    return fetch(url);
  },

  createConversation: async (conversationData) => {
    return fetch('/api/chat/conversations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(conversationData),
    });
  },

  // Messages
  getMessages: async (conversationId, beforeMessageId = null, limit = 20) => {
    const params = new URLSearchParams({ limit: limit.toString() });
    if (beforeMessageId) {
      params.append('before', beforeMessageId);
    }
    return fetch(`/api/chat/conversations/${conversationId}/messages?${params}`);
  },

  sendMessage: async (conversationId, messageData) => {
    return fetch(`/api/chat/conversations/${conversationId}/messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(messageData),
    });
  },

  // File uploads
  uploadFile: async (file, conversationId = null) => {
    const formData = new FormData();
    formData.append('file', file);
    if (conversationId) {
      formData.append('conversationId', conversationId);
    }

    return fetch('/api/chat/upload', {
      method: 'POST',
      body: formData,
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
    return fetch(`/api/chat/conversations/${conversationId}/typing`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ isTyping }),
    });
  },

  // Message status updates
  markMessagesAsRead: async (conversationId, messageIds) => {
    return fetch(`/api/chat/conversations/${conversationId}/read`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ messageIds }),
    });
  },

  // User presence/online status
  getOnlineUsers: async (projectId = null) => {
    const url = projectId
      ? `/api/chat/online?projectId=${projectId}`
      : '/api/chat/online';
    return fetch(url);
  },
};
