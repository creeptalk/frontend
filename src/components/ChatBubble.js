import React from 'react';
import '../styles/ChatBubble.css';

function ChatBubble({ type, message, image }) {
  const bubbleClass = `chat-bubble ${type === 'user' ? 'user' : 'bot'}`;

  return (
    <div className={bubbleClass}>
      {image ? (
        <img
          src={image}
          alt="uploaded"
          style={{
            width: '112px',
            height: '115px',
            objectFit: 'cover',
            borderRadius: '8px',
          }}
        />
      ) : (
        message
      )}
    </div>
  );
}

export default ChatBubble;
