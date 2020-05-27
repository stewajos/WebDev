// All image endpoints in this file
module.exports = function(app){
    // class Image {
    //     id,
    //     length (in bytes),
    //     filetype,
    //     bytes,
    //     locationId
    // }

	app.get('/images', (req, res) => {
			const db = req.app.locals.db;	//access the database
			const collection = db.collection('images');		//the images document(table)
			collection.find().toArray(function(err, data){ 	// in the images table grab everything
					//console.log(data);
					res.send(data);		//send everything back
					});
			});
	app.put('/images', (req, res) => { // create a new image
		const db = req.app.locals.db;	//access the database
		const collection = db.collection('images');	
		var image; 
		image['id'] = data['id'];
		image['length']= data['length'];
		image['filetype'] = data['filetype'];
		image['bytes'] = data['byes'];
		image['locationId'] = data['locationId'];
		if (collection.find(image[Id])) // check if the image id exists elsewhere in the DB if so its a bad request
			res.send().code(400); 
		res.send(image);
	});
	
	// Put a image, create new one, delete, etc...
};
