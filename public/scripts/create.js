let forms = document.forms.form;
let inputs = forms.elements
console.log(forms)

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
    } else if (files.length > 4){
        msg = "Subiste demasiadas imagenes"
    }

    for (let index = 0; index < files.length; index++) {
        if (!["jpg", "gif", "png", "jpeg"].includes(files[index].type.split("/")[1])) {
            msg = "No es un formato valido"
        }
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

inputs.categoria.addEventListener('input', function (e) {
    let field = e.target.parentElement;
    let value = e.target.value;
    let feed = field.querySelector(".feed")
    let msg = null;
    if (value.length === 0) {
        msg = "La categoría no puede quedar vacía"
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

inputs.color.addEventListener('input', function (e) {
    let field = e.target.parentElement;
    let value = e.target.value
    let feed = field.querySelector(".feed")
    let msg = null;
    
    if (value.length === 0) {
        msg = "Los colores no pueden quedar vacíos"
    } else if (value.split(",").length > 12) {
        msg = "Los colores no pueden ser más de doce";
    }

    value.split(",").forEach(c => {
        if (c.length > 0 && c.length < 3) {
            msg = "Los colores deben tener más de tres caracteres";
        }
    })

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

inputs.talle.addEventListener('input', function (e) {
    let field = e.target.parentElement;
    let value = e.target.value
    let feed = field.querySelector(".feed")
    let msg = null;
    
    if (value.length === 0) {
        msg = "Los talles no pueden quedar vacíos"
    } else if (value.split(",").length > 6) {
        msg = "Los talles no pueden ser más de seis";
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

inputs.stock.addEventListener('input', function (e) {
    let field = e.target.parentElement;
    let value = e.target.value
    let feed = field.querySelector(".feed")
    let msg = null;
    
    if (value.length === 0) {
        msg = "El stock no puede quedar vació"
    } else if (value <= 0) {
        msg = "El stock debe ser mayor a cero"
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

inputs.precio.addEventListener('input', function (e) {
    let field = e.target.parentElement;
    let value = e.target.value
    let feed = field.querySelector(".feed")
    let msg = null;
    
    if (value.length === 0) {
        msg = "El precio no puede quedar vació"
    } else if (value <= 0) {
        msg = "El precio debe ser mayor a cero"
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

inputs.descuento.addEventListener("input", function (e) {
    let field = e.target.parentElement
    let value = e.target.value
    let feed = field.querySelector(".feedSale")
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

forms.addEventListener("submit", function (e) {
    e.preventDefault()
    let isCorrect = false
    
    if (e.target.querySelectorAll(".feed.valid").length >= 8 && e.target.querySelectorAll(".feedSale.invalid").length != 1) {
        isCorrect = true
    }
    if (isCorrect) {
        e.target.submit()
    }
});