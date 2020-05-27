// Load the express library
const express = require('express')
// Create an instance of an express app
const app = express();
// Run on this port (stay over 1024 to avoid the need for admin privileges)
const port = 8080;
// Load the database library
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
// Enter your credentials in below!
const uri = "mongodb+srv://stewajos:Derrick1@assignmentcluster-bphll.mongodb.net/test?retryWrites=true&w=majority";

// Create a variable to hold our db connection
let connection;

// Tell the app to use the builtin JSON parser
app.use(express.json());
// Tell the app to decode urls for us (so we can pass
// values in the URL such as "users/1")
app.use(express.urlencoded({ extended: true }))

// Load in the users module
require('./users.js')(app);

// Connect to the db; start listening if successful.
MongoClient.connect(uri, {useNewUrlParser: true}).then(client => { 
	db = client.db('quarantineJournal');
	connection = client;
	app.locals.connection = connection;
	app.locals.db = db;
	app.listen(port, () => console.log(`Begin; listening on port ${port}`));
}).catch(error => console.error(error));

// Catch when a user hits Ctrl-C.  Shutdown the database
// cleanly before exiting.
process.on('SIGINT', () => {
	connection.close();
	process.exit();
});
