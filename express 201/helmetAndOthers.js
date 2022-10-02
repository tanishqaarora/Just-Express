 const express = require('express');
 const app = express();
 const helmet = require('helmet');

 // Getting error "Refused to load the script..."
 // So, we are telling the Helmet to not load the 
 // Content Security Policy
 
app.use(helmet({
    contentSecurityPolicy: false,
}));

 app.use(express.static('public'));


 // these two are very important for creating req.body
 // the express does not manage it by default
 // they will collect any type of submitted data, parse it and give it to you in JSON format, which we will want.

 app.use(express.json());       // for parsing application/json
 app.use(express.urlencoded({extended: false}));     // for parsing application/x-www-form-urlencoded 

app.post('/ajax', (req, res)=>{
    console.log(req.body);
    res.json("Test");
});

 app.listen(5000, ()=> console.log("Server is running..."));