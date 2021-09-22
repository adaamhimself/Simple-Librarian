const express = require('express');
const router = express.Router();
const passport = require('passport');
const user = require("../controllers/userController");

router.post('/addBook', passport.authenticate('jwt', { session: false }), async (req, res) => {
    await user.addBook(req.body, req.user)
    .then((response) => {
        res.status(201).json({ message: response });
    })
    .catch((err) => {
        res.status(404).json({ message: err });
    })
});

router.delete('/deleteBook', passport.authenticate('jwt', { session: false }), async (req, res) => {
    await user.deleteBook(req.body.id)
    .then((response) => {
        res.status(201).json({ message: response });
    })
    .catch((err) => {
        res.status(404).json({ message: err });
    })
});

router.put('/updateBook', passport.authenticate('jwt', { session: false }), async (req, res) => {
    await user.updateBook(req.body)
    .then((response) => {
        console.log(response);
        res.status(201).json({ message: response });
    })
    .catch((err) => {
        res.status(404).json({ message: err });
    })
});

router.get('/findBookByTitle', passport.authenticate('jwt', { session: false }), async (req, res) => {
    await user.findBookByTitle(req.body.title)
    .then((book) => {
        res.status(201).json({ message: book });
    })
    .catch((err) => {
        res.status(404).json({ message: err });
    })
});

router.get('/findAllBooks', passport.authenticate('jwt', { session: false }), async (req, res) => {
    await user.findAllBooks()
    .then((books) => {
        res.status(201).json({ message: books });
    })
    .catch((err) => {
        res.status(404).json({ message: err });
    })
});

router.get('/findBooksByGenre', passport.authenticate('jwt', { session: false }), async (req, res) => {
    await user.findBooksByGenre(req.body.genre)
    .then((books) => {
        res.status(201).json({ message: books });
    })
    .catch((err) => {
        res.status(404).json({ message: err });
    })
});

router.get('/findBooksByAuthor', passport.authenticate('jwt', { session: false }), async (req, res) => { 
    await user.findBooksByAuthor(req.body.author)
    .then((books) => {
        res.status(201).json({ message: books });
    })
    .catch((err) => {
        res.status(404).json({ message: err });
    });
}); 

module.exports = router;