require('../db/connection.js');
require("dotenv").config();
const User = require('../model/userSchema.js');
const Userauth=require('../model/userauth.js');
const path = require('path');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");

const register = async (req, res) => {
    try {
        let { firstname, email, password} = req.body;
        if (!firstname || !email || !password)
            return res.status(400).json({ msg: "Not all fields have been entered." });
        if (password.length < 5)
            return res.status(400).json({ msg: "The password needs to be at least 5 characters long." });

        const existingUser = await Userauth.findOne({ email: email });
        if (existingUser)
            return res.status(400).json({ msg: "An account with this email already exists." });
        if (!firstname) firstname = email;
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);
        const newUser = new Userauth({ email, password: passwordHash, firstname });
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

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password)
            return res.status(400).json({ msg: "Not all fields have been entered." });
        const user = await Userauth.findOne({ email: email });
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

const getUsers = (req, res) => {

    User.find(function (err, data) {
        if (err) {
            console.log(err);
        }
        else {

            console.log({ data: data }, data);
            res.status(200).json({ data: data });
        }
    });

};

const getUserById = async (req, res) => {
    console.log(req.params.id);
    User.findById(req.params.id, function (err, data) {
        if (err) {
            console.log(err);
        }
        else {

            console.log({ data: data }, data);
            res.status(200).json({ data: data });
        }
    });

};

const editUserbyId = async (req, res) => {
    console.log(req.params.id);
    User.findById(req.params.id, function (err, data) {
        if (err) {
            console.log(err);
        }
        else {

            console.log({ data: data }, data);
            res.status(200).json({ data: data });
        }
    });

};

const updateUserById = (req, res) => {
    var data = {
        email: req.body.email,
        username: req.body.username,
        age: req.body.age,
        city: req.body.city,
        zipcode: req.body.zipcode
    };
    if (!req.params.id) {
        return res.status(422).json({ error: "plz provide Id" });
    }
    User.findByIdAndUpdate(req.params.id, data, { new: true }, function (
        err,
        data
    ) {
        if (err) {
            console.log("err", err);
            return res.status(404).json({ error: "User data not updated" })
        } else {
            console.log("success");
            return res.status(201).json({ message: "User updated", data });
        }
    });

};

const postData = async (req, res) => {

    const { email, username, age, city, zipcode } = req.body;
    if (!email || !username || !age || !city || !zipcode) {
        return res.status(422).json({ error: "plz fill all filled" });
    }

    const userdata = new User({ email, username, age, city, zipcode })
    const userresult = await userdata.save();
    if (userresult) {
        return res.status(201).json({ message: "User data posted" });
    }
};

const deleteUserById = async (req, res) => {
    console.log(req.params.id);
    if (!req.params.id) {
        return res.status(422).json({ error: "plz provide Id" });
    }
    try {
        const userData = await User.deleteOne
            ({ _id: req.params.id });

        if (userData) {

            res.status(201).json({ message: "Userdata deleted" });
        }
    } catch (error) {
        console.log(error);
    }

};

module.exports = { register, login, getUsers, getUserById, editUserbyId, updateUserById, postData, deleteUserById };


