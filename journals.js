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
			const db = req.app.locals.db;	// This accesses the database
			const collection = db.collection('journals');   // This is the journal document table
			collection.find().toArray(function(err, data){ 	// Grabs everything in the journal document table
					//console.log(data);
					res.send(data);		//This sends everything entered in back
					});
			});
	app.post('/journals', (req, res) => { // Creates new journal entry
		const db = req.app.locals.db;	// Acceses mongoDB
		const collection = db.collection('journals');	
		var journal={};
		var body = req.body; 
		journal['id'] = body['id'];
		journal['journalId'] = body['journalId'];
		journal['content'] = body['content'];
		journal['timestamp'] = body['timestamp'];
		journal['locationId'] = body['locationId'];
        if (collection.find(journal.id)) 
        // Above checks if the journal id exists elsewhere in the DB.
        // And if so its a bad request
			res.send().code(400); 
		res.send(journal);
	});
	app.delete('/journals', (res, req) => {
		const db = req.app.locals.db;	// This accesses MongoDB
		const collection = db.collection('users');	
		var body = req.body;
		if (collection.find({"id" : req.body.id})) {
			collection.find({"id" : req.body.id}).toArray(function(err, data){ 	
            // Grabs everything in the user table
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
