const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const creds = require('./config');
const router = express.Router();

const app = express();

const transport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
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

router.post('/send', (req, res, next) => {
    let name = req.body.name
    let email = req.body.email
    let phone = req.body.phoneNumber
    let message = req.body.message
    let content = `name: ${name} \n email: ${email} \n phone#: ${phone} \n message: ${message} `

    var mail = {
        from: email,
        to: 'info.uptownhope@gmail.com',
        subject:'New Message from Contact Form',
        text: content
    }

    transport.sendMail(mail, (err, data) => {
        if (err) {
            res.json({ status: 'fail' })
        } else {
            res.json({ status: 'success' })
        }
    })
})

app.use('/', router)
app.listen(3002)
app.use(express.json())
app.use(cors())
