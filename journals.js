// All journal endpoints in this file
module.exports = function(app){
    // class Journal {
    //     id,
    //     journalId,
    //     content,
    //     timestamp,
    //     locationId
    // }	

	app.get('/journals', (req, res) => {
			const db = req.app.locals.db;	//access the database
			const collection = db.collection('journals');		//the journals document(table)
			collection.find().toArray(function(err, data){ 	// in the journals table grab everything
					//console.log(data);
					res.send(data);		//send everything back
					});
			});
	app.post('/journals', (req, res) => { // create a new journal
		const db = req.app.locals.db;	//access the database
		const collection = db.collection('journals');	
		var journal={};
		var body = req.body; 
		journal['id'] = body['id'];
		journal['journalId'] = body['journalId'];
		journal['content'] = body['content'];
		journal['timestamp'] = body['timestamp'];
		journal['locationId'] = body['locationId'];
		if (collection.find(journal.id)) // check if the journal id exists elsewhere in the DB if so its a bad request
			res.send().code(400); 
		res.send(journal);
	});
	app.delete('/journals', (res, req) => {
		const db = req.app.locals.db;	//access the database
		const collection = db.collection('users');	
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
	// Put a journal, create new one, delete, etc...
};
