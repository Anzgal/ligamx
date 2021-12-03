import nodemailer from 'nodemailer'

export default async function main(req, res) {
  const { body } = req

  console.log('QUERY', body)
  console.log('USER', process.env.EMAILUSER)
  console.log('PASS', process.env.EMAILPASS)

  try {
    let transporter = nodemailer.createTransport({
      host: 'smtp.ionos.mx',
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAILUSER,
        pass: process.env.EMAILPASS,
      },
    })

    let info = await transporter.sendMail(
      {
        from: 'Contacto <hola@domain.mx>',
        to: 'agalvan70@hotmail.com',
        // to: 'ebernal.n98@gmail.com',
        subject: 'Nuevo mensaje desde página web',
        text: 'Nuevo mensaje desde página web',
        html: `
                <div style="max-width:600px;width:100%">
                    <p>Nuevo mensaje recibido desde página web.</p>
                    <ul>
                        <li><b>Nombre: </b> ${body.name}</li>
                        <li><b>Apellidos: </b> ${body.lastName}</li>
                        <li><b>Teléfono: </b> ${body.phone}</li>
                        <li><b>Email: </b> ${body.email}</li>
                        <li><b>Mensaje: </b> ${body.message}</li>
                    </ul>
                    <p>Gracias,</p>
                    <p>Liga MX.</p>
                </div>
            `,
      },
      function (error, info) {
        if (error) {
          console.log('Error:', error)
        }
        console.log('Message sent: ' + info.response)
      }
    )

    console.log('Message sent: %s', info.messageId)
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info))

    res.json({ info })
  } catch (error) {
    res.json({ error })
  }
}
