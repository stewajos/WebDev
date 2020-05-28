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
	app.put('/journals', (req, res) => { // create a new journal
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
	
	// Put a journal, create new one, delete, etc...
};
