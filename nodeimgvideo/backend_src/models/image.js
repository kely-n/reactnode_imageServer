const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//creating an image schema to store images in a mongodb database

var Image_Schema = new Schema({
	_id: false,
	name : {
		type: String,
		unique: true,
    		index: true,
		required: true
	}, 
	url: {
		type: String,
		required: true
	}
})

var Image = mongoose.model('Image', Image_Schema);

module.exports = Image;