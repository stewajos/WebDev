// All user endpoints in this file
module.exports = function(app){
	// Get users
	app.get('/', (req, res) => {
			const db = req.app.locals.db;
			const collection = db.collection('locations');
			collection.find().toArray(function(err, data){
					//console.log(data);
					res.send(data);
					});
			});
			
	// Put a user, create new one, delete, etc...
};