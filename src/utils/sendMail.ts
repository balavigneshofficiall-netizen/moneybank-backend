

import { sendMailOtpp } from "./orderemailTemplate";





const brevo = require('@getbrevo/brevo');
let defaultClient = brevo.ApiClient.instance;
let apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = process.env.BREVO_API_KEY || "";
let apiInstance = new brevo.TransactionalEmailsApi();
let sendSmtpEmail = new brevo.SendSmtpEmail();

export async function sendMailOtp(email: string, name: string, otp: string) {
  try {
    const fromEmail = "bankmoneybv@gmail.com"

    sendSmtpEmail.subject = "testmail";
    sendSmtpEmail.htmlContent = sendMailOtpp(email, name, otp)
    sendSmtpEmail.sender = { name: "testing", email: fromEmail };
    sendSmtpEmail.to = [{ email: "balavignesh844@gmail.com", name: "balavignesh" }];

    const response = await apiInstance.sendTransacEmail(sendSmtpEmail);
    console.log("========== BREVO SUCCESS RESPONSE ==========");
    console.log(response);

    console.log("========== BREVO EMAIL DEBUG END ==========");
  } catch (err: any) {
    console.log("========== BREVO ERROR RESPONSE ==========");
    console.log("Status:", err?.status);
    console.log("Message:", err?.message);
    console.log("Body:", err?.response?.text || err?.response?.body);
    console.log("Full Error:", err);

    console.log("========== BREVO EMAIL DEBUG END ==========");
  }
}