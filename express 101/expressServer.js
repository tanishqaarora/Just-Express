// NODEJS is the language
// Express is node, a node module

const path = require('path');

// http is a native module
// express is a third party module
const express = require('express');
// An "app" is an express function (createApplication inside the express module)
// invoked and is an Express application
const app = express();

// serve up static files! only 1 line..take that nodejs
app.use(express.static('public'))
// all is a method, and it takes 2 args:
// 1. route
// 2. callback to run if the route is requested
app.all('/', (req, res)=>{
    // Express handles the  basic headers (staturs code, mime-type) itself
    // read in node.html
    console.log(path.join(__dirname + '/node.html'));
    res.sendFile(path.join(__dirname + '/node.html'))
    // res.send('<h1>Hello, I am here!</h1>')
    // Express handles the end itself
})

app.all('*', (req, res)=>{
    res.send("<h1>Sorry, this page does not exist</h1>")
})

app.listen(3000);
console.log('The Server is running on port 3000...');