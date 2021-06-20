
const db = require('../helpers/db.helper');
var fs = require('fs');
const imageRoutes = require('../routes/image.routes');
const { response } = require('express');
var Image = db.Image;
const path = require('path')


exports.findImage = (req, res) => {
	var imageName = req.query.name;
      
	Image.findByPk(req.query.name).then(response=>{
		if(response){
			fs.readFile(path.join(__dirname, '../uploads/') + response.location , function (err, content) {
				if (err) {
				//specify the content type in the response will be an image
				fs.readFile(path.join(__dirname, '../../images/missing.webp'), function (err, img){
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
		}else{
			//specify the content type in the response will be an image
			fs.readFile(path.join(__dirname, '../../images/missing.webp'), function (err, img){
				if (err) {
				res.writeHead(400, {'Content-type':'text/html'})
				console.log(err);
				res.end("No such image");    
				} else {
				//specify the content type in the response will be an image
				res.writeHead(200,{'Content-type':'image/jpg'});
				res.end(img);
				}  
			})
				
		}
		
	})
	
      
}
;
exports.uploadImage = (req, res) => {
	
	const newImage =  {
		name: req.body.name+'-'+Date.now(),
		location: req.file.filename
	    };

	console.log( newImage);
	Image.create(newImage)
        .then((result) => { 
		res.status(200).send();  
	    })
	    .catch((err) => res.status(500).send() );
	    
}
                
            
exports.getAllImages = (req, res) => {
	Image.findAll({attributes: ['name']}).then((images)=>{
		if(images){
			res.status(200).send({data: images})
		}else{
			res.status(404).send()
		}
	})
}

exports.deleteImage = (req, res) => {
	Image.findByPk(req.query.name).then((image)=>{
		if(image){
			try{
				fs.unlinkSync(path.join(__dirname, '../uploads/') + image.location);
				console.log('successfully deleted /tmp/hello');
				return Image.destroy({
					where: {
					   name: req.query.name //this will be your id that you want to delete
					}
				     }).then(
					(count)=>{
						if(count>0){
							return res.status(200).send()
						}else{
							return res.status(404).send()
						}
					}
				     )
				
			}catch(err){
				console.log(err)
				return res.status(400).send()	
			}
		}else{
			res.status(404).send()
			console.log("not found")
		}
	})
}