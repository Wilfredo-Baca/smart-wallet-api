export const metas = {
  getMetasByClientID: `EXEC sw.ObtenerEstadoMetasAhorro @IDUsuario`,
  getPrioridades: `EXEC sw.getPrioridades`,
  createMeta: `EXEC sw.InsertarMetaAhorro @IDUsuario, @Titulo, @Monto, @Prioridad, @FechaInicio, @FechaFin, @Descripcion`,
  getMetaById: `EXEC sw.ObtenerMetaAhorroPorID @IDMeta`,
  TransferirFondosMetaAhorro: `EXEC sw.TransferirFondosMetaAhorro @IDUsuario, @IDMeta, @IDCuentaOrigen, @Monto`,
}
export const users = {
  findUserByOid: `EXEC sw.findUserByOid @oid`,
  createUser: `EXEC sw.SignUpUsuarioProveedor @Nombre, @Correo, @ID_Proveedor, @ID_Usuario_Proveedor, @Identificacion, @Telefono,
                @Direccion, @Fecha_Nacimiento`,
}
export const accounts = {
  getAccountByUser: `EXEC sw.ObtenerCuentasBancariasPorIDUsuario @IDUsuario`,
}