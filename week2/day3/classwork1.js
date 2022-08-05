// const express = require("express");

// const app = express();

// app.use(logger1);
// app.use(logger2);

// app.get("/user", (req, res) => {
//   return res.send("Hello");
// });

// app.get("/users", (req, res) => {
//   console.log("route handler");
//   res.send("All users");
// });

// function logger1(req, res, next) {
//   console.log("before middleware 1");
//   next();
//   console.log("after middleware 1");
// }

// function logger2(req, res, next) {
//   console.log("before middleware 2");
//   next();
//   console.log("after middleware 2");
// }

// app.listen(2345, function () {
//   console.log("listening on port 2345");
// });


const express = require("express");

const app = express();

// admin, user, student, teacher, IA, SDE1
app.get("/user", logger1("admin"), (req, res) => {
  res.send(req.role);
});

function logger1(role) {
  return function (req, res, next) {
    if (role == "admin") {
      req.role = "admin";
    } else {
      req.role = "user";
    }
    next();
  };
}

app.listen(2345, function () {
  console.log("listening on port 2345");
});