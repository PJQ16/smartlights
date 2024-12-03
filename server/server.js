const express = require("express");
const cors = require("cors");
const { exec } = require("child_process");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// API เปิดไฟ
app.post("/light/on", (req, res) => {
  exec("python3 control_led.py on", (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error.message}`);
      return res.status(500).json({ error: "Failed to turn on the light" });
    }
    console.log(stdout);
    res.json({ message: "Light turned on", output: stdout });
  });
});

// API ปิดไฟ
app.post("/light/off", (req, res) => {
  exec("python3 control_led.py off", (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error.message}`);
      return res.status(500).json({ error: "Failed to turn off the light" });
    }
    console.log(stdout);
    res.json({ message: "Light turned off", output: stdout });
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
