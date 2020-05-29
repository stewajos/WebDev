// All user endpoints in this file
module.exports = function(app){
	// Get users
	// class User {
	// 	id,
	// 	name,
	// 	email,
	// 	Some authentication method (NEVER STORE A PASSWORD)
	// 	image,
	// 	dateJoined,
	// 	admin
	// }
	app.get('/users', (req, res) => {
			const db = req.app.locals.db;	//access the database
			const collection = db.collection('users');		//the users document(table)
			collection.find().toArray(function(err, data){ 	// in the users table grab everything
					//console.log(data);
					res.send(data);		//send everything back
					});
			});
	app.post('/users', (req, res) => { // create a new user
		const db = req.app.locals.db;	//access the database
		const collection = db.collection('users');	
		var user={};
		console.log(req.body);
		var body = req.body;
		user['id'] = body.id;
		user['name']= body['name'];
		user['email'] = body['email'];
		user['image'] = body['image'];
		user['dateJoined'] = body['dateJoined'];
		user['admin'] = body['admin'];
		console.log(user)
		if (collection.find(user.id)) // check if the user id exists elsewhere in the DB if so its a bad request
			res.sendStatus(400); 
			else{
				res.sendStatus(200)
				res.send(user)		
			}
		res.send(user).code(200);
	});
	app.delete('/users', ((req, res) => {
		const db = req.app.locals.db;	//access the database
		const collection = db.collection('users');	
		var user={};
		var body = req.body;
		console.log(user);
		if (collection.find({"id" : req.body.id})) {
			collection.find({"id" : req.body.id}).toArray(function(err, data){ 	// in the users table grab everything
			//console.log(data);
			res.send(data);		//send everything back
			});
		}
		collection.remove({"id" : req.body.id}); //
		res.sendStatus(202)
		res.send(body);
	}))
	// Put a user, create new one, delete, etc...
};
