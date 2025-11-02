import React from 'react';
import { useChat } from '../../hooks/useChat';

const ConversationItem = ({ conversation, isActive, currentUserId, onClick, projectId }) => {
  const { isUserOnline } = useChat(projectId);
  const otherParticipants = conversation.participants.filter(p => p.id !== currentUserId);
  const displayName = otherParticipants.map(p => p.name).join(', ') || 'Unknown';
  const lastMessage = conversation.lastMessage;

  // Check if this is a project conversation or direct message
  const isProjectChat = conversation.projectId && conversation.projectId !== 'direct';
  const projectBadge = isProjectChat ? '🏗️' : null;

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMs = now - date;
    const diffInMinutes = diffInMs / (1000 * 60);
    const diffInHours = diffInMs / (1000 * 60 * 60);
    const diffInDays = diffInMs / (1000 * 60 * 60 * 24);

    if (diffInMinutes < 1) {
      return 'now';
    } else if (diffInMinutes < 60) {
      return `${Math.floor(diffInMinutes)}m`;
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)}h`;
    } else if (diffInDays < 7) {
      return date.toLocaleDateString([], { weekday: 'short' });
    } else {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    }
  };

  // Generate gradient avatar based on conversation ID
  const getAvatarGradient = (id) => {
    const gradients = [
      'from-blue-500 to-purple-600',
      'from-green-500 to-teal-600',
      'from-pink-500 to-rose-600',
      'from-indigo-500 to-blue-600',
      'from-yellow-500 to-orange-600',
      'from-purple-500 to-pink-600'
    ];
    const index = id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % gradients.length;
    return gradients[index];
  };

  return (
    <div
      onClick={onClick}
      className={`p-4 cursor-pointer hover:bg-gray-50 transition-all duration-200 ${
        isActive
          ? 'bg-blue-50 border-r-4 border-blue-500 shadow-sm'
          : 'border-r-4 border-transparent'
      }`}
    >
      <div className="flex items-center space-x-3">
        {/* Avatar */}
        <div className="flex-shrink-0 relative">
          <div className={`w-12 h-12 bg-gradient-to-br ${getAvatarGradient(conversation.id)} rounded-full flex items-center justify-center text-white font-semibold text-sm shadow-sm`}>
            {displayName.charAt(0).toUpperCase()}
          </div>
          {/* Online status indicator for direct messages */}
          {!isProjectChat && otherParticipants.some(p => isUserOnline(p.id)) && (
            <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 flex-1 min-w-0">
              <h3 className={`text-sm font-semibold truncate ${
                isActive ? 'text-blue-900' : 'text-gray-900'
              }`}>
                {displayName}
              </h3>
              {projectBadge && (
                <span className="text-xs" title="Project Chat">{projectBadge}</span>
              )}
            </div>
            <div className="flex items-center space-x-2 flex-shrink-0">
              {lastMessage && (
                <span className="text-xs text-gray-500">
                  {formatTime(lastMessage.timestamp)}
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between mt-1">
            {lastMessage ? (
              <p className={`text-sm truncate flex-1 ${
                conversation.unreadCount > 0
                  ? 'font-medium text-gray-900'
                  : 'text-gray-500'
              }`}>
                {lastMessage.senderId === currentUserId && 'You: '}
                {lastMessage.content}
              </p>
            ) : (
              <p className="text-sm text-gray-400 flex-1">No messages yet</p>
            )}

            {/* Unread indicator */}
            {conversation.unreadCount > 0 && (
              <div className="flex-shrink-0 ml-2">
                <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center shadow-sm">
                  <span className="text-xs text-white font-bold">
                    {conversation.unreadCount > 99 ? '99+' : conversation.unreadCount}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Project badge for project chats */}
          {isProjectChat && (
            <div className="flex items-center mt-1">
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm3 1h6v2H7V5zm0 4h6v2H7V9z" clipRule="evenodd" />
                </svg>
                Project
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConversationItem;
