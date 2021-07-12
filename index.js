const express = require("express");
const app = express();
const path = require("path")
const PORT = process.env.PORT || 5000;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.use(express.static(path.join(__dirname, 'public')));

const todoRouter = require("./router/todoRouter");
const indexRouter = require("./router/indexRouter");

app.use(express.urlencoded());
app.use(express.json());
app.use('/',indexRouter);
app.use('/todo', todoRouter);


app.listen(PORT,() => {
    console.log(`Server listening to ${PORT}`)
});
