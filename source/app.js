const express = require('express');
const {resolve} = require('path');
const app = express();
const {port, start} = require("./modules/port");
const public = require("./modules/public");
const method = require("method-override");

app.listen(port, start);
app.use(public);
app.use(require("./modules/uploads"));

app.set("views", resolve(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(method("m"))

app.use(require("./routes/main.routes"))
app.use("/productos", require("./routes/products.routes"))
app.use("/usuario", require("./routes/users.routes"))