"use strict";

var fs = require('fs');

var Image = require('../models/image');

exports.findImage = function (req, res) {
  var imageName = req.query.name;
  fs.readFile('images/' + imageName, function (err, content) {
    if (err) {
      //specify the content type in the response will be an image
      fs.readFile('images/missing.webp', function (err, img) {
        if (err) {
          res.writeHead(400, {
            'Content-type': 'text/html'
          });
          console.log(err);
          res.end("No such image");
        } else {
          //specify the content type in the response will be an image
          res.writeHead(200, {
            'Content-type': 'image/jpg'
          });
          res.end(img);
        }
      });
    } else {
      //specify the content type in the response will be an image
      res.writeHead(200, {
        'Content-type': 'image/jpg'
      });
      res.end(content);
    }
  });
};

exports.uploadImage = function (req, res) {
  var newImage = new Image({
    name: req.body.name,
    location: req.file.filename
  });
  console.log(req.file.filename);
  newImage.save().then(function (result) {
    console.log(result);
    res.status(200).json({
      success: true,
      document: result
    });
  })["catch"](function (err) {
    return console.log(err);
  });
};