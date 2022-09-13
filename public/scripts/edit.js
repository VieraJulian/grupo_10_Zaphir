let forms = document.forms.form;
let inputs = forms.elements

inputs.nombre.addEventListener('input', function (e) {
    let field = e.target.parentElement;
    let value = e.target.value;
    let feed = field.querySelector(".feed")
    let msg = null;

    if (value.length === 0) {
        msg = "El nombre no puede quedar vació"
    } else if (!validator.isLength(value, { min: 5 })) {
        msg = "El nombre debe contener mínimo cinco caracteres"
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

inputs.descripcion.addEventListener('input', function (e) {
    let field = e.target.parentElement;
    let value = e.target.value;
    let feed = field.querySelector(".feed")
    let msg = null;
    if (value.length === 0) {
        msg = "La descripción no puede quedar vacía"
    } else if (!validator.isLength(value, { min: 20 })) {
        msg = "La descripción debe tener mínimo veinte caracteres"
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

inputs.imagen.addEventListener("change", function (e) {
    let field = e.target.parentElement
    let files = e.target.files
    let feed = field.querySelector(".feed")
    let msg = null

    if (files.length < 4) {
        msg = "Debes subir cuatro imágenes"
    } else if (!validator.isMimeType(files[0].type)) {
        msg = "No es un formato valido"
    } else if (!["jpg", "gif", "png", "jpeg"].includes(files[0].type.split("/")[1])) {
        msg = "No es un formato valido"

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

inputs.categoria.addEventListener('input', function (e) {
    let field = e.target.parentElement;
    let value = e.target.value;
    let feed = field.querySelector(".feed")
    let msg = null;
    if (value === undefined) {
        msg = "Debes seleccionar una categoría"
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
