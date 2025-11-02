import React, { useState, useEffect } from 'react';
import ChatSidebar from './ChatSidebar';
import ChatWindow from './ChatWindow';
import { useChat } from '../../hooks/useChat';
import { useConversations } from '../../hooks/useConversations';

const ChatLayout = ({ projectId }) => {
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const { activeConversation, isConnected, connectionError, joinConversation } = useChat(projectId);
  const { conversations, loading: conversationsLoading } = useConversations(projectId);

  // Auto-select first conversation if none selected
  useEffect(() => {
    if (conversations.length > 0 && !activeConversation) {
      joinConversation(conversations[0].id);
    }
  }, [conversations, activeConversation, joinConversation]);

  // Handle responsive sidebar visibility
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSidebarVisible(!activeConversation);
      } else {
        setSidebarVisible(true);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [activeConversation]);

  const handleConversationSelect = (conversation) => {
    joinConversation(conversation.id);
    // On mobile, hide sidebar when conversation is selected
    if (window.innerWidth < 768) {
      setSidebarVisible(false);
    }
  };

  const handleBackToSidebar = () => {
    setSidebarVisible(true);
  };

  return (
    <div className="flex h-full bg-gray-50">
      {/* Sidebar */}
      {sidebarVisible && (
        <div className="w-80 flex-shrink-0 md:relative absolute inset-y-0 left-0 z-30 md:z-auto">
          <ChatSidebar
            conversations={conversations}
            activeConversation={activeConversation}
            loading={conversationsLoading}
            onConversationSelect={handleConversationSelect}
            projectId={projectId}
          />
        </div>
      )}

      {/* Main Chat Area */}
      <div className="flex-1 md:relative">
        <ChatWindow
          conversation={activeConversation}
          isConnected={isConnected}
          connectionError={connectionError}
          projectId={projectId}
          onBackToSidebar={handleBackToSidebar}
          showBackButton={!sidebarVisible && window.innerWidth < 768}
        />
      </div>

      {/* Mobile overlay when sidebar is open */}
      {sidebarVisible && window.innerWidth < 768 && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={() => setSidebarVisible(false)}
        />
      )}
    </div>
  );
};

export default ChatLayout;
