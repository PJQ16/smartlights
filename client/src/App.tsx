import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaLightbulb } from "react-icons/fa";


// ประเภทของ API Response
interface ApiResponse {
    message: string;
    output: string;
}

const App: React.FC = () => {
    const [status, setStatus] = useState<"on" | "off">("off"); // สถานะไฟ
    const [loading, setLoading] = useState(false); // สถานะการโหลด
    const API_BASE_URL = "http://192.168.1.47:5000"; // URL ของ Raspberry Pi

    // ฟังก์ชันควบคุมไฟ
    const toggleLight = async (newStatus: "on" | "off"): Promise<void> => {
        try {
            setLoading(true); // เริ่มการโหลด
            const endpoint = newStatus === "on" ? "light/on" : "light/off"; // เลือก Endpoint
            const response = await axios.post<ApiResponse>(`${API_BASE_URL}/${endpoint}`);
            console.log(response.data.message);
            setStatus(newStatus); // อัปเดตสถานะ
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                if (!error.response) {
                    alert("Cannot connect to the server. Please check your network.");
                    return;
                }
                console.error("Axios error:", error.response.data);
                alert("Failed to toggle light. Please try again.");
            } else {
                console.error("Unknown error:", error);
                alert("An unexpected error occurred. Please try again.");
            }
        } finally {
            setLoading(false); // จบการโหลด
        }
    };

    // ดึงสถานะปัจจุบันของไฟจาก API
    const fetchStatus = async (): Promise<void> => {
        try {
            const response = await axios.get<{ status: "on" | "off" }>(`${API_BASE_URL}/light/status`);
            setStatus(response.data.status); // อัปเดตสถานะ
        } catch (error) {
            console.error("Failed to fetch light status:", error);
        }
    };

    // ดึงสถานะเมื่อ Component ถูกสร้าง
    useEffect(() => {
        fetchStatus();
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-2xl font-bold mb-6">GPIO Light Control</h1>
            <div className="mb-2"><FaLightbulb size={300} className={`${ status === 'off' ? `text-gray-500` : `text-yellow-200`}`}/></div>
            <div className="flex space-x-4">
                {/* ปุ่มเปิดไฟ */}
                <button
                    onClick={() => toggleLight("on")}
                    disabled={loading}
                    className={`px-4 py-2 rounded text-white ${
                        status === "on" ? "bg-green-500" : "bg-gray-500"
                    } ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                    {loading && status === "on" ? "Loading..." : "Turn On"}
                </button>
                {/* ปุ่มปิดไฟ */}
                <button
                    onClick={() => toggleLight("off")}
                    disabled={loading}
                    className={`px-4 py-2 rounded text-white ${
                        status === "off" ? "bg-red-500" : "bg-gray-500"
                    } ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                    {loading && status === "off" ? "Loading..." : "Turn Off"}
                </button>
            </div>
            {/* แสดงสถานะปัจจุบัน */}
            <div className="mt-4">
                <p>
                    Current Light Status:{" "}
                    <span className={`font-bold ${status === "on" ? "text-green-600" : "text-red-600"}`}>
                        {status.toUpperCase()}
                    </span>
                </p>
            </div>
        </div>
    );
};

export default App;
