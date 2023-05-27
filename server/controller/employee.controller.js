const Employee = require('../model/schema');

const employeeReadController = async (request,response) => {
	const query = request.query;
	console.log(query)
	const [page,entries] = [Number(query.page),Number(query.entries)]
	const employees = await Employee.find({}).select({ __v : 0, _id : 0}).sort({ id : 1})
	if(page * entries > Math.ceil(employees.length / entries) * entries) {
		response.status(400).json({ message : "data dosn't exist"});
	} else {
		response.status(200).json({ data : employees.slice((page - 1) * entries,page * entries),page : page , totalEmployee : employees.length , totalPages : Math.ceil(employees.length / entries)});
	}
}

module.exports = employeeReadController;