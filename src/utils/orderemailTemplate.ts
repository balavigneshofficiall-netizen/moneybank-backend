


// import moment from "moment-timezone";


// export const orderemailTemplate = (
//     title = "Order Confirmation",
//     currency = "INR",
//     userName = "bala",
//     orderId = "12344321",
//     price = 50000,
//     Address = "2/7,allampatti,periyar,street,virudhunagar",
//     landmark = "warhouse",
//     city = "virudhunagar",
//     pincode = "626001",
//     subtotal = 50500,
//     couponCost = 0,
//     packingCharge = 99,
//     paymentType = "COD",
//     advanceAmt = 0,
//     isBusiness = false,
//     codCharges = 0,
//     grandTotal = 6000,
//     discount = 200,
//     outlook = "hi",
//     model = "redmi note 5 pro",
//     rom = 64,
//     userPhone = 6374676253,

//     itemSet = [
//         {
//             image: "apple-iphone-14-128-gb-blue-6-gb-ram--removebg-preview.png",
//             name: "iphone-14-128-gb",
//             qty: 2,
//             color: "blue",
//             price: 30000,
//             quality: "suberb",
//             businessPrice: 30000
//         },
//         {
//             image: "apple-iphone-15promax-removebg-preview.png",
//             name: "iphone-15 promax 128GB 8GB",
//             qty: 1,
//             color: "white",
//             price: 20000,
//             quality: "good",
//             businessPrice: 20000
//         }
//     ]) => {
//     let orderItemsHTML = "";
//     const baseURL = "https://cdn.ovantica.com/images/";


//     for (const item of itemSet) {
//         const imageUrl = item.image.startsWith("https://")
//             ? item.image
//             : `${baseURL}${item.image}`;
//         orderItemsHTML += `
//     <tr>
//         <td style="padding:0;">
//             <table width="100%" cellpadding="5" cellspacing="0" border="0">
//                 <tr>
//                     <td width="70" style="padding:0; font-size:0; line-height:0; mso-line-height-rule:exactly; vertical-align:top;">
//                         ${isBusiness
//                 ? `<img src="${imageUrl}" width="58" style="display:block; border-radius:8px; border:0;">`
//                 : `<img src="${imageUrl}" width="58" style="display:block; border-radius:8px; border:0;">`
//             }
//                     </td>

//                     <td style="font-size:13px; color:#333; line-height:18px; vertical-align:top;">
//                         <b>${item.name}</b><br>
//                         Quantity: ${item.qty}<br>
//                         Color: ${item.color || "-"}<br>
//                         Grade: ${item.quality || "-"}
//                     </td>
//                     ${isBusiness ? `
//                     <td align="right" style="font-size:14px; font-weight:bold; line-height:18px; vertical-align:top; white-space:nowrap;">
//                         ₹${item.businessPrice}
//                     </td>
//                     ` : `
//                     <td align="right" style="font-size:14px; font-weight:bold; line-height:18px; vertical-align:top; white-space:nowrap;">
//                         ₹${item.price}
//                     </td>
//                     `}
//                 </tr>
//             </table>
//         </td>
//     </tr>

//     <tr>
//         <td>
//             <table width="100%" cellpadding="0" cellspacing="0" border="0">
//                 <tr>
//                     <td style="border-top:1px solid #eee; height:15px; font-size:0; line-height:0;"></td>
//                 </tr>
//             </table>
//         </td>
//     </tr>
//     `;
//     }

//     // Date calculations (assuming moment is correctly configured)
//     const today = moment().tz("Asia/Kolkata");
//     const orderedDate = today.format("MMM D");
//     const readyDate = today.clone().add(1, "days").format("MMM D");
//     const expectedFrom = today.clone().add(2, "days").format("MMM D");
//     const expectedTo = today.clone().add(4, "days").format("MMM D");
//     const BalanceAmount = isBusiness ? Number(grandTotal) - Number(advanceAmt) : Number(subtotal) - Number(advanceAmt)
//     console.log("BalanceAmount", BalanceAmount);

//     return `
// <!DOCTYPE html
//     PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

// <html xmlns="http://www.w3.org/1999/xhtml">

