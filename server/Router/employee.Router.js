const { Router } = require('express');
const employeeReadController = require('../controller/employee.controller');

const employeeRouter = Router();

employeeRouter.get('/', employeeReadController)

module.exports = employeeRouter;