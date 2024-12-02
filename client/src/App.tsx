import React, { useState } from 'react';
import axios from 'axios';
import Transfer from './components/Tranfer';

const App: React.FC = () => {
    const [status, setStatus] = useState<'on' | 'off'>('off'); // กำหนดประเภทให้ state

    // กำหนดประเภทของฟังก์ชัน toggleLight
    const toggleLight = async (newStatus: 'on' | 'off'): Promise<void> => {
        try {
            await axios.post('http://localhost:3000/toggle-light', { status: newStatus });
            setStatus(newStatus); // อัปเดต state
        } catch (error) {
            console.error('Error toggling light:', error);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
           
            <h1 className="text-2xl font-bold mb-6">GPIO Light Control</h1>
            <div className="flex space-x-4">
                <button
                    onClick={() => toggleLight('on')}
                    className={`px-4 py-2 rounded text-white ${status === 'on' ? 'bg-green-500' : 'bg-gray-500'}`}
                >
                    Turn On
                </button>
                <button
                    onClick={() => toggleLight('off')}
                    className={`px-4 py-2 rounded text-white ${status === 'off' ? 'bg-red-500' : 'bg-gray-500'}`}
                >
                    Turn Off
                </button>
            </div>
            <Transfer/>
        </div>
    );
};

export default App;
