import { useState, useEffect } from 'react';
import { chatService } from '../services/api/chatService';

export const useConversations = (projectId) => {
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        setLoading(true);
        const response = await chatService.getConversations(projectId);
        const data = response.data || [];
        setConversations(Array.isArray(data) ? data : data.items || []);
        setError(null);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching conversations:', err);
      } finally {
        setLoading(false);
      }
    };

    if (projectId) {
      fetchConversations();
    }
  }, [projectId]);

  return {
    conversations,
    loading,
    error
  };
};
