const express = require('express');
const router = express.Router();
const { register, login, getTasks, getTaskById, editTaskbyId, updateTaskById, postData, deleteTaskById } = require("../controllers/taskdata");

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/tasks').get(getTasks);
router.route(`/task/:id`).get(getTaskById);
router.route(`/editdata/:id`).get(editTaskbyId);
router.route(`/update/:id`).put(updateTaskById);
router.route('/taskdata').post(postData);
router.route(`/tasks/:id`).delete(deleteTaskById);


module.exports=router;