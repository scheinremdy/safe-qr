const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");
const qrcode = require("qrcode");

const app = express();
app.use(cors());
app.use(express.json());

admin.initializeApp({
  credential: admin.credential.cert(require("./firebaseServiceKey.json")),
  databaseURL: "https://your-firebase-db.firebaseio.com"
});

const db = admin.firestore();

// Generate QR Code Endpoint
app.post("/generate-qr", async (req, res) => {
  try {
    const { childId } = req.body;
    const qrData = `https://yourfrontend.com/child/${childId}`;
    const qrImage = await qrcode.toDataURL(qrData);
    res.json({ qrImage });
  } catch (error) {
    res.status(500).json({ error: "Failed to generate QR code" });
  }
});

// Store Child Data Endpoint
app.post("/child", async (req, res) => {
  try {
    const { name, age, medical, emergencyContact, parentId } = req.body;
    const childRef = db.collection("children").doc();
    await childRef.set({ name, age, medical, emergencyContact, parentId });
    res.json({ id: childRef.id });
  } catch (error) {
    res.status(500).json({ error: "Failed to store child data" });
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));
