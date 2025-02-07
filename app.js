import React, { useState } from "react";
import axios from "axios";

const App = () => {
  const [childId, setChildId] = useState("");
  const [qrImage, setQrImage] = useState("");

  const generateQR = async () => {
    const response = await axios.post("http://localhost:5000/generate-qr", { childId });
    setQrImage(response.data.qrImage);
  };

  return (
    <div className="flex flex-col items-center p-5">
      <h1 className="text-xl font-bold">Child Safety QR Code</h1>
      <input
        type="text"
        placeholder="Enter Child ID"
        value={childId}
        onChange={(e) => setChildId(e.target.value)}
        className="p-2 border rounded"
      />
      <button onClick={generateQR} className="p-2 mt-2 bg-blue-500 text-white rounded">
        Generate QR Code
      </button>
      {qrImage && <img src={qrImage} alt="QR Code" className="mt-4" />}
    </div>
  );
};

export default App;
