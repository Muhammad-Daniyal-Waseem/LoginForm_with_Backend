const express = require('express');
const user = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwt_secret = 'screte';
const fetchuser = require('../middleware/FetchUser');

const router = express.Router();
const { body, validationResult } = require('express-validator');

router.post('/createUser', [
  body('name', 'Enter Valid Name').isLength({ min: 3 }),
  body('email', 'Enter Valid Email').isEmail(),
  body('password', 'Enter Valid Password').isLength({ min: 5 }),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {email}=req.body;
    const foundUser = await user.findOne({ email });
    if(foundUser)
    {
      return res.status(400).json({ error: 'Email already exists' });
    }
    
    const saltRounds = 10;
    const hashpassword = await bcrypt.hash(req.body.password, saltRounds);

    await user.create({
      name: req.body.name,
      email: req.body.email,
      password: hashpassword,
    });
    const data = {
      user: {
        id: user.id,
      },
    };

    const token = jwt.sign(data, jwt_secret);
    res.json(token);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/verifyUser', [
  body('email', 'Enter Valid Email').isEmail(),
  body('password', 'Password can not be blanked').exists(),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    const foundUser = await user.findOne({ email });

    if (!foundUser) {
      return res.status(400).json({ error: 'Please try to login with correct credentials' });
    }

    const passCompare = await bcrypt.compare(password, foundUser.password);

    if (!passCompare) {
      return res.status(400).json({ error: 'Please try to login with correct credentials' });
    }

    const data = {
      user: {
        id: user.id,
      },
    };

    const token = jwt.sign(data, jwt_secret);
    res.json(token);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/getuser', fetchuser, async (req, res) => {
  try {
    const userid=req.user.id;
    const u=await u.findById(userid).select("-password")
    res.send(u);
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
