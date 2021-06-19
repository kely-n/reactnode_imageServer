var express = require("express");

var app = express();
var fs = require('fs');

var PORT = 3000;

app.get("/", function (req, res) {
  res.status(200).send("Hello world again");
});

app.get("/image", function (req, res) {
  var imageName = req.query.name;

  fs.readFile('images/' + imageName, function (err, content) {
    if (err) {
        //specify the content type in the response will be an image
        fs.readFile('images/missing.webp', function (err, img){
          if (err) {
              res.writeHead(400, {'Content-type':'text/html'})
              console.log(err);
              res.end("No such image");    
          } else {
              //specify the content type in the response will be an image
              res.writeHead(200,{'Content-type':'image/jpg'});
              res.end(img);
          }  
        });
          
    } else {
        //specify the content type in the response will be an image
        res.writeHead(200,{'Content-type':'image/jpg'});
        res.end(content);
    }
});

});

app.listen(PORT, function () {
  console.log("Server is running on PORT:", PORT);
});
