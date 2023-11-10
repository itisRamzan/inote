require("dotenv").config()
const connectToMongo = require("./database/db");
const express = require("express");
const cors = require("cors");
const port = process.env.PORT || 5000;

connectToMongo();

const app = express();
app.use(cors())
app.use(express.json())
app.use("/api/auth", require("./routes/auth"))
app.use("/api/notes", require("./routes/notes"))

app.listen(port, () => {
    console.log(`Connected Server http://localhost:${port}`);
})