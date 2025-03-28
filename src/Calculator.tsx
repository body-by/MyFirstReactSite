import React, { useState, useEffect } from "react";
import "./Calculator.css";
import Button from "./components/ui/button";
import Card from "./components/ui/card";    
import { Sun, Moon } from "lucide-react";

const Calculator: React.FC = () => {
  const [input, setInput] = useState<string>("");
  const [darkMode, setDarkMode] = useState<boolean>(false);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      const { key } = event;
      if (/[0-9+\-*/.=]/.test(key)) {
        handleButtonClick(key);
      } else if (key === "Enter") {
        handleButtonClick("=");
      } else if (key === "Backspace") {
        handleButtonClick("⌫");
      } else if (key === "Escape") {
        handleButtonClick("C");
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [input]);

  const handleButtonClick = (value: string) => {
    if (value === "C") {
      setInput(""); // Очистка дисплея
    } else if (value === "⌫") {
      setInput(input.slice(0, -1)); // Удаление последнего символа
    } else if (value === "=") {
      try {
        const result = eval(input);
        setInput(String(result));
      } catch {
        setInput("Ошибка");
      }
    } else {
      setInput(input + value);
    }
  };

  return (
    <div className={`calculator-container ${darkMode ? "dark-mode" : ""}`}>
      <div className="calculator">
        {/* Кнопка переключения темы */}
        <button onClick={() => setDarkMode(!darkMode)} className="theme-toggle">
          {darkMode ? "🌙" : "☀️"}
        </button>

        {/* Дисплей */}
        <div className="display">{input || "0"}</div>

        {/* Кнопки */}
        <div className="buttons">
          {["7", "8", "9", "/", "4", "5", "6", "*", "1", "2", "3", "-", "0", ".", "=", "+"].map((btn) => (
            <button
              key={btn}
              onClick={() => handleButtonClick(btn)}
              className={`button ${
                btn === "=" ? "btn-equal" :
                btn === "C" ? "btn-clear" :
                btn === "⌫" ? "btn-delete" :
                "btn-number"
              }`}
            >
              {btn}
            </button>
          ))}

          {/* Кнопки очистки и удаления */}
          <button onClick={() => handleButtonClick("C")} className="button btn-clear">C</button>
          <button onClick={() => handleButtonClick("⌫")} className="button btn-delete">⌫</button>
        </div>
      </div>
    </div>
  );
};

export default Calculator;