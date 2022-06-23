const path = require('path');
const express = require('express');
const app = express();

app.listen(3000, () => console.log('Servidor corriendo en puerto 3000'));

const public = path.resolve(__dirname, '../public');

app.use(express.static(public));

app.get("/", (req, res) => res.sendFile(path.resolve(__dirname, "views/home.html")));

<<<<<<< HEAD
app.get("/footer", (req, res) => res.sendFile(path.resolve(__dirname, "views/footer.html")));
=======
app.get("/detalle-producto", (req, res) => res.sendFile(path.resolve(__dirname, "views/detalle-producto.html")));

app.get("/carrito", (req, res) => res.sendFile(path.resolve(__dirname, "views/carrito.html")));
>>>>>>> 08e4fcb27d060adbf0586af1bcbf789b8ffe6e85
