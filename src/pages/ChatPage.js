// src/pages/ChatPage.js
import { useState, useEffect, useRef } from 'react';
import ChatBubble from '../components/ChatBubble';
import ChatInput from '../components/ChatInput';
import ThemeSelector from '../components/ThemeSelector';
import '../styles/ChatPage.css';
import '../styles/TypingBubble.css';
import '../styles/ChatBubble.css';
import { sendQuery } from '../api/creepApi';

// 🖼️ 배경 이미지
import theme01 from '../assets/theme01-riverside.svg';
import theme02 from '../assets/theme02-hospital.svg';
import theme03 from '../assets/theme03-forest.svg';

const themeMap = { theme01, theme02, theme03 };

function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [isBotTyping, setIsBotTyping] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState(null);
  const chatBoxRef = useRef(null);

  /* ------------------------------ 메시지 전송 ------------------------------ */
  const handleSend = async (text) => {
    if (!text.trim()) return; // 빈 문자열 방지
    setMessages((prev) => [...prev, { type: 'user', text }]);
    setIsBotTyping(true);

    try {
      const data = await sendQuery(text); // 서버 응답
      /* --------------------------------------------------------------------
         서버 응답은 두 가지 형태 중 하나:
         1) 단순 문자열          →  "귀신이 뒤에…"
         2) 객체                 →  { answer: "귀신이 뒤에…" }
      -------------------------------------------------------------------- */
      const answer =
        typeof data === 'string'
          ? data
          : data.answer ?? data.result ?? data.message ?? JSON.stringify(data);

      setMessages((prev) => [...prev, { type: 'bot', text: answer }]);
    } catch (err) {
      console.error('API error:', err);
      const errMsg =
        err?.response?.data ??
        err?.response?.statusText ??
        err?.message ??
        '서버 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.';
      setMessages((prev) => [...prev, { type: 'bot', text: errMsg }]);
    } finally {
      setIsBotTyping(false);
    }
  };

  /* ------------------------------ 이미지 전송 (로컬 미리보기) ------------------------------ */
  const handleSendImage = (base64) => {
    setMessages((prev) => [...prev, { type: 'user', image: base64 }]);
  };

  /* ------------------------------ 테마 선택 ------------------------------ */
  const handleThemeSelect = (themeKey) => {
    setSelectedTheme((prev) => (prev === themeKey ? null : themeKey));
  };

  /* ------------------------------ 스크롤 항상 맨 아래 ------------------------------ */
  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages, isBotTyping]);

  /* ----------------------------------------------------------------------- */
  /*                                  렌더링                                 */
  /* ----------------------------------------------------------------------- */
  return (
    <div className="chat-page-container">
      {selectedTheme && (
        <>
          <div
            className="background-blur"
            style={{ backgroundImage: `url(${themeMap[selectedTheme]})` }}
          />
          <div
            className="background-clear"
            style={{ backgroundImage: `url(${themeMap[selectedTheme]})` }}
          />
        </>
      )}

      <div className="chat-content d-flex flex-column vh-100 justify-content-between p-2">
        {/* 채팅 히스토리 */}
        <div
          ref={chatBoxRef}
          className="flex-grow-1 overflow-auto mb-2 d-flex flex-column gap-2"
        >
          {messages.map((msg, idx) => (
            <ChatBubble
              key={idx}
              type={msg.type}
              message={msg.text}
              image={msg.image}
            />
          ))}
          {isBotTyping && <TypingBubble />}
        </div>

        {/* 테마 선택 */}
        <div className="mb-2">
          <ThemeSelector selectedTheme={selectedTheme} onSelect={handleThemeSelect} />
        </div>

        {/* 입력창 */}
        <ChatInput onSend={handleSend} onImageSend={handleSendImage} />
      </div>
    </div>
  );
}

/* ------------------------------ 타이핑 표시 ------------------------------ */
function TypingBubble() {
  return (
    <div className="typing-bubble">
      <span className="typing-dot">.</span>
      <span className="typing-dot">.</span>
      <span className="typing-dot">.</span>
    </div>
  );
}

export default ChatPage;
