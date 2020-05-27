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
	app.put('/users', (req, res) => { // create a new user
		const db = req.app.locals.db;	//access the database
		const collection = db.collection('users');	
		var user; 
		user['id'] = data['id'];
		user['name']= data['name'];
		user['email'] = data['email'];
		user['image'] = data['image'];
		user['dateJoined'] = data['dateJoined'];
		user['admin'] = data['admin'];
		if (collection.find(user[id])) // check if the user id exists elsewhere in the DB if so its a bad request
			res.send().code(400); 
		res.send(user).code(200);
	})
	// Put a user, create new one, delete, etc...
};
