import express from "express";
import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import verifyToken from "../middlewares/VerifyToken.js";
import Video from "../models/video.js";

const router = express.Router();

router.post('/login', async (req, res) => {
  try {
    const { email, pass } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      const payload = {
        id: user._id,
        name: user.name,
        email: user.email
      }

      if (user.password === pass) {
        let token = jwt.sign(payload, process.env.JWT_SECRET);
        res.status(200).json({ msg: "Valid credentials", token, name: user.name, email: user.email });
      } else {
        res.status(202).json({ msg: "Invalid password" });
      }
    } else {
      res.status(203).json({ msg: "User not found" });
    }
    // console.log(req.body);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server Error" });
  }
})

router.post('/register', async (req, res) => {
  const { name, email, pass } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      const newuser = await User({
        name,
        email,
        password: pass
      }).save();

      console.log(newuser);
      if (newuser) {
        res.status(201).json({ msg: "Account created" });
      }

    } else {
      res.status(203).json({ msg: "Account exists" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error in creating account" });
  }
});

router.post("/savedLists", verifyToken, async(req, res) => {
  try {
    const user = await User.findOne({ email: req.body.userdata.email });
    const {video_id} = req.body;
    
    if(user) {
      let lists = {};

      for (let i = 0; i < Object.keys(user.savedLists).length; i++) {
        // console.log();
        lists[Object.keys(user.savedLists)[i]] = false;
        if (user.savedLists[Object.keys(user.savedLists)[i]].includes(video_id)) 
          lists[Object.keys(user.savedLists)[i]] = true;
      }

      res.status(200).json(lists);
    }
    else res.status(404).json({msg: "User not found"});

  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server Error" });
  }
})

router.post("/savedLists2", verifyToken, async(req, res) => {
  try {
    const user = await User.findOne({ email: req.body.userdata.email });
    const {video_id} = req.body;
    
    if(user) {
      let lists = {};

      for (let i = 0; i < Object.keys(user.savedLists).length; i++) {
        // console.log();
        lists[Object.keys(user.savedLists)[i]] = [null, 0];
        let length = user.savedLists[Object.keys(user.savedLists)[i]].length;
        if (length > 0) 
          lists[Object.keys(user.savedLists)[i]] = [user.savedLists[Object.keys(user.savedLists)[i]][length-1], length];
      }

      res.status(200).json(lists);
    }
    else res.status(404).json({msg: "User not found"});

  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server Error" });
  }
})

router.post("/addSaveList", verifyToken, async(req, res) => {
  try {
    const user = await User.findOne({ email: req.body.userdata.email });
    const {listName, video_id} = req.body;

    if(user){
      console.log(listName);
      if(user.savedLists[listName] && !user.savedLists[listName].includes(video_id)) 
        user.savedLists[listName].push(video_id);
      else 
        user.savedLists[listName] = [video_id];
      user.markModified('savedLists');
      user.save();
      console.log(user);
      res.status(200).json({msg: "Video saved"});
    } 
    else res.status(404).json({msg: "User not found"});

  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server Error" });
  }
})

router.post("/removeFromSaveList", verifyToken, async(req, res) => {
  try {
    const user = await User.findOne({ email: req.body.userdata.email });
    const {listName, video_id} = req.body;

    if(user){
      user.savedLists[listName] = user.savedLists[listName].filter(id => id != video_id);
      user.markModified('savedLists');
      user.save();
      res.status(200).json({msg: "Video removed"});
    } 
    else res.status(404).json({msg: "User not found"});

  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server Error" });
  }
})

router.post("/listVideos", verifyToken, async(req, res) => {
  try {
    const user = await User.findOne({ email: req.body.userdata.email });
    const {listName} = req.body;

    if(user){
      let videoData = [];

      console.log(user.savedLists[listName].length);
      console.log(user.savedLists[listName]);
      for (let i=0; i<user.savedLists[listName].length; i++) {
        let data = await Video.find({ _id: user.savedLists[listName][i]});
        videoData[i] = data[0];
      }
      console.log(videoData);
      res.status(200).json(videoData);
    } 
    else res.status(404).json({msg: "User not found"});

  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server Error" });
  }
})

router.post("/removeSaveList", verifyToken, async(req, res) => {
  try {
    const user = await User.findOne({ email: req.body.userdata.email });
    const {listName} = req.body;

    if(user){
      delete user.savedLists[listName];
      user.markModified('savedLists');
      user.save();
      res.status(200).json({msg: "Savelist removed"});
    } 
    else res.status(404).json({msg: "User not found"});

  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server Error" });
  }
})

export default router;