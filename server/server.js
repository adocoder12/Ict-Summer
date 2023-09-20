require("dotenv").config();
const bodyParser = require("body-parser");
const express = require("express");
const db = require("./Database/db");
const cors = require("cors");

const userRoute = require("./Routes/userRoutes");

const app = express();

app.use(bodyParser.json());
app.use(express.json());
// Connect to DB
db.connect();

//CORS
app.use("*", cors());
app.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Origin",
    `http://localhost:${process.env.REACT_URI}`
  );

  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );

  res.header("Access-Control-Expose-Headers", "Authorization");

  next();
});

//ROUTES

app.get("/", (req, res) => {
  res.send("Get All API");
});

app.use("/api/users", userRoute);

const PORT = 8080 || process.env.PORT;
app.listen(PORT, () => {
  console.log(`connected to server at port ${PORT}`);
});

// app.use("*", cors());

// app.use(
//   cors({
//     origin: `http://localhost:${process.env.REACT_URI}`,
//     credentials: true,
//     methods: ["GET", "POST", "UPDATE", "PUT"],
//   })
// );
