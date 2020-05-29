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
	app.post('/images', (req, res) => { // create a new image
		const db = req.app.locals.db;	//access the database
		const collection = db.collection('images');	
        var image = {};
        var body = req.body; 
		image['id'] = body['id'];
		image['length']= body['length'];
		image['filetype'] = body['filetype'];
		image['bytes'] = body['bytes'];
		image['locationId'] = body['locationId'];
		if (collection.find(image.id)) // check if the image id exists elsewhere in the DB if so its a bad request
			res.sendStatus(400); 
		else{
			collection.insert(image)
			res.send(image);
		}
		
	});
	app.delete('/images', (req,res) => {
		const db = req.app.locals.db;	//access the database
		const collection = db.collection('images');	
		var body = req.body;
		if (collection.find({"id" : req.body.id})) {
			collection.find({"id" : req.body.id}).toArray(function(err, data){ 	// in the users table grab everything
			//console.log(data);
			res.send(data);		//send everything back
			});
		}
		collection.remove({"id" : req.body.id}); //
		res.sendStatus(202)
		res.send(body);
	})
	// Put a image, create new one, delete, etc...
};
