import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [copySuccess, setCopySuccess] = useState(false);
  const [voices, setVoices] = useState([]);

  useEffect(() => {
    // Lấy danh sách các voice có sẵn từ speechSynthesis
    const synth = window.speechSynthesis;

    const loadVoices = () => {
      const availableVoices = synth.getVoices();
      setVoices(availableVoices);
    };

    // Đảm bảo load danh sách voice khi nó thay đổi
    synth.onvoiceschanged = loadVoices;
    loadVoices();
  }, []);

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleCopy = () => {

    const message = `Trường Copper, trùm kéo view số một Việt Nam, cảm ơn ${displayValue} đã tặng quà, chúc ${displayValue} sức khỏe, chúc gia đình ${displayValue} bình an công việc thuận lợi, 8 3 8 6 nhá, ${displayValue} mãi đỉnh, mãi đỉnh, mãi đỉnh`;
    navigator.clipboard.writeText(message);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);


  };

  const displayValue = inputValue === "" ? "..." : inputValue;

  const handleSpeak = () => {
    const message = `Trường Copper, trùm kéo view số một Việt Nam, cảm ơn ${displayValue} đã tặng quà, chúc ${displayValue} sức khỏe, chúc gia đình ${displayValue} bình an công việc thuận lợi, 8 3 8 6 nhá, ${displayValue} mãi đỉnh, mãi đỉnh, mãi đỉnh`;

    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(message);

      // Tìm giọng nữ tiếng Việt
      const femaleVoice =
        voices.find(
          (voice) => voice.lang === "vi-VN" && voice.name.includes("female")
        ) || voices.find((voice) => voice.lang === "vi-VN"); // fallback nếu không có giọng nữ

      if (femaleVoice) {
        utterance.voice = femaleVoice; // Cài đặt giọng nữ
      }

      utterance.lang = "vi-VN"; // Cài đặt ngôn ngữ tiếng Việt
      utterance.rate = 1.5; // Cài đặt tốc độ
      utterance.pitch = 2; // Cài đặt cao độ
      window.speechSynthesis.speak(utterance);
    } else {
      alert("Trình duyệt của bạn không hỗ trợ Speech Synthesis.");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSpeak(); // Phát giọng nói khi nhấn Enter
    }
  };

  return (
    <div className="container">
      <h1>Message Generator</h1>
      <input
        type="text"
        placeholder="Nhập tên của bạn..."
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown} // Bắt sự kiện nhấn phím Enter
      />
      <p>
        Trường Copper, trùm kéo view số một Việt Nam, cảm ơn em{" "}
        <span className="red-text">{displayValue}</span> đã tặng quà, chúc em{" "}

        <span className="red-text">{displayValue}</span> sức khỏe, chúc gia đình
        em <span className="red-text">{displayValue}</span> bình an công việc
        thuận lợi, 8 3 8 6 nhá, em{" "}
        <span className="red-text">{displayValue}</span> mãi đỉnh, mãi đỉnh, mãi
        đỉnh

      </p>

      <button onClick={handleCopy} className="copy-button">
        Copy
      </button>
      {copySuccess && (
        <span
          style={{ color: "green", fontSize: "10px", marginLeft: "5px" }}
          className="copy-success"
        >
          Copy thành công!
        </span>
      )}

      {/* Nút để phát giọng nói */}
      <button onClick={handleSpeak} className="speak-button">
        Phát Giọng Nói
      </button>
    </div>
  );
}

export default App;
