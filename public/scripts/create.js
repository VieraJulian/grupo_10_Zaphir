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

inputs.nombre.addEventListener("click", function(e) {
    let field = e.target.parentElement;
    let feedBack = field.querySelector(".msg-error")
    feedBack.classList.add("click")
})

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

inputs.descripcion.addEventListener("click", function(e) {
    let field = e.target.parentElement;
    let feedBack = field.querySelector(".msg-error")
    feedBack.classList.add("click")
})

inputs.imagen.addEventListener("change", function (e) {
    let field = e.target.parentElement
    let files = e.target.files
    let feed = field.querySelector(".feed")
    let msg = null

    if (files.length < 4) {
        msg = "Debes subir cuatro imágenes"
    } else if (files.length > 4) {
        msg = "Subiste demasiadas imagenes"
    }

    for (let index = 0; index < files.length; index++) {
        if (!["jpg", "gif", "png", "jpeg"].includes(files[index].type.split("/")[1])) {
            msg = "No es un formato valido"
        } else if (files[index].size > 2097152) {
            msg = "La imagen supera el peso de 2MB";
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

inputs.imagen.addEventListener("click", function(e) {
    let field = e.target.parentElement;
    let feedBack = field.querySelector(".msg-error")
    feedBack.classList.add("click")
})

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

inputs.categoria.addEventListener("click", function(e) {
    let field = e.target.parentElement;
    let feedBack = field.querySelector(".msg-error")
    feedBack.classList.add("click")
})

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

    value.split(",").forEach(c => {
        if (!validator.isAlpha(c)) {
            msg = "Los colores no deben contener números ni espacios"
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

inputs.color.addEventListener("click", function(e) {
    let field = e.target.parentElement;
    let feedBack = field.querySelector(".msg-error")
    feedBack.classList.add("click")
})

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

    value.split(",").forEach(t => {
        if (!validator.isAlpha(t)) {
            msg = "Los talles no deben contener números ni espacios"
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

inputs.talle.addEventListener("click", function(e) {
    let field = e.target.parentElement;
    let feedBack = field.querySelector(".msg-error")
    feedBack.classList.add("click")
})

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

inputs.stock.addEventListener("click", function(e) {
    let field = e.target.parentElement;
    let feedBack = field.querySelector(".msg-error")
    feedBack.classList.add("click")
})

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

inputs.precio.addEventListener("click", function(e) {
    let field = e.target.parentElement;
    let feedBack = field.querySelector(".msg-error")
    feedBack.classList.add("click")
})

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
    } else if (value <= 0) {
        msg = "El descuento debe ser mayor a cero"
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