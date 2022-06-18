const path = require('path');
const express = require('express');
const app = express();

app.listen(3000, () => console.log('Servidor corriendo en puerto 3000'));

const public = path.resolve(__dirname, '../public');

app.use(express.static(public));

app.get("/", (req, res) => res.sendFile(path.resolve(__dirname, "views/home.html")));

app.get("/header", (req, res) => res.sendFile(path.resolve(__dirname, "views/header-mobile.html")));