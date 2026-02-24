const nodemailer = require("nodemailer"); // email पाठवण्यासाठी nodemailer import

const sendEmail = async (email, token) => {
  // Gmail transporter तयार करतो
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
  user: process.env.EMAIL_USER,
  pass: process.env.EMAIL_PASS
}
  });

  // reset password link तयार
  const resetLink = `http://localhost:3000/reset-password/${token}`;

  // email पाठवतो
  await transporter.sendMail({
    from: "yourgmail@gmail.com",
    to: email,
    subject: "Password reset",
    html: `<p>Click here to reset password:</p>
           <a href="${resetLink}">${resetLink}</a>`
  });
};

module.exports = sendEmail;
