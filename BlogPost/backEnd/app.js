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


// post comment on blog
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

// get all posted comments on selected blog
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

// to delete comment on selected blog
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


// get all created blogs
app.get('/blogs', (req, res, next) =>{
    Blog.findAll().then((result)=>{
        res.send(result)
    }).catch((err)=>{
        console.log(err);
    })
})


// to create new blog
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


// models association
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