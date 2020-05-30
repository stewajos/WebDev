// All comment endpoints in this file
module.exports = function(app){
    // class Comments {
    //     id,
    //     journalId,
    //     uid (who posted the comment),
    //     datetime
    // }


	app.get('/comments', (req, res) => {
			const db = req.app.locals.db;	// This accesses the database
			const collection = db.collection('comments');		// This is the comments document table
			collection.find().toArray(function(err, data){ 	// Gets everything in the comments table
					//console.log(data);
					res.send(data);		// This sends everything back
					});
            });
            
	app.post('/comments', (req, res) => { // This creates a new comment
		const db = req.app.locals.db;	// This accesses MongoDB
		const collection = db.collection('comments');	
        var comment = {};
        var body = req.body; 
		comment['id'] = body['id'];
		comment['uid']= body['uid'];
		comment['datetime'] = body['datetime'];
		comment['journalId'] = body['journalId'];
		if (!collection.find(comment[body.id])){ // This checks if the comment id exists elsewhere in the DB and if so it's a bad request
			res.sendStatus(400);
		}
		else {
			collection.insert(comment)
			res.send(comment);
		}
    });

    app.put('/comments', (req, res) => { // This creates a new comment
		const db = req.app.locals.db;	// This accesses MongoDB
		const collection = db.collection('comments');	
        var comment = {};
        var body = req.body; 
		comment['id'] = body['id'];
		comment['uid']= body['uid'];
		comment['datetime'] = body['datetime'];
		comment['journalId'] = body['journalId'];
		if (!collection.find(comment[body.id])){ // This checks if the comment id exists elsewhere in the DB and if so it's a bad request
        collection.insert(comment)
        res.send(comment);
		
		}
    });
    
    
    // app.put('/comments', (req, res) => { // This puts and repaces the comment that was there before
    //     const db = req.app.locals.db; // This access MongoDB
    //     const collection = db.collection('comments');
    //     var comment = {console.log()};
    //     var body = req.body;
    //     if (!collection.find(comment[body.users])){
    //         then 
    //         collection.insert(comment)
    // }
    
    //     }
    // });

	app.delete('comments', (req, res) => {
		const db = req.app.locals.db;	// This accesses MongoDB
		const collection = db.collection('comments');	
        var comment = {};
		var body = req.body; 
		if (!collection.find({"id" : req.body.id})) {
			collection.find({"id" : req.body.id}).toArray(function(err, data){ 	// Deletes everything in the images table
			//console.log(data);
			res.send(data);	
			res.sendStatus(404);	// This sends everything back to DB
			});
		}else {
			collection.remove({"id" : req.body.id}); //
			res.sendStatus(202)
			res.send(body);	
		}
	})
	// Put a comment, create new one, delete, etc...
};
