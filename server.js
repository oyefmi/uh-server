const express = require('express');
require('dotenv').config();
const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const cors = require('cors');
const router = express.Router();
const helmet = require('helmet');

const app = express();

app.use(helmet());

const createTransporter = async () => {
    const OAuth2 = google.auth.OAuth2
        const oAuthTwo = new OAuth2(
            process.env.CLIENT_ID,
            process.env.CLIENT_SECRET,
            process.env.REDIRECT_URI
    );

    oAuthTwo.setCredentials({
        refresh_token: process.env.REFRESH_TOKEN
    });

    const accessToken = oAuthTwo.getAccessToken();

    const transport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            type: 'OAuth2',
            user: process.env.EMAIL,
            pass: process.env.PW,
            clientId: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            refreshToken: process.env.REFRESH_TOKEN,
            accessToken
        },
        debug: true, // show debug output
        logger: true // log information in console
    });

    transport.verify((error, success) => {
        const debug = false;

        if (debug) {
            if (error) {
                console.log(error);
            } else {
                console.log('Server is ready to take messages');
            }
        }
    });

    router.post('/send', (req, res) => {
        let name = req.body.name
        let email = req.body.email
        let phone = req.body.phoneNumber
        let message = req.body.description
        let content = `name: ${name} \nemail: ${email} \nphone#: ${phone} \nmessage: ${message} `
    
        let mail = {
            from: email,
            to: process.env.EMAIL,
            subject:'New Message from Website Contact Form',
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

    return createTransporter;
}

createTransporter();

app.use(cors());
app.use(express.json());
app.use('/', router);
app.listen(process.env.PORT || 3001);