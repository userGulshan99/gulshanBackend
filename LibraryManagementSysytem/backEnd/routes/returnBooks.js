const express = require('express');

const router = express.Router();

const returnedBooksCOntroller = require('../controller/returnBooks');

router.get('/books', returnedBooksCOntroller.getBooks);

router.post('/books', returnedBooksCOntroller.postBook);

module.exports = router;