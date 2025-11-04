import { useState, useEffect, useCallback } from 'react';
import { chatService } from '../services/api/chatService';

export const useMessages = (conversationId) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  // Fetch messages
  const fetchMessages = useCallback(async (beforeMessageId = null, append = false) => {
    if (!conversationId) return;

    try {
      setLoading(true);
      const response = await chatService.getMessages(conversationId, beforeMessageId);
      const data = response.data || [];

      if (append) {
        setMessages(prev => [...(Array.isArray(data) ? data : data.items || []), ...prev]);
      } else {
        setMessages(Array.isArray(data) ? data : data.items || []);
      }

      // If we got fewer messages than requested, no more to load (assume server default 20)
      const length = Array.isArray(data) ? data.length : (data.items || []).length;
      setHasMore(length === 20);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching messages:', err);
    } finally {
      setLoading(false);
    }
  }, [conversationId]);

  // Load more messages
  const loadMoreMessages = useCallback(() => {
    if (messages.length > 0) {
      const oldestMessageId = messages[0].id;
      fetchMessages(oldestMessageId, true);
    }
  }, [messages, fetchMessages]);

  // Initial load
  useEffect(() => {
    if (conversationId) {
      fetchMessages();
    } else {
      setMessages([]);
      setHasMore(true);
    }
  }, [conversationId, fetchMessages]);

  return {
    messages,
    loading,
    error,
    hasMore,
    loadMoreMessages
  };
};
