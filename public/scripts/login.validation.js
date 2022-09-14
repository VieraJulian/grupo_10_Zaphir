let form = document.forms.form
let inputs = form.elements;

inputs.email.addEventListener("input", (e) => {
  let fieldset = e.target.parentElement.parentElement;
  let box = e.target.parentElement;
  let value = e.target.value;
  let feed = fieldset.querySelector(".emailLogin");
  let msg = null;

  if (value.length === 0) {
    msg = "El email no puede quedar vacío";
  } else if (!validator.isLength(value, { min: 7 })) {
    msg = "No tienes suficientes caracteres"
  } else if (!validator.isEmail(value)) {
    msg = "No es un email valido"
  }

  if (msg) {
    feed.classList.remove("valid");
    feed.classList.add("invalid");
    feed.innerText = msg;
  } else {
    feed.classList.remove("invalid");
    feed.classList.add("valid");
    feed.innerText = "El campo es correcto"
  }
});

inputs.password.addEventListener("input", (e) => {
  let fieldset = e.target.parentElement.parentElement;
  let box = e.target.parentElement;
  let value = e.target.value;
  let feed = fieldset.querySelector(".passwordLogin");
  let msg = null;


  if (value.length === 0) {
    msg = "La contraseña no puede quedar vacía"
  } else if (!validator.isLength(value, { min: 8 })) {
    msg = "La contraseña debe tener como mínimo 8 caracteres";
  } else if (
    !validator.isStrongPassword(value, {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
      returnScore: false,
    })
  ) {
    msg = "La contraseña debe contener al menos una letra mayúscula, una letra minúscula, un número y un carácter especial";
  }

  if (msg) {
    feed.classList.remove("valid");
    feed.classList.add("invalid");
    feed.innerText = msg;
  } else {
    feed.classList.remove("invalid");
    feed.classList.add("valid");
    feed.innerText = "El campo es correcto"
  }
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let isCorrect = false;

  if (e.target.querySelectorAll(".emailLogin.valid").length === 4) {
    isCorrect = true;
  }

  if (isCorrect) {
    e.target.submit();
  } else {
    window.alert(
      "Algunos datos no son correctos, por favor verificar los errores en los campos"
    );
  }
});




