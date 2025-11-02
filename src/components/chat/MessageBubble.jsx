import React from 'react';

const MessageBubble = ({ message, isGrouped = false }) => {
  const isOwnMessage = message.senderId === 'current-user'; // Replace with actual current user ID
  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Format message content with basic markdown-like formatting
  const formatMessageContent = (content) => {
    if (!content) return '';

    return content
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // Bold
      .replace(/\*(.*?)\*/g, '<em>$1</em>') // Italic
      .replace(/`(.*?)`/g, '<code>$1</code>') // Code
      .replace(/\n/g, '<br>'); // Line breaks
  };

  return (
    <div className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
        isOwnMessage
          ? 'bg-primary-500 text-white'
          : 'bg-gray-200 text-gray-900'
      }`}>
        {/* Sender name for received messages (only show if not grouped) */}
        {!isOwnMessage && !isGrouped && (
          <div className="text-xs text-gray-600 mb-1 font-medium">
            {message.senderName}
          </div>
        )}

        {/* Message content */}
        <div className="text-sm">
          {message.type === 'text' && message.content ? (
            <div
              className="whitespace-pre-wrap break-words"
              dangerouslySetInnerHTML={{ __html: formatMessageContent(message.content) }}
            />
          ) : message.type === 'image' ? (
            <div>
              <img
                src={message.attachments?.[0]?.url || message.content}
                alt="Shared image"
                className="max-w-full rounded cursor-pointer hover:opacity-90"
                onClick={() => window.open(message.attachments?.[0]?.url || message.content, '_blank')}
              />
            </div>
          ) : message.type === 'file' ? (
            <div className="flex items-center space-x-2 p-2 bg-gray-50 rounded">
              <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm0 2h12v10H4V5z" clipRule="evenodd" />
              </svg>
              <div className="flex-1 min-w-0">
                <span className="truncate block font-medium text-gray-900">
                  {message.attachments?.[0]?.name || 'File'}
                </span>
                {message.attachments?.[0]?.size && (
                  <span className="text-xs text-gray-500">
                    {(message.attachments[0].size / 1024).toFixed(1)} KB
                  </span>
                )}
              </div>
              <button
                onClick={() => window.open(message.attachments?.[0]?.url, '_blank')}
                className="text-primary-600 hover:text-primary-700"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </button>
            </div>
          ) : (
            <div dangerouslySetInnerHTML={{ __html: formatMessageContent(message.content) }} />
          )}
        </div>

        {/* Attachments */}
        {message.attachments && message.attachments.length > 0 && (
          <div className="mt-2 space-y-1">
            {message.attachments.map((attachment) => (
              <div
                key={attachment.id}
                className={`flex items-center space-x-2 p-2 rounded text-xs cursor-pointer hover:opacity-80 ${
                  isOwnMessage ? 'bg-primary-500' : 'bg-gray-300'
                }`}
                onClick={() => window.open(attachment.url, '_blank')}
              >
                {attachment.type === 'image' ? (
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                  </svg>
                )}
                <span className="truncate">{attachment.name}</span>
                {attachment.size && (
                  <span className="text-xs opacity-75">
                    ({(attachment.size / 1024).toFixed(1)} KB)
                  </span>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Timestamp and status */}
        <div className={`flex items-center justify-end mt-1 space-x-1 text-xs ${
          isOwnMessage ? 'text-blue-200' : 'text-gray-500'
        }`}>
          <span>{formatTime(message.timestamp)}</span>
          {isOwnMessage && message.status && (
            <span className="flex items-center">
              {message.status === 'sending' && '⏳'}
              {message.status === 'sent' && '✓'}
              {message.status === 'delivered' && '✓✓'}
              {message.status === 'read' && (
                <span className="text-blue-300">✓✓</span>
              )}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
