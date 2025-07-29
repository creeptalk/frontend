import '../styles/ThemeSelector.css';

const themeLabels = {
  theme01: '물속의 것',
  theme02: '0시 병동',
  theme03: '침묵의 숲',
};

function ThemeSelector({ selectedTheme, onSelect }) {
  return (
    <div className="theme-selector">
      <div className="theme-title">테마 선택</div>
      <div className="theme-buttons">
        {Object.entries(themeLabels).map(([themeKey, label]) => (
          <button
            key={themeKey}
            className={`theme-button ${
              selectedTheme === themeKey ? 'active' : ''
            }`}
            onClick={() => onSelect(themeKey)}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default ThemeSelector;
