const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({dest:"public/images/uploads"});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/formsub', upload.single('meme'), (req, res, next) => {
  res.json({
    field: req.body,
    image: req.file
  });
})

module.exports = router;
