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
		if (!collection.find(user['id'])){ // check if the user id exists elsewhere in the DB if so its a bad request
			res.sendStatus(400); 
		}
		else{
			collection.insert(user);
			res.send(user)		
			}
	});
	app.delete('/users', ((req, res) => {
		const db = req.app.locals.db;	//access the database
		const collection = db.collection('users');	
		var body = req.body;
		if (!collection.find({"id" : req.body.id})) {
			collection.find({"id" : req.body.id}).toArray(function(err, data){ 	// in the users table grab everything
			//console.log(data);	//send everything back
			res.sendStatus(404);
			});
		}else {
			collection.remove({"id" : req.body.id}); //
			res.sendStatus(202);
		}
	}));
	app.put('/users', ((req,res) => {
		const db = req.app.locals.db;	//access the database
		const collection = db.collection('users');	
		var user={name: req.body.name || "",
		email: req.body.email || "",
		image: req.body.image || "",
		dateJoined: req.body.dateJoined || "",
		admin: req.body.admin || ""};
		var body = req.body;
		var oldUser = collection.find({"id": req.body.id});
		//console.log(result)
		if (collection.find({"id": req.body.id})) {
			collection.findOne({"id": req.body.id}, function(err, data){
			user = req.body.id
			res.send(202);	
			collection.replaceOne(data, user)
			}) 	
		}
		else {
			res.sendStatus(404);
		}
	}));
	// Put a user, create new one, delete, etc...
}

