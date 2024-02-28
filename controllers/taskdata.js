require('../db/connection.js');
require("dotenv").config();
const Task = require('../model/taskSchema.js');
const User = require('../model/userSchema.js');
const path = require('path');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const register=async (req, res) => {
    try {
        let { firstname, email, password } = req.body;
        if (!firstname || !email || !password)
            return res.status(400).json({ msg: "Not all fields have been entered." });
        if (password.length < 5)
            return res.status(400).json({ msg: "The password needs to be at least 5 characters long." });
       
        const existingUser = await User.findOne({ email: email });
        if (existingUser)
            return res.status(400).json({ msg: "An account with this email already exists." });
        if (!firstname) firstname = email;
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);
        const newUser = new User({ email, password: passwordHash, firstname });
        const savedUser = await newUser.save();
        if (savedUser) {
            return res.status(201).json({ message: "user registered successfully" });
        }
        else {
            return res.status(500).json({ error: "error" });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const login=async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password)
            return res.status(400).json({ msg: "Not all fields have been entered." });
        const user = await User.findOne({ email: email });
        if (!user)
            return res.status(400).json({ msg: "No account with this email has been registered." });
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: "Invalid credentials." });
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        res.json({
            token, user: { id: user._id, displayName: user.displayName, },
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getTasks= (req, res)=> {

    Task.find(function (err, data) {
        if (err) {
            console.log(err);
        }
        else {

            console.log({ data: data }, data);
            res.status(200).json({ data: data });
        }
    });

};

const getTaskById=async (req, res) => {
    console.log(req.params.id);
    Task.findById(req.params.id, function (err, data) {
        if (err) {
            console.log(err);
        }
        else {

            console.log({ data: data }, data);
            res.status(200).json({ data: data });
        }
    });

};

const editTaskbyId=async (req, res) => {
    console.log(req.params.id);
    Task.findById(req.params.id, function (err, data) {
        if (err) {
            console.log(err);
        }
        else {

            console.log({ data: data }, data);
            res.status(200).json({ data: data });
        }
    });

};

const updateTaskById=(req, res) => {
    var data = {
        title: req.body.title,
        description: req.body.description,
        duedate: req.body.duedate,
        status: req.body.status


    };
    Task.findByIdAndUpdate(req.params.id, data, { new: true }, function (
        err,
        data
    ) {
        if (err) {
            console.log("err", err);
            return res.status(404).json({ error: "Task data not updated" })
        } else {
            console.log("success");
            return res.status(201).json({ message: "Task updated", data });
        }
    });

};

const postData= async (req, res) => {
    
    const { title, description, duedate, status } = req.body;
    if (!title || !description || !duedate || !status) {
        return res.status(422).json({ error: "plz fill all filled" });
    }

    const taskdata = new Task({ title, description, duedate, status })
    const taskresult = await taskdata.save();
    if (taskresult) {
        return res.status(201).json({ message: "user data posted" });
    }
};

const deleteTaskById=async (req, res) => {
    console.log(req.params.id);
    try {
        const taskData = await Task.deleteOne
            ({ _id: req.params.id });

        if (taskData) {

            res.status(201).json({ message: "Task deleted" });
        }
    } catch (error) {
        console.log(error);
    }

};

module.exports={register,login,getTasks,getTaskById,editTaskbyId,updateTaskById ,postData ,deleteTaskById};


