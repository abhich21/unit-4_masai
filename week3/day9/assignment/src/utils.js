const transporter= require('./configs/mail');


const sendMail= async({ to, subject, text})=>{
  console.log(to);

    await transporter.sendMail({
        from: "ABC@mail.com",
        to,
        subject,
        text,
      });

};


const verifyMail= async({ to, subject, text})=>{

  await sendMail({
      from: "ABC@mail.com",
      to,
      subject,
      text,
    });

};

const adminMail= async({ to, subject, text})=>{

  await sendMail({
      from: "ABC@mail.com",
      to,
      subject,
      text,
    });

};


module.exports={ sendMail,verifyMail, adminMail};