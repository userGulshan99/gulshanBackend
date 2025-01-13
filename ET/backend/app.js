const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');

const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended : true }));
app.use(cookieParser())

const cors = require('cors');

app.use(cors({
    origin : '*'
}));

const userRoutes = require('./routes/users.routes.js');
const expenseRoutes = require('./routes/expenses.routes.js');

app.use(userRoutes);
app.use('/expense',expenseRoutes);


const User = require('./models/users.models.js');
const Expenses = require('./models/expenses.models.js');

User.hasMany(Expenses);
Expenses.belongsTo(User);

const sequelize = require('./utils/database.js');

sequelize.sync({alter : true}).then((result)=>{
    app.listen(3000, ()=>{
        console.log('Server Started at port', PORT);
    })
})
.catch((err)=>{
    console.log(err);
})