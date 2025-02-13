const express = require("express");
const dbConnection = require("./config/dbConnect");
const methodOverride = require("method-override");
const app = express();
const port = 3000;

// view engine 등록
app.set("view engine", "ejs");
app.set("views", "./views");

app.use(express.static("./public"));
app.use(methodOverride("_method"));

dbConnection();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", require("./routes/loginRoute"));
app.use("/contacts", require("./routes/contactRoute"));

// app.get("/", (req, res) => {
//   res.render("home");
// });

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
