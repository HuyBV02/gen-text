import { useState } from "react";
import "./App.css";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [copySuccess, setCopySuccess] = useState(false); // Thêm trạng thái copy thành công

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleCopy = () => {
    const message = `Trường Copper, trùm kéo view số một Việt Nam, cảm ơn em ${displayValue} đã tặng quà, chúc em ${displayValue} sức khỏe, chúc gia đình em ${displayValue} bình an công việc thuận lợi, 8 3 8 6 nhá, em ${displayValue} mãi đỉnh, mãi đỉnh, mãi đỉnh`;
    navigator.clipboard.writeText(message); // Sao chép đoạn text vào clipboard
    setCopySuccess(true); // Đặt trạng thái copy thành công
    setTimeout(() => setCopySuccess(false), 2000); // Ẩn thông báo sau 2 giây
  };

  const displayValue = inputValue === "" ? "..." : inputValue; // Hiển thị dấu ... nếu chưa có giá trị nhập vào

  return (
    <div className="container">
      <h1>Message Generator</h1>
      <input
        type="text"
        placeholder="Nhập tên của bạn..."
        value={inputValue}
        onChange={handleChange}
      />
      <p>
        Trường Copper, trùm kéo view số một Việt Nam, cảm ơn em{" "}
        <span className="red-text">{displayValue}</span> đã tặng quà, chúc em{" "}
        <span className="red-text">{displayValue}</span> sức khỏe, chúc gia đình em{" "}
        <span className="red-text">{displayValue}</span> bình an công việc thuận lợi,
        8 3 8 6 nhá, em <span className="red-text">{displayValue}</span> mãi đỉnh, mãi
        đỉnh, mãi đỉnh
      </p>
      <button onClick={handleCopy} className="copy-button">Copy</button>
      {copySuccess && <span style={{color:"green", fontSize:"10px", marginLeft:"5px"}} className="copy-success">Copy thành công!</span>} {/* Hiển thị thông báo copy thành công */}
    </div>
  );

}

export default App;
