const express = require("express");
const app = express();
const auth = require("./routes/auth");

app.use(express.json());
app.use("/auth", auth);

app.listen(5002, () => {
  console.log("server is running on port 5002");
});
