
import nodemailer from 'nodemailer';

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'networksoftwaresolution@gmail.com',
        pass: 'fcthgkjazqcxeusr'
    },
    tls: { rejectUnauthorized: false }
});

export function sendmail(mailOptions: any) {
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}
