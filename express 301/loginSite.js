const path = require('path');

const express = require('express');
const app = express();

const cookieParser = require('cookie-parser');

const helmet = require('helmet');     
const { parseArgs } = require('util');
app.use(helmet());

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// works on every request
app.use((req, res, next) =>{
    if(req.query.msg === 'fail'){
        res.locals.msg = `Sorry. This username and password combination does not exist.`
    } else {
        res.locals.msg = ``
    }

    // Send me on to the next piece of middleware!
    next();
})

app.get('/', (req, res, next) => {
    res.send('Sanity Check');
})

app.get('/login', (req, res, next) => {
    // the req object has a query property in Express
    // req.query is an object, with a property of every key in the query string
    // the query  string is where you put insecure data
    // console.log(req.query);
    const msg = req.query.msg;
    if(msg === 'fail'){
        // run some other function...
    }
    res.render('login');
})


// the user or browser is never going to see this page
// the user will come here as soon as they submit the form
// the purpose of this post route is for the user to submit the data
// then the user redirect to new path

app.post('/process_login', (req, res, next) => {
    // req.body is made by urlencoded, which parses the http message for sent data!
    const password = req.body.password;
    const username = req.body.username;
    // check the db to see if user credentials are valid
    // if they are valid...
        // - save their username in a cookie
        // - is sent them to the welcome page
    if(password === 'x'){
        // res.cookie takes 2 args:
        // 1. name of the cookie
        // 2. value to set it to
        res.cookie('username', username)
        res.redirect('/welcome')
    } else {
        // The "?" is a special character in a URL
        res.redirect('/login?msg=fail&test=hello');
    }
    // res.json(req.body)
})

app.get('/welcome', (req, res, next)=> {
    // req.cookies object will have a property for every named cookie that has been set.
    res.render('welcome', {
        username: req.cookies.username
    });
})

// app.param() - takes 2 args:
// 1. param to look for in the route 
// 2. the callback to run (with the usuals)
app.param('id', (req, res, next, id)=>{
    console.log('Params called:', id);
    // if id has something to do with stories...
    // if id has something to do with blog..
    next();
})

// in a route, anytime something has a : in front it is a wildcard!
// wildcard, will match anything in that slot

app.get('/story/:id', (req, res, next)=>{
    // the req.params object always exists
    // it will have a property for each wildcard in the route
    res.send(`<h1>Story ${req.params.storyId}</h1>`);
    // res.send('<h1>Story 1</h1>');
})

// THIS WILL NEVER RUN, because it matches above (without next())
// app.get('/story/:blogId', (req, res, next)=>{
//     // the req.params object always exists
//     // it will have a property for each wildcard in the route
//     res.send(`<h1>Story ${req.params.storyId}</h1>`);
//     // res.send('<h1>Story 1</h1>');
// })

app.get('/story/:storyId/:link', (req, res, next)=>{
    // the req.params object always exists
    // it will have a property for each wildcard in the route
    res.send(`<h1>Story ${req.params.storyId} - ${req.params.link}</h1>`);
    // res.send('<h1>Story 1</h1>');
})

// app.get('/story/2', (req, res, next)=>{
//     res.send('<h1>Story 2</h1>');
// })

// app.get('/story/3', (req, res, next)=>{
//     res.send('<h1>Story 3</h1>');
// })

app.get('/statement', (req, res, next)=>{
    // This will render the statement IN the browser 
// res.sendFile(path.join(__dirname, 'userStatements/BankStatementChequing.png'))

// res.sendFile(path.join(__dirname,'userStatements/BankStatementChequing.png'));

    
// app has a download method! Takes 2 args:
// 1. filename
// 2. optionally, what you want the filename to download as
// 3. callback which come with the error

// download is setting the headers!
// 1. content-dispostion to attachment, with a filename of the 2nd arg
    res.download(path.join(__dirname,'userStatements/BankStatementChequing.png'), 'TanusStatement.png'), (error)=>{
        // if there is an error in sending the file, headers may already be sent
        if(error){
            // res.headerSent is a boolean, true if headers are already sent
            if(!res.headersSent){
                res.redirect('/download/error');
            }
        }
    };

    // attachment only sets the headers for content-dispostion to attachment
    // IF, you provide a file, it will also set the filename
    // res.attachment(path.join(__dirname,'userStatements/BankStatementChequing.png'), 'TanusStatement.png')
});

app.get('/logout', (req, res, next)=>{
    // res.clearCookie takes 1 arg:
    // 1. Cookie to clear (by name)
    res.clearCookie('username');
    res.redirect('/login');
})

app.listen(3000, () => console.log('Server running on port 3000...'));




