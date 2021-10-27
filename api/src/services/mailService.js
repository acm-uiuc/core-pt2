import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';

const mailService = {
  sendRegEmail: async (token) => {
    const signature = process.env.JWT_SECRET;
    let email;
    jwt.verify(token, signature, function (err, decoded) {
      email = decoded.data.email;
    });

    let link = encodeURI('https://[URL]/verify?token=' + token);

    let transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: 465,
      secure: true,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    let info = await transporter.sendMail({
      from: '"[NAME]" <[EMAIL]>',
      to: email,
      subject: 'Verify your [URL] account',
      html:
        'Welcome to <a href="https://[URL]">[URL]</a>! Someone (hopefully you!) registered for an account with this email address. If this was you, click the link below to verify your account. Otherwise, please ignore this email. <br /> <a href="' +
        link +
        '">' +
        link +
        '</a>',
    });
  },
  sendResetEmail: async (token) => {
    const signature = process.env.JWT_SECRET;
    let email;
    jwt.verify(token, signature, function (err, decoded) {
      email = decoded.data.email;
    });

    let link = encodeURI('https://[URL]/reset?token=' + token);

    let transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: 465,
      secure: true,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    let info = await transporter.sendMail({
      from: '"[NAME]" <[EMAIL]>',
      to: email,
      subject: 'Reset your [URL] password',
      html:
        'Someone (hopefully you) has requested to reset your password on <a href="https://[URL]">[URL]</a>. If this was you, click the link below to change your password. Otherwise, please ignore this email. <br /> <a href="' +
        link +
        '">' +
        link +
        '</a>',
    });
  },
};

export default mailService;
