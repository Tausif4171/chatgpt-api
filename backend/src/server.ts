const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000; // You can use any port you prefer

// Replace 'YOUR_OPENAI_API_KEY' with your actual OpenAI API key
const apiKey = 'YOUR_OPENAI_API_KEY';

// Define a descriptive name for the ChatGPT API endpoint
const chatGptEndpoint = 'https://api.openai.com/v1/chat/completions';

app.get('/', (req: any, res: any) => {
    res.send('Hello, this is your Node.js backend!');
});

app.post('/api/chatgpt-interact', async (req: any, res: any) => {
    const { userToken, userMessage } = req.body;

    try {
        // Include user-specific information in the conversation
        const conversation = [
            { role: 'system', content: 'You are a helpful assistant.' },
            { role: 'user', content: userMessage },
        ];

        const response = await axios.post(
            chatGptEndpoint,
            {
                model: 'gpt-3.5-turbo',
                messages: conversation,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`, // Use OpenAI API key here
                    'User-Token': userToken, // Include user token here
                },
            }
        );

        // Extract and send the generated message in the response
        const generatedMessage = response.data.choices[0].message.content;
        res.json({ chatGptResponse: generatedMessage });
    } catch (error: any) {
        console.error('Error interacting with ChatGPT:', error.response ? error.response.data : error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
