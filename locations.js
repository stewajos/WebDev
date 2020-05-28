// All location endpoints in this file
module.exports = function(app){
    // class Locations {
    //     id,
    //     coordinates,
    //     human_readable_name
    // }	

	app.get('/locations', (req, res) => {
			const db = req.app.locals.db;	//access the database
			const collection = db.collection('locations');		//the locations document(table)
			collection.find().toArray(function(err, data){ 	// in the locations table grab everything
					//console.log(data);
					res.send(data);		//send everything back
					});
			});
	app.put('/locations', (req, res) => { // create a new location
		const db = req.app.locals.db;	//access the database
		const collection = db.collection('locations');	
        var location = {};
        var body = req.body; 
		location['id'] = body['id'];
		location['coordinates']= body['coordinates'];
		location['human_readable_name'] = body['human_readable_name'];
		if (collection.find(location[id])) // check if the location id exists elsewhere in the DB if so its a bad request
			res.send().code(400); 
		res.send(location);
	});
	
	// Put a location, create new one, delete, etc...
};
