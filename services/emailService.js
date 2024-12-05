import dotenv from 'dotenv';
dotenv.config();

import { emailTemplate } from "../utils/emailTemplate.js";
import { transporter } from "./emailConfig.js";

const sendMail = (mailData) => {
  return new Promise((resolve, reject) => {
    transporter.sendMail(mailData, (err, info) => {
      if (err) {
        console.error(err);
        reject(err);
      } else {
        console.log(info);
        resolve(info);
      }
    });
  });
};

const sendMailWithRetry = async (mailData, retries = 3) => {
  for (let i = 0; i < retries; i++) {
    try {
      return await sendMail(mailData);
    } catch (error) {
      if (i === retries - 1) throw error;  // Re-throw after the last attempt
      console.log(`Retrying sendMail... Attempt ${i + 1}`);
    }
  }
};



//welcome mail
export async function welcomeMail(userEmail) {
  try {

    let bodyContent = `
    <table style="width: 100%; max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif; background-color: #f9f9f9; border: 1px solid #ddd; border-radius: 8px;">
  <tr>
    <td style="padding: 20px;">
      <h1 style="font-size: 24px; color: #007bff; text-align: center;">Welcome to PrimeHealth!</h1>
      <p style="font-size: 16px; color: #333; margin-bottom: 20px;">
        Hello there,
      </p>
      <p style="font-size: 16px; color: #333; margin-bottom: 20px;">
        We're thrilled to welcome you to the PrimeHealth family! Whether you're here to book an appointment, access medical records, or connect with healthcare professionals, we've got you covered.
      </p>
      <p style="font-size: 16px; color: #333; margin-bottom: 20px;">
        To get started, explore our platform and take full advantage of its features. If you have any questions or need assistance, feel free to contact our support team at <a href="mailto:${process.env.SMTP_USER}" style="color: #007bff; text-decoration: none;">${process.env.SMTP_USER}</a>. We're always here to help!
      </p>
      <div style="text-align: center; margin-bottom: 20px;">
        <a href="https://primehealth.com/dashboard" style="background-color: #007bff; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-size: 16px; font-weight: bold;">Go to Dashboard</a>
      </div>
      <p style="font-size: 16px; color: #333; margin-bottom: 20px;">
        Looking for more ways to make the most out of PrimeHealth? Check out our resources and stay updated with the latest in healthcare technology.
      </p>
      <div style="text-align: center; margin-bottom: 20px;">
        <a href="https://primehealth.com/resources" style="background-color: #28a745; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-size: 16px; font-weight: bold;">Explore Resources</a>
      </div>
      <p style="font-size: 16px; color: #333; margin-bottom: 20px;">
        Thank you for choosing PrimeHealth. Together, let's achieve your health goals with ease.
      </p>
      <p style="font-size: 16px; color: #333; margin-bottom: 20px;">Best regards,</p>
      <p style="font-size: 16px; color: #333;">The PrimeHealth Team</p>
      <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
      <p style="font-size: 14px; color: #666; text-align: center;">
        This email was sent to you as part of your PrimeHealth subscription. If you no longer wish to receive emails, you can <a href="https://primehealth.com/unsubscribe" style="color: #007bff; text-decoration: none;">unsubscribe here</a>.
      </p>
    </td>
  </tr>
</table>

  `;

    let mailOptions = {
      from: `Primehealth ${process.env.SMTP_USER}`,
      to: `${userEmail}`,
      subject: "Welcome!",
      html: emailTemplate("Welcome to Primehealth", bodyContent),
    };

    const result = await sendMailWithRetry(mailOptions);
    return result;
  } catch (error) {
    return { error:  error.message };
  }
}

