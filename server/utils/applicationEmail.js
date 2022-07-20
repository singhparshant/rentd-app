const nodemailer = require("nodemailer");
const User = require("../models/user");
const bcrypt = require("bcrypt")


const sendApplicationEmail = async (application, status) => {
    const transporter = nodemailer.createTransport({
        service: "example",
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'adella.torp75@ethereal.email',
            pass: 'Ms1kf6MN7pRnb9kMkp'
        }
    });

    let emailBody = "";
    if (status === "accepted")
        emailBody = await acceptanceEmail(application);
    else
        emailBody = rejectionEmail(application);

    transporter.sendMail({
        from: '"Rentd <noreply@rentd.com>', // sender address
        to: application.email, // list of receivers
        subject: "your Rentd application ✔", // Subject line
        html: emailBody
    });
}


const acceptanceEmail = async (application) => {
    //generate password randomly
    const password = Math.random().toString(36).slice(-10);
    const passwordHash = await bcrypt.hash(password, 10);

    const supplierData = {
        role: "supplier",
        email: application.email,
        username: application.username,
        passwordHash,
        address: application.address,
    }
    const supplier = new User(supplierData);

    await supplier.save();

    return `<p style="font-size:20px;"> Dear ${application.username}, 
     <br/> <br/>We are happy to inform you that your application to be one of our suppliers has been accepted. 
     <br/> <br/> Your credentials:<br/> <br/> email:&nbsp${application.email} </br> password:&nbsp${password} <br/> <br/>Yours sincerely, <br/> <br/> Rentd </p>`
}
const rejectionEmail = (application) => {
    return `<p style="font-size:20px;"> Dear ${application.username}, 
    <br/> <br/>Unfortunately, your application to be one of our suppliers has been rejected. 
    <br/> Thank you for your interest.<br/> <br/>Yours sincerely, <br/> <br/> Rentd </p>`
}


module.exports = { sendApplicationEmail }