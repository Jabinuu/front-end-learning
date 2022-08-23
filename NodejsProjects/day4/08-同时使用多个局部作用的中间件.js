const express = require('express');
const app = express()

const mw1 = (req, res, next) => {
    console.log('I am middleware 1');
    next();
}
const mw2 = (req, res, next) => {
    console.log('I am middleware 2');
    next();
}

app.get('/', (req, res) => {
    res.send('home page')
});

// 以下两种方式等价
app.get('/user', mw1, mw2, (req, res) => {
    res.send('user page')
})
// app.get('/user', [mw1, mw2], (req, res) => {
//     res.end('user page')
// })

app.listen(80, () => {
    console.log('server is running at 127.0.0.1:80');
})