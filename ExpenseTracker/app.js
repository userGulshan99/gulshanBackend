const express = require('express');
const app = express();

const sequelize = require('./backEnd/util/database');

const cors = require('cors');
app.use(cors({
    origin : '*'
}));

const expense = require('./backEnd/routes/expenseRoute');

app.use(expense);

sequelize.sync()
.then((result)=>{
    app.listen(3000,()=>{
        console.log('Server Started on 3000');
    });
})
.catch((err)=>{
    console.log(err);
});