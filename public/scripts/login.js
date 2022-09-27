let form = document.forms.form
let inputs = form.elements;

inputs.email.addEventListener("input", (e) => {
  let field = e.target.parentElement;
  let value = e.target.value;
  let feed = field.querySelector(".emailLogin");
  let msg = null;
  console.log(feed)

  if (value.length === 0) {
    msg = "El email no puede quedar vacío";
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

inputs.email.addEventListener("click", function(e) {
  let field = e.target.parentElement;
  let feedBack = field.querySelector(".msg-error")
  feedBack.classList.add("click")
})

inputs.password.addEventListener("input", (e) => {
  let field = e.target.parentElement;
  let value = e.target.value;
  let feed = field.querySelector(".passwordLogin");
  let msg = null;


  if (value.length === 0) {
    msg = "La contraseña no puede quedar vacía"
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

inputs.password.addEventListener("click", function(e) {
  let field = e.target.parentElement;
  let feedBack = field.querySelector(".msg-error")
  feedBack.classList.add("click")
})