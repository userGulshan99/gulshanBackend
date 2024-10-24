const express = require('express');
const app = express();

const users = require('./backEnd/controllers/userController');

const bodyParser = require('body-parser');
const sequelize = require('./backEnd/util/database');

const cors = require('cors');
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ extended: false }));

// delete user from database
app.delete('/users/delete-user/:id', users.delete);

// get user from database which you want to edit
app.get('/users/edit-user/:id', users.edit);

// update user details
app.post('/users/edit-user/:id', users.postEdit);

// get list of users as json response
app.get('/users', users.getUsers);

//create new user
app.post('/', users.postUser);

// display users and form for new user entries
app.get('/', users.getUsers);



sequelize.sync()
.then((result)=>{
    console.log('Server Started!');
    app.listen(3000);
})
.catch((err)=>{
    console.log(err);
});
