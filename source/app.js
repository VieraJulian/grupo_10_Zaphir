const express = require('express');
const { resolve } = require('path');
const app = express();
const { port, start } = require("./modules/port");
const public = require("./modules/public");
const method = require("method-override");
const session = require('express-session');
const cookieParser = require('cookie-parser');
const recordameMiddleware = require("./middlewares/recordame.middlewares");
const cors = require("cors");

app.listen(port, start);
app.use(public);
app.use(require("./modules/uploads"));

app.set("views", resolve(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(method("m"))

app.use(session({
    secret: 'nodejs',
    saveUninitialized: true,
    resave: true
}))

app.use(cookieParser());
app.use(recordameMiddleware);
app.use(require("./middlewares/user"))
app.use(cors());

app.use(require("./routes/main.routes"))
app.use("/productos", require("./routes/products.routes"))
app.use("/usuario", require("./routes/users.routes"))

app.use("/api/products", require("./routes/apis/productsApi.routes"))
app.use("/api/users", require("./routes/apis/usersApi.routes"))