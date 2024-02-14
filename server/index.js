const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const methodOverride = require("method-override");
const authRoute =require("./routes/auth")
const fileRoute =require("./routes/file")

const app = express();

dotenv.config();

//data base connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.info("Database connected"))
  .catch((err) => console.error(err));


app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("X-HTTP-Method-Override"));

app.use("/api/auth", authRoute);
app.use("/api/file",fileRoute)

app.listen(process.env.PORT, () => {
  console.info(`server running at ${process.env.PORT}`);
});