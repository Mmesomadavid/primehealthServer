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
                <img style="max-width: 100px;" src="https://firebasestorage.googleapis.com/v0/b/prime-health-611ef.appspot.com/o/auth%2Ffull-black.png?alt=media&token=add0f23d-a4e1-424f-a007-17d10261c8b0 alt="Primehealth Logo">
              </td>
            </tr>
            <tr style="padding: 40px 20px;">
              ${bodyContent}
            </tr>
        </table>
      </html>    
    `;
  }