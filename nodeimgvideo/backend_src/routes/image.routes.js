
const controller = require('../controller/image.controller')
const multer = require('multer');
var Image = require('../models/image');
path = require('path')

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
	    cb(null, path.join(__dirname, '../uploads/'));
	},
	filename: function (req, file, cb) {
	    cb(null, Date.now() + file.originalname);
	}
    });
    
    const fileFilter = (req, file, cb) => {
	if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/webp' || file.mimetype === 'image/svg+xml') {
	    cb(null, true);
	} else {
		console.log(file.mimetype )
	    // rejects storing a file
	    cb(null, false);
	}
    }
    
    const upload = multer({
	storage: storage,
	limits: {
	    fileSize: 1024 * 1024 * 5
	},
	fileFilter: fileFilter
    });

module.exports = function(app){
	app.use(function(req, res, next){
	    res.header(
		"Access-Control-Allow-Headers",
		"x-access-token, Origin, Content-type, Accept"
	    );
	    next();
	});
	
	app.get("/", function (req, res) {
		res.status(200).send("Hello world again");
	});
	
	app.get("/image" , controller.findImage);

	app.post("/image/upload", upload.single('url'), controller.uploadImage)

	app.get("/images/all" , controller.getAllImages);

	app.delete("/image/delete", controller.deleteImage);
};
    
   
      