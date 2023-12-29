import { createTransport } from "nodemailer";
const transporter = createTransport({
  host: process.env.MAIL_HOST,
  port: 587,
  auth: {
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD,
  },
});

export const emailTemplate = (text: string) => {
  return `
        <div style="
        border:1px solid black
        padding:20px
        font-family:sans-serif 
        ">
        <h2> Hello There!!</h2>
        <p>${text}</p>
        </div>
        `;
};

export const sendPasswordResetEmail = async (token: string, to: string) => {
  // Email User the Token
  const emailData = await transporter.sendMail({
    to: to,
    from: "admin@shopee.com",
    subject: "Password Rest Token",
    html: emailTemplate(`Password Reset Token is here!
    <a href="${process.env.CLIENT_URL}/reset?token=${token}">Click here to Reset</a>`),
  });
  console.log(emailData);
};
