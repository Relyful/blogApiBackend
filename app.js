const express = require('express');

require('dotenv').config();

const PORT = process.env.port || 8080;

const app = express();

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));