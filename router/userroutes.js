const express = require('express');
const router = express.Router();
const  {register, login, getUsers, getUserById, editUserbyId, updateUserById, postData, deleteUserById } = require("../controllers/userdata");

router.route('/register').post(register);
router.route('/login').post(login);
router.route(`/worko/users`).get(getUsers);
router.route(`/worko/user/:userId`).get(getUserById);
router.route(`/worko/edituser/:id`).get(editUserbyId);
router.route(`/worko/updateuser/:id`).put(updateUserById);
router.route(`/worko/userdata`).post(postData);
router.route(`/worko/tasks/:id`).delete(deleteUserById);


module.exports=router;