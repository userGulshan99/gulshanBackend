const express = require('express');
const app = express();

const sequelize = require('./backEnd/utils/database');

const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended : false }));

const cors = require('cors');
app.use(cors({
    origin : '*'
}));

const takenBooks = require('./backEnd/routes/takenBooks');
const returnBooks = require('./backEnd/routes/returnBooks');

app.use('/taken', takenBooks);
app.use('/return', returnBooks);

app.use('/', (req, res, next)=>{
    res.status(200).json({"Home" : "page"});
}
)

sequelize.sync({force:true})
.then((result)=>{
    app.listen(PORT, ()=>{
        console.log(`Server is running at PORT : `, PORT);
    })
})
.catch((err)=>{
    console.log("Error syncing Models", err);
});