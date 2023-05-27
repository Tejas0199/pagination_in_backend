const { connect } = require('mongoose');
require('dotenv').config();
const URL = process.env.MONOGDB_URL;



const connectWithDB = async () => {
	console.log(URL);
	try {
		connect(URL);
		console.log('connected with mongo db')
	} catch {
		console.log("not able to connect with mongo db");
	}
}

module.exports = connectWithDB;