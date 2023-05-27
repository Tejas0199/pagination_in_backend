const express = require('express');
const cors = require('cors');
const employeeRouter = require('./Router/employee.Router');
const app = express();


app.use(express.json());
app.use(cors({
	origin : "http://localhost:3000"
}))
app.use(express.json());

app.use('/employee',employeeRouter)


module.exports = app;