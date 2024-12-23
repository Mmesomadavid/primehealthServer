export function emailTemplate(title, bodyContent) {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>${title}</title>
      </head>
        <table style="width: 100%">
            <tr>
              <td style="background-color: #13160F; padding: 20px; text-align: center;">
                <img style="max-width: 100px;" src="https://firebasestorage.googleapis.com/v0/b/beeyond-pm.appspot.com/o/primehealthLogo.png?alt=media&token=7dd0f89e-7624-43cc-a79b-e0e63f64a0c7" alt="Primehealth Logo">
              </td>
            </tr>
            <tr style="padding: 40px 20px;">
              ${bodyContent}
            </tr>
            <tr>
              <td style="background-color: #13160F; padding: 20px; text-align: center;">
                <img style="max-width: 100px; margin-bottom: 10px;" src="https://firebasestorage.googleapis.com/v0/b/beeyond-pm.appspot.com/o/primehealthLogo.png?alt=media&token=7dd0f89e-7624-43cc-a79b-e0e63f64a0c7" alt="Primehealth Logo">
                <p style="font-size: 12px; color: #fafafa; margin-bottom: 10px;">© 2023 Salesguru Company | All Rights Reserved</p>
              </td>
            </tr>
        </table>
      </html>    
    `;
  }