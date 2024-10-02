
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const fs = require('fs');
router.use(bodyParser.urlencoded({extended:false}));

router.get('/',(req,res,next)=>{
    let messages = fs.readFileSync('./message.txt','utf-8');
    let chatBox = fs.readFileSync('./message.html','utf-8');
        
    if(!messages){
        messages = '<h3>Chat Does Not Exists</h3>'
    }

    res.send(`
        <pre>${messages}</pre>
        ${chatBox}`);
})


router.post('/',(req,res,next)=>{
   return fs.appendFile('./message.txt',`${req.body.username} : ${req.body.message}\n`,(err)=>{
        if(err)return err;
        res.redirect('/');
    });    
})

module.exports = router;