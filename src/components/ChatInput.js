import { useState } from 'react';
import '../styles/ChatInput.css';
import { ReactComponent as UploadIcon } from '../assets/photoup.svg';
import { ReactComponent as SendIcon } from '../assets/chatupload.svg';

function ChatInput({ onSend, onImageSend }) {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      onSend(text.trim());
      setText('');
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onImageSend(reader.result); // base64로 변환된 이미지 전달
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="chat-input-wrapper">
      {/* 업로드 버튼 (왼쪽 바깥) */}
      <label htmlFor="image-upload" className="image-upload-btn-outer">
        <UploadIcon />
      </label>
      <input
        id="image-upload"
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        style={{ display: 'none' }}
      />

      {/* 채팅 입력창 */}
      <div className="chat-input-outer">
        <form onSubmit={handleSubmit} className="chat-input-form">
          <input
            type="text"
            className="custom-input"
            placeholder="원하는 괴담을 입력하세요..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          <button type="submit" className="send-btn" aria-label="Send">
            <SendIcon className="send-icon" />
          </button>
        </form>
      </div>
    </div>
  );
}

export default ChatInput;
