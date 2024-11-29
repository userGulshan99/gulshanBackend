const ReturnedBook = require('../model/returnBook');

exports.getBooks = (req, res, next) =>{
    ReturnedBook.findAll()
    .then((data)=>{
        res.status(200).json(data);
    })
    .catch((err)=>{
        console.log('canntot get returned books', err);
        res.status(500).json('Internal server eroor');
    })
}

exports.postBook = (req, res, next) =>{
    const {bookname, fine} = req.body;
    
    ReturnedBook.create({
        bookname, fine
    })
    .then((data)=>{
        res.status(200).json(data);
    })
    .catch((err)=>{
        console.log('canntot post books in returned column', err);
        res.status(500).json('Internal server eroor');
    })
}
