// All modal imported
const userModel = require('../model/users');
const commandService = require('../services/common.Service');
const accountValidation = require('../validation/create-account-validator');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwtKey = 'dtdtdtdtdtdtdtdtdtdt';

// Create Account
exports.createAcc = async (req, res) => {
  try {
    accountValidation.accountValidation(req.body);

    const userAvailable = await userModel.findOne({ email: req.body.email });

    if (!userAvailable) {
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(req.body.password, salt);

      const newUser = await new userModel({
        name: `${req.body.fname}  ${req.body.lname}`,
        email: req.body.email,
        password: hashPassword,
        birthOfDate: req.body.birthOfDate,
        gender: req.body.gender,
        profileUrl: req.body.profileUrl,
        userToken: `${req.body.fname}.${req.body.lname}${commandService.randomNum(100000, 999999)}`,
      }).save();

      if (newUser) {
        res.json('Account Created Successfully');
      } else {
        res.status.json('Something wrong while Create Account');
      }
    } else {
      res.status(400).json('User Already Available');
    }
  } catch (err) {
    res.status(400).json(err);
  }
};

// Updated Account
exports.updateAccount = async (req, res) => {
  try {
    const file = req.file;
    const filename = file ? `/assets/profileUpload/${file.filename}` : undefined;

    const updatedAcc = await userModel.updateOne(
      { _id: req.params.id },
      {
        $set: {
          name: `${req.body.fname}  ${req.body.lname}`,
          birthOfDate: req.body.birthOfDate,
          profileUrl: filename,
          gender: req.body.gender,
        },
      }
    );

    if (updatedAcc) {
      const data = await userModel.findOne({ _id: req.params.id });
      res.json(data);
    }
  } catch (err) {
    res.status(400).json(err);
  }
};

// Login Account
exports.loginUser = async (req, res) => {
  try {
    const data = await userModel.findOne({ email: req.body.email });

    if (data) {
      if (await bcrypt.compare(req.body.password, data.password)) {
        const payload = {
          userToken: data.userToken,
          _id: data._id,
        };

        const jwtToken = jwt.sign(payload, jwtKey, { expiresIn: '48h' });
        res.json(jwtToken);
      } else {
        throw 'Password Is Invalid. Please Try Again';
      }
    } else {
      throw 'Username Is Invalid';
    }
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.getUserProfile = async (req, res) => {
  try {
    const userData = req.userData;

    const response = await userModel
      .findOne({ userToken: userData.userToken })
      .populate({ path: 'user_info' })
      .populate({
        path: 'user_Friends',
        match: { user_id: userData._id, friendStatus: 'Accepted' },
        populate: [{ path: 'friend_id' }, { path: 'user_id' }],
      })
      .populate({
        path: 'user_post',
        populate: [
          {
            path: 'getLikes',
            match: { likeStatus: 'like' },
            populate: [{ path: 'user_id' }, { path: 'userClickId' }],
          },
          { path: 'postComments', populate: [{ path: 'user_commented_id' }] },
        ],
      });

    res.json(response);
  } catch (err) {
    res.status(400).json(`Something went wrong: ${err}`);
  }
};
