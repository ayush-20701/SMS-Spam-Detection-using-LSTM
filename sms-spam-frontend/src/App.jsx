import { useState } from "react";

function App() {
  const [message, setMessage] = useState("");
  const [result, setResult] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Call your Flask API
    try {
      const response = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: message }),
      });

      const data = await response.json();
      setResult(data.prediction); // "spam" or "ham"
    } catch (error) {
      console.error("Error:", error);
      setResult("Error making request");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>SMS Spam Detector</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          rows="4"
          cols="50"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Enter your message here..."
          required
        />
        <br />
        <button type="submit">Check Spam</button>
      </form>
      {result && <h3>Prediction: {result}</h3>}
    </div>
  );
}

export default App;
