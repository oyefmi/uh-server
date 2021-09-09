const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const creds = require('./config');
const router = express.Router();

const app = express();
const port =3001;

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
    user: creds.USER,
    pass: creds.PW
  }
});

transport.verify((error, success) => {
    if (error) {
        console.log(error);
    } else {
        console.log('Server is ready to take messages');
    }
});

router.post('/contact', (req, res, next) => {
    let name = req.body.name
    let email = req.body.email
    let phone = req.body.phoneNumber
    let message = req.body.message
    let content = `name: ${name} \n `
})

app.listen(port, ()=> {
    console.log('app is running on port 3001');
})

app.use(cors())