// <head>
//     <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
//     <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
//     <title>${title}</title>

//     <style type="text/css">
//         /* Media Query to make the main container full width on screens up to 600px */
//         @media only screen and (max-width: 600px) {
//             .container-table {
//                 width: 100% !important;
//                 max-width: 100% !important;
//             }
//         }
//         /* iOS Blue Link Fix: prevents Apple from auto-coloring dates/numbers */
//         a[x-apple-data-detectors] {
//             color: inherit !important;
//             text-decoration: none !important;
//             font-size: inherit !important;
//             font-family: inherit !important;
//             font-weight: inherit !important;
//             line-height: inherit !important;
//         }
//     </style>
// </head>

// <body style="margin:0; padding:0; background:#ffffff; -webkit-text-size-adjust:100%; -ms-text-size-adjust:100%; line-height:1.4;">

//     <table width="100%" cellpadding="0" cellspacing="0" border="0" align="center" style="padding:20px 0;">
//         <tr>
//             <td align="center">

//                 <table width="100%" cellpadding="0" cellspacing="0" border="0" class="container-table"
//                     style="max-width:550px; background:#ffffff; border:2px solid #dadada; border-radius:10px;">

//                     <tr>
//                         <td>
//                             <img src="https://cdn.ovantica.com/images/Header_with_logo_mail.png"
//                                 width="100%" style="display:block; border:0; max-width:546px;">
//                         </td>
//                     </tr>

//                     <tr>
//                         <td align="center" style="padding:25px 20px;">
//                             <div style="font-size:20px; font-weight:bold; margin-bottom:8px; line-height:24px;">
//                                 Thanks for Order, ${userName}!
//                             </div>
//                             <div style="font-size:13px; color:#666; line-height:19px; max-width:380px;">
//                                 We’ll reach for confirmation soon. If you would like to view the status of your order or
//                                 make any changes to it, click view order.
//                             </div>

//                             <a href="https://ovantica.com/order/track/${orderId}" style="margin-top:15px; display:inline-block; padding:10px 28px;
//                 background:#000; color:#fff; border-radius:30px;
//                 text-decoration:none; font-size:14px; line-height:18px;">
//                                 View Your Order
//                             </a>
//                         </td>
//                     </tr>

//                     <tr>
//                         <td>
//                             <table width="100%">
//                                 <tr>
//                                     <td style="border-top:1px solid #e5e5e5; font-size:0; line-height:0;"></td>
//                                 </tr>
//                             </table>
//                         </td>
//                     </tr>

//                     <tr>
//                         <td style="padding:25px 20px;">

//                             <div style="text-align:center; font-size:20px; font-weight:bold; margin-bottom:10px; line-height:24px;">
//                                 Order Detail
//                             </div>

//                             <table width="100%" cellpadding="15" cellspacing="0" border="0"
//                                 style="background-size:100% 100%; border-radius:10px;">

//                                 <tr>
//                                     <td width="50%" style="font-size:14px; color:#333; vertical-align:top; line-height:18px; padding-left:0; padding-top:0;">
//                                         <div >Order ID:</div>
//                                         <div style="font-weight:bold; font-size:16px;">${orderId}</div>
//                                     </td>

//                                     <td width="50%" style="font-size:14px; color:#333; vertical-align:top; text-align:left; line-height:18px; padding-right:0; padding-top:0;">
//                                         <div>Shipping Address</div>
//                                         <div style="font-weight:bold; font-size:16px;">
//                                             <span style="color:#333; text-decoration:none;">${Address},${landmark},${city}-${pincode},<br>${userPhone}</span>
//                                         </div>
//                                     </td>
//                                 </tr>

//                                 <tr>
//                                     <td width="50%" style="font-size:14px; color:#333; vertical-align:top; line-height:18px; padding-left:0;">
//                                         <div>Order Total</div>
//                                         <div style="font-weight:bold; font-size:16px;">${isBusiness ? `${currency === 'INR' ? '₹' : currency}${grandTotal}`
//             : `${currency === 'INR' ? '₹' : currency}${subtotal}`}</div>
//                                     </td>

