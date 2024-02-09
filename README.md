## PRIM SERVER

- Iniciar datos del catalogo del cache.
- Una vez finalize la carga del Catalogo General, se hace el emit de socket IO
- En cache ser carga (data, fecha).
  Si es la primera vez, fecha estara vacia, se envia todo al Mac que ha hecho la conexion
  Se setean los datos en cache (data y fecha) y se actualiza el state con el cache

  Si existia un campo fecha, se devuelven los articulos con fecha mod posterior a la fecha
  Se setean los datos en cache (data y fecha) y se actualiza el state con el cache
