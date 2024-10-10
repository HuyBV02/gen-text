import { useState } from "react";
import "./App.css";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [audioUrl, setAudioUrl] = useState("");

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };


  const handleSpeak = async () => {
    const message = `Trường Copper, mafia internet trùm kéo view số một Việt Nam, cảm ơn ${inputValue} đã tặng quà, chúc ${inputValue} sức khỏe, chúc gia đình ${inputValue} bình an công việc thuận lợi, 8 3 8 6 nhá, ${inputValue} mãi đỉnh, mãi đỉnh, mãi đỉnh`;

    // Gọi API Google Text-to-Speech
    const apiKey = "AIzaSyBvsVD3lnMNu57gRCavwAR_yiSILGayuWY"; // Thay YOUR_GOOGLE_API_KEY bằng API Key của bạn
    const url = `https://texttospeech.googleapis.com/v1/text:synthesize?key=${apiKey}`;

    const requestBody = {
      input: {
        text: message,
      },
      voice: {
        languageCode: "vi-VN",
        ssmlGender: "FEMALE", // Có thể là MALE, FEMALE, hoặc NEUTRAL
      },
      audioConfig: {
        audioEncoding: "MP3",
        speakingRate: 1.1, // Đặt tốc độ phát
      },
    };


    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();
      const audioContent = data.audioContent;

      // Tạo URL cho file âm thanh
      const audio = new Audio(`data:audio/mp3;base64,${audioContent}`);
      audio.play(); // Phát âm thanh ngay lập tức
    } catch (error) {
      console.error("Error calling Google Text-to-Speech API:", error);
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

        Trường Copper, mafia internet trùm kéo view số một Việt Nam, cảm ơn{" "}
        <span className="red-text">{inputValue}</span> đã tặng quà, chúc{" "}
        <span className="red-text">{inputValue}</span> sức khỏe, chúc gia đình
         <span className="red-text">{inputValue}</span> bình an công việc
        thuận lợi, 8 3 8 6 nhá, {" "}
        <span className="red-text">{inputValue}</span> mãi đỉnh, mãi đỉnh, mãi

        đỉnh

      </p>

      <button onClick={handleSpeak} className="speak-button">
        Phát Giọng Nói
      </button>

      {audioUrl && (
        <div>
          <h3>Audio Preview:</h3>
          <audio controls>
            <source src={audioUrl} type="audio/mp3" />
            Trình duyệt của bạn không hỗ trợ phát âm thanh.
          </audio>
        </div>
      )}
    </div>
  );
}

export default App;
