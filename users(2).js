// All user endpoints in this file
module.exports = function(app){
	// Get users
	app.get('/', (req, res) => {
			const db = req.app.locals.db;
			const collection = db.collection('users');
			collection.find().toArray(function(err, data){
					//console.log(data);
					res.send(data);
					});
			});
	app.set('/', (req, res) => {
			const db = req.app.locals.db;
			const collection = db.collection('users');
			collection.set();
	});
	// Put a user, create new one, delete, etc...
};