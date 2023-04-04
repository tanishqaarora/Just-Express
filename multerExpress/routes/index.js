const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({dest:"public/images/uploads"});
const fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// Uploading single file
router.post('/formsub', upload.single('meme'), (req, res, next) => {
  // console.log(req.file);
  const newPath = `public/images/uploads/${req.file.originalname}`;
  fs.rename(req.file.path, newPath, (err)=> {
    if(err){
      console.log(err);
    }
  
    res.json("file uploaded");
  });
})

// Uploading multiple files
router.post('/formsubarray', upload.array('meme'), (req, res, next) => {
  const uploadedFiles = req.files;
  uploadedFiles.forEach(file => {
    let newPath = `public/images/uploads/${file.originalname}`;
    fs.rename(file.path, newPath, (err)=> {
      if(err){
        console.log(err);
      }
    });
  })
  return res.json("files uploaded");
})

module.exports = router;
