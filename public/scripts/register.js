let forms = document.forms.form;
let inputs = forms.elements

inputs.nombre.addEventListener('input', function (e) {
    let field = e.target.parentElement;
    let value = e.target.value;
    let feed = field.querySelector(".feed")
    let msg = null;
    if (!validator.isLength(value, { min: 2 })) {
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
    if (!validator.isLength(value, { min: 7 })) {
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
    if (!validator.isNumeric(value)) {
        msg = "Ingrese un número"
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

inputs.password.addEventListener("input", function (e) {
    e.target.setAttribute("type", "text")
    let field = e.target.parentElement
    let value = e.target.value
    let feed = field.querySelector(".feed")
    let msg = null
    let config = {
        minLength: 7,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
    }
    if (!validator.isLength(value, { min: 7 })) {
        msg = "No tienes suficientes caracteres"
    } else if (!validator.isStrongPassword(value, config)) {
        msg = "Debe contener 1 número, 1 mayúscula y 1 caracter especial"
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
        minLength: 7,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
    }
    if (!validator.isLength(value, { min: 7 })) {
        msg = "No tienes suficientes caracteres"
    } else if (!validator.isStrongPassword(value, config)) {
        msg = "Debe contener 1 número, 1 mayúscula y 1 caracter especial"
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

form.addEventListener("submit", function (e) {
    e.preventDefault()
    let isCorrect = false

    if (e.target.querySelectorAll(".feed.valid").length == 4 && e.target.querySelectorAll(".feedTel.invalid").length != 1) {
        isCorrect = true
    }
    if (isCorrect) {
        e.target.submit()
    }
});