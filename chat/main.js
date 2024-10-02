
const express = require('express');
const app = express();

const login = require('./login.js');
const message = require('./message.js');

app.use(login);
app.use(message);

app.listen(3000);