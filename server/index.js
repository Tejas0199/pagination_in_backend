const { createServer } = require('http');
const { readFileSync } = require('fs');
const connectWithDB = require('./model/db');
const Employee = require('./model/schema');
const app = require('./app');
require('dotenv').config();

const PORT = process.env.PORT || 4050;
const hostName = "127.0.0.8";

const server = createServer(app);


//to store initial data in mogodb from json file
async function storeData() {
	const employee = JSON.parse(readFileSync('./employee.json','utf-8'));
	for(let i = 0 ; i < employee.length ; i++) {
		let emp = new Employee(employee[i]);
		await emp.save();
	}
}

async function startServer() {
	await connectWithDB();
	server.listen(PORT,hostName,() => {
		
		console.log(`server started with http://${hostName}:${PORT}`);
	})
}

startServer();