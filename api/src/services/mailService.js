import nodemailer from 'nodemailer';

const mailService = {
  sendSignEmail: async (redirect_uri, email, token) => {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });
    const link = encodeURI(`${redirect_uri}?token=${token}`);

    await transporter.sendMail({
      from: process.env.MAIL_USER,
      to: email,
      subject: 'Verify your UIUC email',
      html:
        `Hello! <br /> Someone (hopefully you!) attempted to sign in using the ACM authentication library. If this was you, click the link below to verify your account. Otherwise, please ignore this email. <br /> 
        <a href="${link}">${link}</a>`,
    });
  },
}

export default mailService;