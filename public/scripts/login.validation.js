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
  } else if (!validator.isEmail(value)) {
    msg = "El email debe tener formato de email";
  }

  if (msg) {
    box.classList.remove("valid");
    box.classList.add("invalid");
    feed.innerText = msg;
  } else {
    box.classList.remove("invalid");
    box.classList.add("valid");
    feed.innerText = "";
  }
});

inputs.password.addEventListener("input", (e) => {
  let fieldset = e.target.parentElement.parentElement;
  let box = e.target.parentElement;
  let value = e.target.value;
  let feed = fieldset.querySelector(".passwordLogin");
  let msg = null;

  if (!validator.isLength(value, { min: 8 })) {
    msg = "La contraseña debe tener como mínimo 8 caracteres";
  } else if (
    !validator.isStrongPassword(value, {
      minLength: 4,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
      returnScore: false,
    })
  ) {
    msg =
      "La contraseña debe contener al menos una letra mayuscula, una letra minuscula, un numero y un caracter especial";
  }

  if (msg) {
    box.classList.remove("valid");
    box.classList.add("invalid");
    feed.innerText = msg;
  } else {
    box.classList.remove("invalid");
    box.classList.add("valid");
    feed.innerText = "";
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




