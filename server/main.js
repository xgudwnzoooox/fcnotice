// 기본 템플릿
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var compression = require("compression");
var helmet = require("helmet");
var cors = require("cors");
var db = require("./lib/db");
// git
// second test
// third test

app.use(cors());
app.use(helmet());
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(compression());
app.use("/image", express.static("./uploads"));

var indexRouter = require("./routes/index");
var contentRouter = require("./routes/content");
var searchRouter = require("./routes/search");

app.use("/", indexRouter);
app.use("/content", contentRouter);
app.use("/search", searchRouter);

app.use(function (req, res, next) {
  res.status(404).send("Sorry cant find that!");
});

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(4000, function () {
  console.log("Example app listening on port 4000!");
});
