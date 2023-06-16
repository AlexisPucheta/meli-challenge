const express = require('express')

const app = express()

app.listen(3001, ()=> {
    console.log("Server running on port 3001")
});

app.get('/', (_req,res) => {
    res.send('Hello World!')
});