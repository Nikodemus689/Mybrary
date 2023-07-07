
const express = require('express')
const router = express.Router()
const Author = require('../models/authors')
const bodyParser = require('body-parser')

//All Authors Route
router.get('/', async (req,res) => {
    let searchOptions = {}
    if (req.query.name != null && req.query.name !== "") {
        searchOptions.name = new RegExp(req.query.name, 'i')
    }
    try {
        const Authors = await Author.find(searchOptions)
        res.render('authors/index', {authors : Authors, searchOptions: req.query})
    } catch {
        res.redirect('/')
    }


    
})

//New Author Route
router.get('/new', (req,res) => {
    res.render('authors/new', {author: new Author() })
    console.log('xd-new')
})

//Create Author Route
router.post('/', async (req, res) => {
    const author = new Author({
      name: req.body.name
    });
  
    try {
      const newAuthor = await author.save();
      //res.redirect(`authors/${newAuthor.id}`);
      res.redirect(`/authors`);
      console.log('xd-post/udalo-sie')
    } catch (err) {
      res.render('authors/new', { author: author, errorMessage: "Error creating Author" });
      console.log('zobacz')
      console.log('xd-nieudalosie :(')
    }
  });
  

module.exports = router