//                                     <td width="50%" style="font-size:14px; color:#333; vertical-align:top; text-align:left; line-height:18px; padding-right:0;">
//                                         <div>Shipping Method</div>
//                                         <div style="font-weight:bold; font-size:16px;">
//                                             2 to 3 days – Free Delivery
//                                         </div>
//                                     </td>
//                                 </tr>

//                                 <tr>
//                                     <td colspan="2" style="font-size:14px; color:#333; vertical-align:top; line-height:18px; padding-left:0; padding-right:0;">
//                                         <div>Payment Method</div>
//                                         <div style="font-weight:bold; font-size:16px;">
//                                             ${paymentType}
//                                         </div>
//                                     </td>
//                                 </tr>

//                             </table>
//                         </td>
//                     </tr>

//                     <tr>
//                         <td>
//                             <table width="100%">
//                                 <tr>
//                                     <td style="border-top:1px solid #e5e5e5; font-size:0; line-height:0;"></td>
//                                 </tr>
//                             </table>
//                         </td>
//                     </tr>

//                     <tr>
//                         <td style="padding:20px;">
//                             <div style="font-size:16px; font-weight:bold; text-align:center; margin-bottom:15px; line-height:20px;">
//                                 Track your order
//                             </div>

//                             <table width="100%" align="center">
//                                 <tr>
//                                     <td align="center">
//                                         <img src="https://cdn.ovantica.com/images/order_line_mail.png"
//                                             width="360" style="display:block; max-width: 100%; height: auto; border:0;">
//                                     </td>
//                                 </tr>

//                                 <tr>
//                                     <td align="center">

//                                         <table width="100%" cellpadding="0" cellspacing="0" border="0"
//                                             style="text-align:center; font-size:14px; color:#444;">

//                                             <tr>
//                                                 <td width="33.33%" align="center" style="line-height:18px;">
//                                                     Ordered<br>
//                                                     <span style="color:#777;">${orderedDate}</span>
//                                                 </td>
//                                                 <td width="33.33%" align="center" style="line-height:18px;">
//                                                     Ready to Ship<br>
//                                                     <span style="color:#777;">${readyDate}</span>
//                                                 </td>
//                                                 <td width="33.33%" align="center" style="line-height:18px;">
//                                                     Expected delivery<br>
//                                                     <span style="color:#777;">${expectedFrom} - ${expectedTo}</span>
//                                                 </td>
//                                             </tr>

//                                         </table>

//                                     </td>
//                                 </tr>
//                             </table>
//                         </td>
//                     </tr>

//                     <tr>
//                         <td>
//                             <table width="100%">
//                                 <tr>
//                                     <td style="border-top:1px solid #e5e5e5; font-size:0; line-height:0;"></td>
//                                 </tr>
//                             </table>
//                         </td>
//                     </tr>

//                     <tr>
//                         <td style="padding:20px;">
//                             <div style="text-align:center; font-size:16px; font-weight:bold; margin-bottom:15px; line-height:20px;">
//                                 Order Summary
//                             </div>

//                             <table width="100%" cellpadding="0" cellspacing="0" border="0">
//                                 ${orderItemsHTML}
//                             </table>

//                            <table width="100%" cellpadding="7" cellspacing="0" border="0"
//     style="font-size:14px; color:#333; line-height:20px; margin-top: 15px;">

//     <tr>
//         <td width="70%" style="padding:8px 0; padding-right:10px;">Sub Total</td>
//         <td width="30%" align="right" style="padding:8px 0;">${currency === 'INR' ? '₹' : currency}${price}</td>
//     </tr>

//     <tr>
//         <td width="70%" style="padding:8px 0; padding-right:10px;">Coupon</td>
//         <td width="30%" align="right" style="padding:8px 0;">${currency === 'INR' ? '₹' : currency}${couponCost}</td>
//     </tr>

