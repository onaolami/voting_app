const express = require("express");
const app = express();
const auth = require("./routes/auth");
const candidate = require("./routes/candidate")
const election = require("./routes/election")

app.use(express.json());
app.use("/auth", auth);
app.use("/candidate",candidate)
app.use("/election",election)

app.listen(5002, () => {
  console.log("server is running on port 5002");
});


