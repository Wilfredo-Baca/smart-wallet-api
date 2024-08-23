
const errorHandler = (err, req, res, next) => {
  return res.status(err.status).send(`
    <!DOCTYPE html>
    <html lang="es">
      <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${err.status} ${err.eType}</title>
        <style>
          body {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            background-color: #f5f5f5;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            font-size: 1.2rem;
            color: #333;
          }
          h1 {
            font-size: 3rem;
          }
          hr {
            size: 1px;
            width: 100%;
            align: left;
          }
        </style>
      </head>
      <body>
        <h1>${err.status} - ${err.eType}</h1>
        <hr noshade>
        <p>${err.msg}</p>
      </body>
    </html>
  `);
}

export default errorHandler;