const express = require('express')
const bodyParse = require('./14-custom-body-parser')
const app = express()
const qs = require('querystring')

app.use(bodyParse);
app.post('/', (req, res) => {
    console.log(req.body);
    res.send(req.body)
})
app.listen(80, function () {
    console.log('Express server running at http://127.0.0.1')
})
