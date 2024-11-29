const express = require('express');
const router = express.Router();

const BookController = require('../controller/takenBooks');

router.get('/books', BookController.getBooks);

router.post('/books', BookController.postBook);

router.delete('/books/:id', BookController.deleteBook);

module.exports = router;