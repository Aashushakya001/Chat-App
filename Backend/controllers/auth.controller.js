import mongoose from "mongoose";
import bycriypt from "bcryptjs";
import User from "../models/user.models.js";
import genrateToken from "../utils/createToken.js";

export const signup = async (req, res) => {
  try {
    // console.log(req.body);
    const { fullname, username, password, confirmPassword, gender } = req.body;
    if (password !== confirmPassword) {
      res.status(400).json({ error: "passwords dont match" });
    }
    const user = await User.findOne({ username });

    if (user) {
       return res.status(400).json({ error: "username already exists" });
    }

    //HASING PASSWORD

    const salt = await bycriypt.genSalt(10);
    const hashedpassword = await bycriypt.hash(password, salt);

    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    const newuser = new User({
      fullname,
      username,
      password: hashedpassword,
      gender,
      profilepicture: gender == "male" ? boyProfilePic : girlProfilePic,
    });
    if (newuser) {
      genrateToken(newuser._id, res);
      await newuser.save();
      res.status(201).json({
        _id: newuser._id,
        fullname: newuser.fullname,
        username: newuser.username,
        profilepicture: newuser.profilepicture,
      });
    } else {
      res.status(400).json({ error: "invaldi user data" });
    }
  } catch (error) {
    console.log("error in signup controller", error.message);
    res.status(500).json({ error: "internal error" });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    const ispasswordcorrect = await bycriypt.compare(password, user?.password || "");
    console.log(ispasswordcorrect);


    if (!user || !ispasswordcorrect) {
      res.status(400).json({ error: "invalid credentials" });
    }

    genrateToken(user._id, res);
    res
      .status(200)
      .json({
        _id:user._id,
        username: user.username,
        fullname: user.fullname,
        profilepicture: user.profilepicture,
      });


  } catch (error) {
    console.log("error in signup controller", error.message);
    res.status(500).json({ error: "internal error" });
  }
};

export const logout = (req, res) => {
  try {
    res.cookie('jwt',"",{maxAge:0})
    res.status(200).json({message:"logout Sucsessfully"})
  } catch (error) {
    console.log("error in signup controller", error.message);
    res.status(500).json({ error: "internal error" });
  }
};


