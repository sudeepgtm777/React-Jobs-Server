const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handleFactory');

// Just enough to return current logged-in user
exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

/****** The use of factory model to getAllUser. *******/
exports.getAllUsers = factory.getAll(User);

/****** The use of factory model to getUser. *******/
exports.getUser = factory.getOne(User);

/****** The use of factory model to update User. *******/
exports.updateUser = factory.updateOne(User);

/****** The use of factory model to delete User. *******/
exports.deleteUser = factory.deleteOne(User);
