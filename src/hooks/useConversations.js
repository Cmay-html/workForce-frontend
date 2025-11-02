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

        if (!response.ok) {
          throw new Error('Failed to fetch conversations');
        }

        const data = await response.json();
        setConversations(data);
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
