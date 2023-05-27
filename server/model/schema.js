const { Schema, model } = require('mongoose');

const EmployeeSchema = new Schema({
	id : {
		type : Number,
		required : true,
	},
	firstName : {
		type : String,
		required : true,
	},
	lastName : {
		type : String,
		required : true,
	},
	position : {
		type : String,
		required : true,
	},
	office : {
		type : String,
		required : true,
	},
	startDate : {
		type : String,
		required : true,
	},
	age : {
		type : Number,
		required : true,
	},
	salary : {
		type : Number,
		required : true,
	}
}) 

module.exports = new model('employees',EmployeeSchema);