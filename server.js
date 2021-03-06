const express = require("express");
const server = express();
const path = require("path");
const app = express();
app.use(express.static(__dirname + "/dist/note-web-app"));
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname + "/dist/note-web-app/index.html"));
});
app.listen(process.env.PORT || 4200, () => {
  console.log(`node app working on ${process.env.PORT}`);
});
