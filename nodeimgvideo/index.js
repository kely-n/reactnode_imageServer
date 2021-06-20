var express = require("express");
const bodyPaser = require("body-parser");
var app = express();
const cors = require("cors");

app.use(cors());
//parsing requests or content-type  - application/json
app.use(bodyPaser.json());

//parsing requests or content-type - application/x-www-form-urlencoded
app.use(bodyPaser.urlencoded({extended: true}));

var PORT = 3001;

require('./backend_src/routes/image.routes')(app);

app.listen(PORT, function () {
  console.log("Server is running on PORT:", PORT);
});
