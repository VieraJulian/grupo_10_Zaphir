const express = require('express');
const {resolve} = require('path');
const app = express();
const {port, start} = require("./modules/port");
const public = require("./modules/public");
app.listen(port, start);
app.use(public);
app.set("views", resolve(__dirname, "views"));
app.set("view engine", "ejs");
app.use(require("./routes/main.routes"))
app.use("/productos", require("./routes/products.routes"))
app.use("/usuario", require("./routes/users.routes"))