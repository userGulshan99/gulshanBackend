const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json({ extended: false }));

const cors = require('cors');
app.use(cors({
    origin : '*'
}));

const Blog = require('./models/blogModel');
const Comment = require('./models/commentsModel');

app.post('/comments/:id',(req, res, next)=>{
    Blog.findByPk(req.params.id).then((user)=>{
        return user.createComment({
            comment : req.body.comment
        })
    })
    .then((result)=>{
    })
    .catch((err)=>{
        console.log(err);
    })
});


app.get('/comments/:id', (req, res, next)=>{
    Comment.findAll({
        where:{
            blogId : req.params.id 
        }
    }).then((result)=>{
        res.send(result)
    }).catch((err)=>{
        console.log(err);
    })
})

app.delete('/comments/:id', (req, res, next)=>{
    Comment.destroy({
        where :{
            id : req.params.id
        }
    }).then((result)=>{})
    .catch((err)=>{
        console.log(err);
    })
})


app.get('/blogs', (req, res, next) =>{
    Blog.findAll().then((result)=>{
        res.send(result)
    }).catch((err)=>{
        console.log(err);
    })
})

app.post('/blogs', (req, res, next)=>{
    Blog.create({
        title : req.body.title,
        author : req.body.author,
        content : req.body.content
    }).then((result)=>{
    }).catch((err)=>{
        console.log(err);
    })
})

Blog.hasMany(Comment);
Comment.belongsTo(Blog);

const sequelize = require('./util/database');

sequelize.sync().then((result)=>{
    app.listen(3000, ()=>{
        console.log('Server Started!');
    })
})
.catch((err)=>{
    console.log(err);
})