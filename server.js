const express = require('express');
const app = express();
const port =3001;

app.get('/', (req, res)=> {
    res.send('this is working');
})

app.get('/about', (req, res)=> {
    res.send('something else');
})

app.get('/services', (req, res)=> {
    res.send('something else');
})

app.get('/employment', (req, res)=> {
    res.send('something else');
})

app.get('/faq', (req, res)=> {
    res.send('something else');
})

app.get('/contact', (req, res)=> {
    res.send('something else');
})

app.listen(port, ()=> {
    console.log('app is running on port 3000');
})