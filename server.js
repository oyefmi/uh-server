const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const creds = require('./config');
const router = express.Router();

const app = express();

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: creds.USER,
        pass: creds.PW
  },
  debug: true, // show debug output
  logger: true // log information in console
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
    let message = req.body.description
    let content = `name: ${name} \n email: ${email} \n phone#: ${phone} \n message: ${message} `

    var mail = {
        from: email,
        to: '69ebe0e174-650eb6@inbox.mailtrap.io',
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

app.use(cors())
app.use(express.json())
app.use('/', router)
app.listen(3001)