class UsuariosPermitidos {
  constructor(id, nombre, apellido, usuario, contraseña) {
    this.id = Number(id);
    this.nombre = String(nombre);
    this.apellido = String(apellido);
    this.usuario = String(usuario);
    this.contraseña = String(contraseña);
  }
}

const Usuarios = [
     {
      "id":1,
      "nombre" : "Iker",
      "apellido" : "Arana",
      "usuario":"iarana",
      "contraseña":"1234Abcd"
   },
   {
      "id":2,
      "nombre" : "Ander",
      "apellido" : "Goikoetxea",
      "usuario":"agoikoetxea",
      "contraseña":"5678Efgh"
   },

   {
      "id":3,
      "nombre" : "Jokin",
      "apellido" : "Olano",
      "usuario":"jolano",
      "contraseña":"9012Ijkl"
   }
]

const Usuarios_permitidos = Usuarios.map (
    (item) => 
       new UsuariosPermitidos(
            item.id,
            item.nombre,
            item.apellido,
            item.usuario,
            item.contraseña
        )
)

if (!localStorage.getItem("usuariosPermitidos")) {
  localStorage.setItem("usuariosPermitidos", JSON.stringify(Usuarios_permitidos));
}