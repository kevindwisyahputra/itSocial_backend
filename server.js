const express = require("express");
const cors = require("cors");
const { readdirSync } = require("fs");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// -- ROUTES --
readdirSync("./routes").map((r) => app.use("/", require("./routes/" + r)));

// -- DATABASE --
mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
  })
  .then(() => console.log("Database is Sucessfully Connected!"))
  .catch((err) => console.log("Error Connecting to MongoDb", err));

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is Running on Port ${PORT}`);
});
