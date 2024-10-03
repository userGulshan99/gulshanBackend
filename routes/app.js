// this is the main file.

const express = require('express');
const app = express();

const bodyParser = require('body-parser');

const path = require('path');
const rootDir = require('../util/path.js');

const admin = require('./admin');
const shop = require('./shop');
const contactus = require('./contactus.js');
const success = require('./success.js');

app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(rootDir,'..','public','css')));

app.use('/admin',admin);
app.use(shop);
app.use(contactus);
app.use(success);
 
app.use((req,res,next)=>{
   res.status(404).sendFile(path.join(rootDir,'..','views','404.html'));
})

app.listen(3000, () => {
    console.log('server is running on port 3000');
});
