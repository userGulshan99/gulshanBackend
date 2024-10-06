// this is the main file.
const express = require('express');
const app = express();

const fs = require('fs');

const bodyParser = require('body-parser');

const path = require('path');
const rootDir = require('./util/path.js');

const admin = require('./routes/admin.js');
const shop = require('./routes/shop.js');
const contactus = require('./routes/contactus.js');
const success = require('./routes/success.js');
const error = require('./controllers/error.js');


app.use(express.static(path.join(rootDir,'public','css')));

app.use('/admin',admin);
app.use(bodyParser.urlencoded({extended:false}));

app.use(shop);
app.use(contactus);
app.use(success);
app.use(error.error);

app.listen(3000, () => {
    console.log('server is running on port 3000');
});


module.exports = app;