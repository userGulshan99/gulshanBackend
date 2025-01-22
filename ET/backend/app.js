require('dotenv').config();

const path = require('path');

const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');

const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended : true }));
app.use(cookieParser())
app.use(express.static(path.join(__dirname,'public')));


const cors = require('cors');

app.use(cors({
    origin : '*'
}));

const userRoutes = require('./routes/user.routes.js');
const expenseRoutes = require('./routes/expense.routes.js');
const premiumUsersRoutes = require('./routes/premium.routes.js');
const passwordRoutes = require('./routes/password.routes.js');


//routes to purchase premium membership
const purchaseRoutes = require('./routes/purchase.routes.js');

const { verifyToken } = require('./middlewares/auth.js');
const {checkPremiumUser} = require('./controllers/premiumuser.controllers.js');

app.use('/password', passwordRoutes);
app.use(userRoutes);
// app.use(verifyToken);
app.use('/expense', verifyToken ,expenseRoutes);
app.use('/purchase', verifyToken ,purchaseRoutes);

// check if user is premium and then give acces to premium feautures
app.use(checkPremiumUser, premiumUsersRoutes);

// Order model to store payment id and status in database
const { Order } = require('./models/order.models.js');
const { User } = require('./models/user.models.js');
const { Expense } = require('./models/expense.models.js');
const {forgotPasswordRequests} = require('./models/ForgotPasswordRequests.js');

User.hasMany(Expense);
Expense.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);

// sequelize associations to set forgotPasswordRequests
User.hasMany(forgotPasswordRequests);
forgotPasswordRequests.belongsTo(User);

const sequelize = require('./utils/database.js');

sequelize.sync().then((result)=>{
    app.listen(3000, '0.0.0.0', ()=>{
        console.log('Server Started at port', PORT);
    })
})
.catch((err)=>{
    console.log(err);
})