const express = require('express');
const router = express.Router();
const passport = require('passport');
const user = require("../controllers/userController");

router.post('/addBook', passport.authenticate('jwt', { session: false }), async (req, res) => {
    await user.addBook(req.body, req.user)
    .then((response) => {
        res.status(201).json({  response });
    })
    .catch((err) => {
        res.status(404).json({  err });
    })
});

router.delete('/deleteBook', passport.authenticate('jwt', { session: false }), async (req, res) => {
    await user.deleteBook(req.body.id, req.user)
    .then((response) => {
        res.status(201).json({  response });
    })
    .catch((err) => {
        res.status(404).json({  err });
    })
});

router.put('/updateBook', passport.authenticate('jwt', { session: false }), async (req, res) => {
    await user.updateBook(req.body, req.user)
    .then((response) => {
        console.log(response);
        res.status(201).json({  response });
    })
    .catch((err) => {
        res.status(404).json({  err });
    })
});

router.get('/findBookByTitle', passport.authenticate('jwt', { session: false }), async (req, res) => {
    await user.findBookByTitle(req.body.title, req.user)
    .then((book) => {
        res.status(201).json({  book });
    })
    .catch((err) => {
        res.status(404).json({  err });
    })
});

router.get('/findAllBooks', passport.authenticate('jwt', { session: false }), async (req, res) => {
    await user.findAllBooks(req.user)
    .then((books) => {
        res.status(201).json({  books });
    })
    .catch((err) => {
        res.status(404).json({  err });
    })
});

router.get('/findBooksByGenre', passport.authenticate('jwt', { session: false }), async (req, res) => {
    await user.findBooksByGenre(req.body.genre, req.user)
    .then((books) => {
        res.status(201).json({  books });
    })
    .catch((err) => {
        res.status(404).json({  err });
    })
});

router.get('/findBooksByAuthor', passport.authenticate('jwt', { session: false }), async (req, res) => { 
    await user.findBooksByAuthor(req.body.author, req.user)
    .then((books) => {
        res.status(201).json({  books });
    })
    .catch((err) => {
        res.status(404).json({  err });
    });
}); 

module.exports = router;