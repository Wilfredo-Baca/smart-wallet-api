import expss from 'express';
const { nextFunction, request, response } = expss;

const notFound = (req = request, res = response, next = nextFunction) => {
  try {
    throw ({
      status: 404,
      message: 'esta ruta no ha sido implementada en el servidor',
      msg: 'No se encontró la ruta solicitada',
      eType: 'Not Found'
    });
  } catch (err) {
    next(err);
  }
}

export default notFound;