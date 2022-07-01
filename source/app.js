const express = require('express');
const {resolve} = require('path');
const app = express();
const {port, start} = require("./modules/port");
const public = require("./modules/public");
app.listen(port, start);
app.use(public);
app.set("views", resolve(__dirname, "views"));
app.set("view engine", "ejs");



app.get("/", (req, res) => res.sendFile(resolve(__dirname, "views/home.html")));

app.get("/detalle", (req, res) => res.sendFile(resolve(__dirname, "views/products/detalle-producto.html")));

app.get("/carrito", (req, res) => res.sendFile(resolve(__dirname, "views/carrito.html")));

app.get("/productos", (req, res) => res.sendFile(resolve(__dirname, "views/products/productos.html")));

app.get("/ingresar", (req, res) => res.sendFile(resolve(__dirname,"views/login.html")))

app.get("/registro", (req, res) => res.sendFile(resolve(__dirname, "views/register.html")));

app.use(require("./routes/products.routes"))