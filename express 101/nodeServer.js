const http = require('http');

// fs = file system module. it is built in node.
// fs gives node access to THIS computers file system.

const fs = require('fs');

const server = http.createServer((req, res) => {
    // to check what type of req is coming
    // console.log(req.url);
    if(req.url === '/'){
     // res = our way of responding to the requester
    // http message
    // 1. Start-line - CHECK
    // 2. header
    // 3. body
    // writeHead takes 2 args:
    // 1. status code 
    // 2. object for the mime-type
    
    res.writeHead(200, {'content-type': 'text/html'});
    // res.write('<h1>Hello, World. This is me!</h1>');
    const homePageHTML = fs.readFileSync('node.html');
    res.write( homePageHTML );
    res.end();
    } else if(req.url === '/img.png'){
        res.writeHead(200, {'content-type': 'image/png'});
        const image = fs.readFileSync('img.png');
        res.write(image);
        res.end();
    } else if(req.url === '/styless.css'){
        res.writeHead(200, {'content-type': 'text/css'});
        const css = fs.readFileSync('styless.css');
        res.write(css);
        res.end();
    } 
    else {
    res.writeHead(404, {'content-type': 'text/html'});
    res.write('<h4>Sorry, this is not the page you are looking for!</h4>');
    res.end();
    }
   
    
});

// createServer returns an object with a listen method
// listen takes 1 arg:
// 1. port in listen for http traffic on
server.listen(3000);