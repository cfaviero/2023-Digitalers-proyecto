const userInicio = [
    {
        fullname: 'Daniel Lee',
        email: 'admin@admin.com',
        id: '6',
        password: 'admin',
        role: "ROLE_ADMIN"
    },
    {
        fullname: 'Samantha Davis',
        email: 'samantha.davis@example.com',
        id: '7',
        password: 'alfabeta',
        role: "ROLE_CLIENT"
    },
    {
        fullname: 'James Moore',
        email: 'james.moore@example.com',
        id: '8',
        password: 'alfabeta',
        role: "ROLE_CLIENT"
    },
    {
        fullname: 'Isabella Taylor',
        email: 'isabella.taylor@example.com',
        id: '9',
        password: 'alfabeta',
        role: "ROLE_CLIENT"
    }
]

/*if( !localStorage.getItem("users") === null ) {

    localStorage.setItem("users", JSON.stringify(userInicio));

}*/

if (!localStorage.getItem("users")) {

    localStorage.setItem("users", JSON.stringify(userInicio));

}

const users = JSON.parse(localStorage.getItem("users"));

console.log(users)

const loginForm = document.getElementById("login")



//+ EVENTO SUBMIT == EVENTO SUBMIT == EVENTO SUBMIT == EVENTO SUBMIT == EVENTO SUBMIT
loginForm.addEventListener("submit", (event) => {
    //*Evitar el comportamiento por defecto del evento submit
    event.preventDefault();

    //*Obtener los datos ingresador por el usuario
    const emailInput = event.target.elements.email.value;
    const passwordInput = event.target.elements.password.value;

    //* Primero buscar si tengo un usuario con email
    const userExist = users.find(usr => {
        if (usr.email === emailInput) {
            return true;
        }
        return false;
    })

    if (!userExist || userExist.password !== passwordInput) {
        Swal.fire('Login Incorrecto', 'Los datos son incorrectos', 'error');
        return;
    }

    //* Hacer el login
    Swal.fire('Login Correcto', 'En breve será redireccionado', 'success');

    //userExist.password = undefined;
    delete userExist.password;

    localStorage.setItem('currentUser', JSON.stringify(userExist));

    setTimeout(function () {
        window.location.href = '/index.html';
    }, 2000)


    //* Guardo ese usuario en una variable
    //* Preguntar si ese usuario que yo encuentro tiene un password exactamente igual que la persona ingreso

    //# Guardar ese usuario en el localStorage
    //! Mostramos un alert del usuario


})
//+ EVENTO SUBMIT == EVENTO SUBMIT == EVENTO SUBMIT == EVENTO SUBMIT == EVENTO SUBMIT



function logout() {
    localStorage.removeItem("currentUser");
    setTimeout(function () {
        window.location.href = "/index.html"
            , 1500
    })
}