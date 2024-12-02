const express = require('express');
const os = require('os'); // Move this line before using 'os'
const Gpio = os.platform() === 'darwin' ? require('./mock-gpio').Gpio : require('onoff').Gpio;
const cors = require('cors');
const app = express();
const PORT = 3000;

// เปิดใช้งาน CORS และ JSON Parsing
app.use(cors());
app.use(express.json());

// ตั้งค่า GPIO (Pin 17)
const light = new Gpio(17, 'out');

// API เปิด/ปิดไฟ
app.post('/toggle-light', (req, res) => {
    const { status } = req.body;
    if (status === 'on') {
        light.writeSync(1);
        res.json({ message: 'Light turned on' });
    } else if (status === 'off') {
        light.writeSync(0);
        res.json({ message: 'Light turned off' });
    } else {
        res.status(400).json({ error: 'Invalid status' });
    }
});

// ปิด GPIO เมื่อ Server หยุดทำงาน
process.on('SIGINT', () => {
    light.unexport();
    process.exit();
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
