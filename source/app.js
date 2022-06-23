const path = require('path');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.listen(port, () => console.log('Servidor corriendo en puerto 3000'));

const public = path.resolve(__dirname, '../public');

app.use(express.static(public));

app.get("/", (req, res) => res.sendFile(path.resolve(__dirname, "views/home.html")));

app.get("/detalle-producto", (req, res) => res.sendFile(path.resolve(__dirname, "views/detalle-producto.html")));

app.get("/carrito", (req, res) => res.sendFile(path.resolve(__dirname, "views/carrito.html")));

app.get("/productos", (req, res) => res.sendFile(path.resolve(__dirname, "views/productos.html")));

app.get("/login", (req, res) => res.sendFile(path.resolve(__dirname,"views/login.html")))

app.get("/register", (req, res) => res.sendFile(path.resolve(__dirname, "views/register.html")));

