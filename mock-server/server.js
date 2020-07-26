const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("json:api:spec MockServer started on ::/api/*");
});

module.exports = {
  start: (port = 3001) => {
    app.listen(port, () => {
      console.log(`Listening on port ${port}`);
    });
  },
};
