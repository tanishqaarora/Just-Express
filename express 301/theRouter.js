// this file will contain all the routes
const express = require('express');
let router = express.Router();

// router.use works the same way that app.use does, but it's specific to THIS router

// instead of:
// app.get(...)
// we do:
// router.get(...)

router.get('/', (req, res, next)=>{
    res.json({
        msg: 'Router works!'
    })
});

// router.all
// router.post
// router.delete
// router.put

module.exports = router;