//alert doctor mail
export async function alertDoctor(userEmail, reason) {
  try {

    let bodyContent = `
    <td>
      <p style="margin-bottom: 20px;">Hello</p>
      <p style="margin-bottom: 20px;">You have a new pending appointment</p>
      <p style="margin-bottom: 20px;">Reason: ${reason}</p>
    </td>
  `;

    let mailOptions = {
      from: `Primehealth ${process.env.SMTP_USER}`,
      to: `${userEmail}`,
      subject: "Welcome!",
      html: emailTemplate("Welcome to Primehealth", bodyContent),
    };

    const result = await sendMailWithRetry(mailOptions);
    return result;
  } catch (error) {
    return { error:  error.message };
  }
}

//alert patient mail
export async function alertPatient(userEmail, status) {
  try {

    let bodyContent = `
    <td>
      <p style="margin-bottom: 20px;">Hello</p>
      <p style="margin-bottom: 20px;">Your appointment request was ${status}</p>
      <p style="margin-bottom: 20px;">If you have any questions or need assistance, feel free to reach out to our support team at ${process.env.SMTP_USER}.</p>
      <p style="margin-bottom: 20px;">Best regards</p>
      <p style="margin-bottom: 20px;">The Primehealth Team</p>
    </td>
  `;

    let mailOptions = {
      from: `Primehealth ${process.env.SMTP_USER}`,
      to: `${userEmail}`,
      subject: "Appointment update!",
      html: emailTemplate("Appointment update!", bodyContent),
    };

    const result = await sendMailWithRetry(mailOptions);
    return result;
  } catch (error) {
    return { error:  error.message };
  }
}

//Pending Appointment Mail
export async function pendingAppointmentMail(userEmail) {
  try {

    let bodyContent = `
    <td>
      <p style="margin-bottom: 20px;">Hello</p>
      <p style="margin-bottom: 20px;">Your appointment request has been sent successfully, you'll receive a notification when it's approved</p>
      <p style="margin-bottom: 20px;">Best regards</p>
      <p style="margin-bottom: 20px;">The Primehealth Team</p>
    </td>
  `;

    let mailOptions = {
      from: `Primehealth ${process.env.SMTP_USER}`,
      to: `${userEmail}`,
      subject: "Appointment!",
      html: emailTemplate("Appointment", bodyContent),
    };

    const result = await sendMailWithRetry(mailOptions);
    return result;
  } catch (error) {
    return { error:  error.message };
  }
}

//Otp mail
export async function otpMail(userEmail, otp) {
  try {

    let bodyContent = `
      <td>
        <p style="margin-bottom: 20px;">Your verification code is:</p>
        <p style="margin-bottom: 20px; font-size: 22px; font-weight: 600; color: #114000; letter-spacing: 2px;">${otp}</p>
        <p style="margin-bottom: 20px;">Copy and paste the above code into the form on the website to continue. This code expires in 10 minutes.</p>
      </td>
    `;

    let mailOptions = {
      from: `Primehealth ${process.env.SMTP_USER}`,
      to: `${userEmail}`,
      subject: "Otp!",
      html: emailTemplate("Otp", bodyContent),
    };

    const result = await sendMailWithRetry(mailOptions);
    return result;
  } catch (error) {
    console.error(error)
    return { error:  error.message };
  }
}

// Password reset mail
export async function passwordReset(userEmail) {
  try {

    let bodyContent = `
      <td style="background-color: #ffffff; padding: 40px 20px;">
        <p style="margin-bottom: 20px;">A request was sent for password reset, if this wasn't you please contact our customer service. Click the reset link below to proceed</p>
        <a style="max-width: 200px; padding: 15px 30px; border-radius: 30px; background-color: #114000; color: #fafafa; text-decoration: none;" href="https://prowealth-inc.com/forgotPassword/newPassword">Reset Password</a>
      </td>
    `;

    let mailOptions = {
      from: `Primehealth ${process.env.SMTP_USER}`,
      to: `${userEmail}`,
      subject: "Password Reset!",
      html: emailTemplate("Password Reset!", bodyContent),
    };

    const result = await sendMailWithRetry(mailOptions);
    return result;
  } catch (error) {
    return { error:  error.message };
  }
}