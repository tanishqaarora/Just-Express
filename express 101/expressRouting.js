const express = require('express');
const app = express();

// app object has a few methods:
// HTTP verbs or REST verbs
// CRUD app coorespondence
// 1. get - READ
// default for all browsers is get.
// 2. post - CREATE
// 3. delete - DELETE
// 4. put - UPDATE
// 5. all - i will accept any method

// Take 2 args:
// 1. path
// 2. callback to run if an http request that matches THIS verb is made to the path in #1

// app.all('/', (req, res)=>{
//     res.send('<h1>Welcome to the home page!</h1>')
// })

app.get('/', (req, res)=>{
    console.log(req);
    res.send('<h1>Welcome to the home GET page!</h1>')
})
app.post('/', (req, res)=>{
    res.send('<h1>Welcome to the home POST page!</h1>')
})
app.delete('/', (req, res)=>{
    
})
app.put('/', (req, res)=>{
    
})

app.listen(3000);
console.log('Server is running...');