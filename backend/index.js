const connect_to_mongoDB = require("./db");
connect_to_mongoDB();

const express = require("express");
const app = express();
const port = 5000;

//Available ROUTES

app.use(express.json());
app.use("/api/auth", require("./routes/auth"));
app.post("/", (req, res) => {
  res.send("Hello");
});

app.listen(port, () => {
  console.log(`Login Form listening on port ${port}`);
});



// const cursor = coll.find({
//   "surfaceTemperatureC.mean": { $lt: 15 },
//   "surfaceTemperatureC.min": { $gt: -100 },
// });
