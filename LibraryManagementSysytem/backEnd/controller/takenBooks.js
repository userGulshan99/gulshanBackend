const { where } = require('sequelize');
const Book = require('../model/takenBook');

exports.postBook = (req, res, next) =>{
    const {bookname} = req.body;
    Book.create({
        bookname
    })
    .then((result)=>{
        res.status(201).json(result);
    })
    .catch((err)=>{
        console.log('error postBook', err);
        
        res.status(500).json({'error':'Internal Server Error'});
    })
}

exports.getBooks = (req, res, next) =>{
    Book.findAll()
    .then((data)=>{
        res.status(200).json(data);
    })
    .catch((err)=>{
        console.log('error get books', err);
        res.status(500).json({'error':'Internal Server Error'});
    })
}


exports.deleteBook = (req, res, next) =>{
    Book.destroy({
        where : {
            id : req.params.id
        }
    })
    .then((data)=>{
        res.status(204).json(data);
    })
    .catch((err)=>{
        console.log('error delete books', err);
        res.status(500).json({'error':'Internal Server Error'});
    });
}