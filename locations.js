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
	app.post('/locations', (req, res) => { // create a new location
		const db = req.app.locals.db;	//access the database
		const collection = db.collection('locations');	
        var location = {};
        var body = req.body; 
		location['id'] = body['id'];
		location['coordinates']= body['coordinates'];
		location['human_readable_name'] = body['human_readable_name'];
		if (!collection.find(location['id'])){
			res.sendStatus(400);
		} // check if the location id exists elsewhere in the DB if so its a bad request
		else{
			collection.insert(location);
			res.send(location);
		}
	});
	app.delete('/locations', (req, res) => {
		const db = req.app.locals.db;	//access the database
		const collection = db.collection('locations');	
		var user={};
		var body = req.body;
		if (!collection.find({"id" : req.body.id})) {
			collection.find({"id" : req.body.id}).toArray(function(err, data){ 	// in the users table grab everything
			//console.log(data);
			res.sendStatus(404)
		});
		} else {
		collection.remove({"id" : req.body.id}); //
		res.sendStatus(202)
		res.send(body);
		}	
	})
	// Put a location, create new one, delete, etc...
};
