import '../styles/TypingBubble.css'; // ✅ CSS 경로는 실제 위치에 맞게 조정!

function TypingBubble() {
  return (
    <div className="typing-bubble">
      <span className="typing-dot">.</span>
      <span className="typing-dot">.</span>
      <span className="typing-dot">.</span>
    </div>
  );
}

export default TypingBubble;