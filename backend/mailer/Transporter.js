const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type:'oauth2',
      user: 'lawyerappointmentapp@gmail.com',
      pass: 'devagoel',
      clientId:'617061129031-1l7oatokl3k3jjllt7ssb24uh2bdsrl8.apps.googleusercontent.com',
      clientSecret:'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',
      refreshToken:'1//04UG71FFX0ioXCgYIARAAGAQSNwF-L9IrWvX1QEzAZVUDzAY1kmpmJbXP6pbY0dU5Y7EpXHAGKKnC04KIRPQntm5khygk4pQkpW4'
    }
  });

module.exports=transporter;