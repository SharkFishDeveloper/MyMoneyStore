const nodeMailer = require('nodemailer');

const sendEmail = async(credential)=>{
    const sender = nodeMailer.createTransport({
        host:process.env.EMAIL_HOST,
        port:process.env.EMAIL_PORT,
        service:process.env.EMAIL_SERVICE,
        auth:{
            user:process.env.EMAIL_SENDER,
            pass:process.env.EMAIL_PASSWORD
        }
    });
        //* node mailer takes sender and options and then apply method on sender
    const options = {
        from:process.env.EMAIL_SENDER,
        to:credential.email,
        subject:credential.subject,
        text:credential.resetPasswordMessage
    }
    await sender.sendMail(options);
}
module.exports = sendEmail;