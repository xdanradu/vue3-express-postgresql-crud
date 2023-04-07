const express = require("express");
const cors = require("cors");

const app = express();

let corsOptions = {
  origin: "http://localhost:4202"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");
db.sequelize.sync();
// // drop the table if it already exists
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

// root url
app.get("/", (req, res) => {
  res.json({ message: "api v1" });
});

require("./app/routes/turorial.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 4201;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
