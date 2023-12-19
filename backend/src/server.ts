const express = require('express');
const app = express();
const port = 3000; // You can use any port you prefer

app.get('/', (req: any, res: any) => {
    res.send('Hello, this is your Node.js backend!');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
