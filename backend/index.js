const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Welcome')
});

app.listen(8080,(req)=>{
    console.log('listening on port 8080')
})