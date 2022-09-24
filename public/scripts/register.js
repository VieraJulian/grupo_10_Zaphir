let forms = document.forms.form;
let inputs = forms.elements

inputs.nombre.addEventListener('input', function (e) {
    let field = e.target.parentElement;
    let value = e.target.value;
    let feed = field.querySelector(".feed")
    let msg = null;

    if (value.length === 0) {
        msg = "El nombre no puede quedar vació"
    } else if (!validator.isLength(value, { min: 2 })) {
        msg = "El nombre debe contener mínimo dos caracteres"
    }

    if (msg) {
        feed.classList.remove("valid")
        feed.classList.add("invalid")
        feed.innerText = msg;
    } else {
        feed.classList.remove("invalid")
        feed.classList.add("valid")
        feed.innerText = "El campo es correcto"
    }
});

inputs.email.addEventListener("input", function (e) {
    let field = e.target.parentElement
    let value = e.target.value
    let feed = field.querySelector(".feed")
    let msg = null

    if (value.length === 0) {
        msg = "El email no puede quedar vacío"
    } else if (!validator.isLength(value, { min: 7 })) {
        msg = "No tienes suficientes caracteres"
    } else if (!validator.isEmail(value)) {
        msg = "No es un email valido"
    }
    if (msg) {
        feed.classList.remove("valid")
        feed.classList.add("invalid")
        feed.innerText = msg;
    } else {
        feed.classList.remove("invalid")
        feed.classList.add("valid")
        feed.innerText = "El campo es correcto"
    }
})

inputs.telefono.addEventListener("input", function (e) {
    let field = e.target.parentElement
    let value = e.target.value
    let feed = field.querySelector(".feedTel")
    let msg = null
    let vacio = false

    if (value.length === 0) {
        vacio = true
    }
    if (!validator.isNumeric(value)) {
        msg = "Ingrese un número"
    }

    if (vacio) {
        feed.classList.remove("valid")
        feed.classList.remove("invalid")
    } else if (msg) {
        feed.classList.remove("valid")
        feed.classList.add("invalid")
        feed.innerText = msg;
    } else {
        feed.classList.remove("invalid")
        feed.classList.add("valid")
        feed.innerText = "El campo es correcto"
    }
})

inputs.password.addEventListener("input", function (e) {
    e.target.setAttribute("type", "text")
    let field = e.target.parentElement
    let value = e.target.value
    let feed = field.querySelector(".feed")
    let msg = null
    let config = {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
    }
    if (value.length === 0) {
        msg = "La contraseña no puede quedar vacía"
    } else if (!validator.isLength(value, { min: 8 })) {
        msg = "La contraseña debe contener mínimo ocho caracteres"
    } else if (!validator.isStrongPassword(value, config)) {
        msg = "La contraseña debe contener al menos una letra mayúscula, una letra minúscula, un número y un carácter especial"
    }

    const callbackChange = () => {
        e.target.setAttribute("type", "password")
    }
    setTimeout(callbackChange, 250)

    if (msg) {
        feed.classList.remove("valid")
        feed.classList.add("invalid")
        feed.innerText = msg;
    } else {
        feed.classList.remove("invalid")
        feed.classList.add("valid")
        feed.innerText = "El campo es correcto"
    }
})

inputs.passwordConfirm.addEventListener("input", function (e) {
    e.target.setAttribute("type", "text")
    let field = e.target.parentElement
    let value = e.target.value
    let feed = field.querySelector(".feed")
    let msg = null
    let config = {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
    }
    if (value.length === 0) {
        msg = "La contraseña no puede quedar vacía"
    } else if (!validator.isLength(value, { min: 8 })) {
        msg = "La contraseña debe contener mínimo ocho caracteres"
    } else if (!validator.isStrongPassword(value, config)) {
        msg = "La contraseña debe contener al menos una letra mayúscula, una letra minúscula, un número y un carácter especial"
    }

    const callbackChange = () => {
        e.target.setAttribute("type", "password")
    }
    setTimeout(callbackChange, 250)

    if (msg) {
        feed.classList.remove("valid")
        feed.classList.add("invalid")
        feed.innerText = msg;
    } else {
        feed.classList.remove("invalid")
        feed.classList.add("valid")
        feed.innerText = "El campo es correcto"
    }
})

forms.addEventListener("submit", function (e) {
    e.preventDefault()
    let isCorrect = false

    if (e.target.querySelectorAll(".feed.valid").length === 4 && e.target.querySelectorAll(".feedTel.invalid").length !== 1) {
        isCorrect = true
    }

    if (isCorrect) {
        e.target.submit();
    } else {
        Swal.fire({
            title: 'Error!',
            text: 'Algunos datos no son correctos',
            icon: 'error',
        })
    }
});