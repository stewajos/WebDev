// All comment endpoints in this file
module.exports = function(app){
    // class Comments {
    //     id,
    //     journalId,
    //     uid (who posted the comment),
    //     datetime
    // }


	app.get('/comments', (req, res) => {
			const db = req.app.locals.db;	//access the database
			const collection = db.collection('comments');		//the comments document(table)
			collection.find().toArray(function(err, data){ 	// in the comments table grab everything
					//console.log(data);
					res.send(data);		//send everything back
					});
			});
	app.post('/comments', (req, res) => { // create a new comment
		const db = req.app.locals.db;	//access the database
		const collection = db.collection('comments');	
        var comment = {};
        var body = req.body; 
		comment['id'] = body['id'];
		comment['uid']= body['uid'];
		comment['datetime'] = body['datetime'];
		comment['journalId'] = body['journalId'];
		if (collection.find(comment[body.id])) // check if the comment id exists elsewhere in the DB if so its a bad request
			res.send().code(400); 
		res.send(comment);
	});
	
	// Put a comment, create new one, delete, etc...
};
