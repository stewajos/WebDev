// All user endpoints in this file
module.exports = function(app){
	// Get users
	app.get('/', (req, res) => {
			const db = req.app.locals.db;	//access the database
			const collection = db.collection('users');		//the users document(table)
			collection.find().toArray(function(err, data){ 	// in the users table grab everything
					//console.log(data);
					res.send(data);		//send everything back
					});
			});
	app.get('/', (req, res) => {
			

	})
	// Put a user, create new one, delete, etc...
};
