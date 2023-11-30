//* La info en localStorage puede sobreescribirse

localStorage.setItem("nombre", "Juancito Gonzalez");
localStorage.setItem("currentUser", "Pedro Talio")

//* Con sessionStorage los datos que guardan se encuentran unicamente en la pestaña que se encuentra
//sessionStorage.setItem("nombreTemporal", "Nombre de Persona");

const nombreGuardado = localStorage.getItem("nombre");

console.log(nombreGuardado);

Swal.fire('Bienvenido', `Que bueno verte de nuevo ${nombreGuardado}`)

//* Cuando se invoca el metodo borra los datos usados de currentUser.
//localStorage.removeItem("currentUser");

//* Borra todo lo que se encuentre en el localStorage.
//localStorage.clear();

const users = [
    {
        fullname: 'James Moore',
        age: 45,
        email: 'james.moore@example.com',
        id: '8'
    },
    {
        fullname: 'Isabella Taylor',
        age: 29,
        email: 'isabella.taylor@example.com',
        id: '9'
    }
]

//*(JSON.stringify(users) Cuando voy a guardar un objeto o array tengo que si o si convertirlo a un string
localStorage.setItem("usuariosGuardados", JSON.stringify(users));
//*(JSON.parse) Hace que una cadena de texto en formato json se transforme en un objeto javascript
//*Cuando obtengo el dato lo transformo en un objeto js para poder trabajarlo como tal
const temp = JSON.parse(  localStorage.getItem("usuariosGuardados")  );

console.log(temp);