//     ${(isBusiness && paymentType.toLowerCase() != "cod") ? `
//        <tr>
//         <td width="70%" style="padding:8px 0; padding-right:10px;">Packing Charge</td>
//         <td width="30%" align="right" style="padding:8px 0;">${currency === 'INR' ? '₹' : currency}${packingCharge}</td>
//     </tr>
//       `: isBusiness ? `
//     <tr>
//         <td width="70%" style="padding:8px 0; padding-right:10px;">Packing Charge</td>
//         <td width="30%" align="right" style="padding:8px 0;">${currency === 'INR' ? '₹' : currency}${packingCharge}</td>
//     </tr>

//     <tr>
//         <td width="70%" style="padding:8px 0; padding-right:10px;">COD Charge</td>
//         <td width="30%" align="right" style="padding:8px 0;">${currency === 'INR' ? '₹' : currency}${codCharges}</td>
//     </tr>
//     ` : `
//     <tr>
//         <td width="70%" style="padding:8px 0; padding-right:10px;">
//             ${paymentType.toLowerCase() === "cod" || paymentType.toLowerCase() === "advance-cod"
//             ? "COD Charge"
//             : "Packing Charge"}
//         </td>
//         <td width="30%" align="right" style="padding:8px 0;">${currency === 'INR' ? '₹' : currency}${packingCharge}</td>
//     </tr>
//     `}

//     ${paymentType === "advance-cod" ? `
//     <tr>
//         <td width="70%" style="padding:8px 0; padding-right:10px;">Advance Paid</td>
//         <td width="30%" align="right" style="padding:8px 0;">${currency === 'INR' ? '₹' : currency}${advanceAmt}</td>
//     </tr>

//     <tr>
//         <td width="70%" style="padding:8px 0; padding-right:10px; font-weight:bold;">Balance Amount</td>
//         <td width="30%" align="right" style="padding:8px 0; font-weight:bold;">
//             ${currency === 'INR' ? '₹' : currency}${BalanceAmount}
//         </td>
//     </tr>
//     ` : ''}

// </table>


//                             <table width="100%" cellpadding="6" cellspacing="0" border="0" style="
//                                 background-color:#f5f5f5; border-radius:4px; margin-top:20px;">
//                                 <tr>
//                                     <td width="50%" style="font-size:16px; font-weight:bold; line-height:20px;">Grand Total</td>
//                                     <td width="50%" align="right" style="font-size:16px; font-weight:bold; line-height:20px;">
//                                         ${isBusiness
//             ? `${currency === 'INR' ? '₹' : currency}${grandTotal}`
//             : `${currency === 'INR' ? '₹' : currency}${subtotal}`
//         }

//                                     </td>
//                                 </tr>
//                             </table>
//                         </td>
//                     </tr>

//                 </table>

//             </td>
//         </tr>
//     </table>

// </body>

// </html>
// `;

// }



export const sendMailOtpp = (email: string, name: string, otp: string) => {
  try {

    return `
        <div style="font-family: 'Segoe UI', Arial, sans-serif; background-color: #f6f9fc; padding: 30px;">
          <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">

            <div style="background-color: #4F46E5; color: #fff; padding: 20px 0; text-align: center;">
              <h2 style="margin: 0; font-size: 22px;">Login</h2>
            </div>

            <div style="padding: 30px; text-align: center; color: #333;">
              <p style="font-size: 16px;">Hi <b>${name}</b>,</p>
              <p style="font-size: 15px;">Use the following One-Time Password (OTP) to complete your login:</p>

              <div style="margin: 20px auto; display: inline-block; background: #4F46E5; color: #fff; font-size: 28px; letter-spacing: 4px; font-weight: bold; padding: 15px 30px; border-radius: 8px;">
                ${otp}
              </div>

              <p style="font-size: 14px; color: #555; margin-top: 20px;">
                This OTP is valid for <b>5 minutes</b>. Do not share it with anyone.
              </p>

              <p style="margin-top: 30px; font-size: 13px; color: #888;">
                If you did not request this login, please ignore this email.
              </p>
            </div>

            <div style="background-color: #f1f1f1; text-align: center; padding: 15px; font-size: 12px; color: #777;">
              © ${new Date().getFullYear()} ElanoxTech. All rights reserved.
            </div>
          </div>
        </div>
      `;

  } catch (error) {
    console.error("❌ Failed to send OTP mail:", error);
  }
}

