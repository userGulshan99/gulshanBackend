require('dotenv').config();

const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended : true }));
app.use(cookieParser())

const cors = require('cors');

app.use(cors({
    origin : '*'
}));

const userRoutes = require('./routes/user.routes.js');
const expenseRoutes = require('./routes/expense.routes.js');

//routes to purchase premium membership
const purchaseRoutes = require('./routes/purchase.routes.js');

const { verifyToken } = require('./middlewares/auth.js');
const {checkPremiumUser} = require('./controllers/premiumuser.controllers.js');

app.use(userRoutes);
app.use(verifyToken);
app.get('/checkpremium', checkPremiumUser);
app.use('/expense',expenseRoutes);
app.use('/purchase',purchaseRoutes);

// Order model to store payment id and status in database
const { Order } = require('./models/order.models.js');
const { User } = require('./models/user.models.js');
const { Expense } = require('./models/expense.models.js');

User.hasMany(Expense);
Expense.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);


const sequelize = require('./utils/database.js');

sequelize.sync().then((result)=>{
    app.listen(3000, ()=>{
        console.log('Server Started at port', PORT);
    })
})
.catch((err)=>{
    console.log(err);
})