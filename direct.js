var nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "petermartischka@gmail.com",
    pass: "zfwnjxxjfjfhjwti",
  },
});

var mailOptions = {
  from: "petermartischka@gmail.com",
  to: "petermartischka@aol.com",
  subject: "New E-mail",
  text: "That was easy!",
};

transporter.sendMail(mailOptions, function (error, info) {
  if (error) {
    console.log(error);
  } else {
    console.log("Email sent: " + info.response);
  }
});
