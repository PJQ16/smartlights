// นำเข้า Express.js เพื่อใช้สร้างเว็บเซิร์ฟเวอร์
const express = require('express');

// นำเข้า os module เพื่อตรวจสอบระบบปฏิบัติการ
/* const os = require('os'); */

// ตรวจสอบระบบปฏิบัติการ หากเป็น macOS (darwin) ให้ใช้ mock-gpio แทน onoff
// แต่ถ้าไม่ใช่ (เช่น Linux บน Raspberry Pi) ให้ใช้ onoff สำหรับควบคุม GPIO
/* const Gpio = os.platform() === 'darwin' ? require('./mock-gpio').Gpio : require('onoff').Gpio;
 */
 const { Gpio } = require('onoff');  // ใช้ onoff สำหรับ Raspberry Pi โดยตรง

// นำเข้า CORS เพื่ออนุญาตให้ client จากโดเมนอื่นเรียก API ได้
const cors = require('cors');

// สร้างแอป Express.js
const app = express();

// กำหนดพอร์ตสำหรับเซิร์ฟเวอร์
const PORT = 3000;

// เปิดใช้งาน CORS เพื่อให้ client ต่างโดเมนสามารถเรียกใช้ API ได้
app.use(cors());

// เปิดใช้งานการ parse JSON จาก body ของ HTTP request
app.use(express.json());

// สร้างอินสแตนซ์ของ GPIO เพื่อควบคุมไฟ โดยกำหนดให้ใช้ GPIO Pin 17 ในโหมด output
const light = new Gpio(17, 'out');

// สร้าง API สำหรับเปิดและปิดไฟ
app.post('/toggle-light', (req, res) => {
    // อ่านค่าจาก request body (ค่า status: 'on' หรือ 'off')
    const { status } = req.body;

    // หาก status เป็น 'on' ให้เขียนค่า 1 ไปที่ GPIO (เปิดไฟ)
    if (status === 'on') {
        light.writeSync(1);
        res.json({ message: 'Light turned on' }); // ส่งข้อความตอบกลับไปยัง client
    }
    // หาก status เป็น 'off' ให้เขียนค่า 0 ไปที่ GPIO (ปิดไฟ)
    else if (status === 'off') {
        light.writeSync(0);
        res.json({ message: 'Light turned off' }); // ส่งข้อความตอบกลับไปยัง client
    }
    // หากค่า status ไม่ถูกต้อง ให้ส่งสถานะ HTTP 400 พร้อมข้อความ error
    else {
        res.status(400).json({ error: 'Invalid status' });
    }
});

// เมื่อเซิร์ฟเวอร์หยุดทำงาน (เช่น กด Ctrl+C) ให้ปิด GPIO เพื่อคืนค่า
process.on('SIGINT', () => {
    light.unexport(); // ปลด GPIO เพื่อลดความเสี่ยงของปัญหา hardware
    process.exit(); // ออกจากโปรแกรม
});

// เริ่มต้นเซิร์ฟเวอร์ และแสดงข้อความว่ากำลังรันอยู่ที่พอร์ตที่กำหนด
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
