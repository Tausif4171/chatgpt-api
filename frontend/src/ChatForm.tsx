import React, { useState } from 'react';
import axios from 'axios';

const ChatForm = () => {
    const [userMessage, setUserMessage] = useState('');
    const [chatGptResponse, setChatGptResponse] = useState('');

    const handleSendMessage = async () => {
        try {
            const response = await axios.post('/api/chatgpt-interact', {
                userToken: 'USER_TOKEN',
                userMessage: userMessage,
            });

            setChatGptResponse(response.data.chatGptResponse);
        } catch (error: any) {
            console.error('Error sending message:', error.response ? error.response.data : error.message);
        }
    };

    return (
        <div>
            <h1>ChatGPT Interaction</h1>
            <div>
                <input type="text" value={userMessage} onChange={(e) => setUserMessage(e.target.value)} />
                <button onClick={handleSendMessage}>Send Message</button>
            </div>
            {chatGptResponse && (
                <div>
                    <strong>ChatGPT Response:</strong> {chatGptResponse}
                </div>
            )}
        </div>
    );
};

export default ChatForm;
