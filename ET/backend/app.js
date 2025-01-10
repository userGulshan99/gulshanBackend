const express = require('express');
const app = express();

const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended : true }));

const cors = require('cors');
app.use(cors({
    origin : '*'
}));

const userRoutes = require('./routes/users.routes.js');

app.use(userRoutes);

const sequelize = require('./utils/database.js');

sequelize.sync().then((result)=>{
    app.listen(3000, ()=>{
        console.log('Server Started at port', PORT);
    })
})
.catch((err)=>{
    console.log(err);
})