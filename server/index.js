import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import fs from 'fs';
import User from './models/user.js';
import path from 'path';
import Video from './models/video.js';

dotenv.config();

const rootVideoDir = "CODES/ChristCodes/WebDev_MiniProj/server/Videos/";

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors({ credentials: true, origin: ['http://localhost:5173'] }) );

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const fileName = file.originalname;
    const folderName = fileName.split('_')[0];

    const folderPath = path.join('./Videos', folderName);
    fs.mkdirSync(folderPath, { recursive: true });

    cb(null, folderPath);

  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

mongoose.connect("mongodb://0.0.0.0/Codecampus", {useNewUrlParser: true})
    .then( console.log("Connected to DB") )
    .catch( (error) => {console.log(error)} );

app.post('/login', async (req, res) =>{
  try {
    const {email, pass} = req.body;
    const user = await User.findOne({email});
    if (user) {
      const payload = {
        id: user._id,
        name: user.name,
        email: user.email
      }

      if (user.password === pass) {
        let token = jwt.sign(payload, process.env.JWT_SECRET);
        res.status(200).json({msg: "Valid credentials", token, name: user.name, email: user.email});
      } else {
        res.status(203).json({msg: "Invalid password"});
      }
    }else {
      res.status(404).json({msg: "User not found"});
    }
    console.log(req.body);
  } catch (error) {
    console.log(error);
    res.status(500).json({msg: "Server Error"});
  }
})

app.post('/register', async (req, res) =>{
  const {name, email, pass} = req.body;

  
  try {
    const user = await User.findOne({email});

    if (!user) {
      const newuser = await User({
        name,
        email,
        password: pass
      }).save();
  
      console.log(newuser);
      if (newuser) {
        res.status(201).json({msg: "Account created"});
      }

    }else {
      res.status(203).json({msg: "Account exists"});
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({msg: "Error in creating account"});
  }
});

app.post('/verifyToken', async (req, res) =>{
  let token = req.headers['x-access-token'] || req.headers['authorization'];

  try {
    if (token && token.startsWith('Bearer ')) {
      token = token.slice(7, token.length);
    } else return res.status(401).json({msg: 'Token is not valid'});
  
    if (token) {
      jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
          return res.json({msg: 'Invalid'});
        } else {
          return res.status(200).json({msg: 'Valid Token'});
        }
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({msg: "Server Error"});
  }
})

app.get('/video', async (req, res) => {
  try {
    const videoDir = req.query.url;
    console.log(req.query.url);
    res.sendFile(rootVideoDir + videoDir, {root: '/'});
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error fetching video' });
  }
})

app.post('/videoData', async (req, res) => {
  try {
    console.log(req.body.body.videoUrl);
    const data = await Video.find({videoUrl: req.body.body.videoUrl});
    console.log(data);
    res.status(200).json({data});
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error fetching video' });
  }
})

app.post('/upload', upload.single('video'), async (req, res) => {
  console.log(req.body.fileName.split('_'));
  
  const video = new Video({
    name: req.body.name,
    email: req.body.fileName.split('_')[0],
    title: req.body.title,
    videoUrl: `${req.body.fileName.split('_')[0]}/${req.body.fileName}`,
    description: req.body.desc
  }).save();

  if (video) res.status(201).json({msg: 'Video uploaded successfully'});
  else res.status(500).json({msg: 'Error in uploading video'});
});

app.post('/myvideos', async (req, res) => {
  try{
    const data = await Video.find({email: req.body.email});
    res.status(200).json({videos: data});

  } catch (error) {
    console.log(error);
    res.status(500).json({msg: "Server Error"});
  }
})

app.post('/allvideos', async (req, res) => {
  try{
    const data = await Video.find({});
    res.status(200).json({videos: data});

  } catch (error) {
    console.log(error);
    res.status(500).json({msg: "Server Error"});
  }
})

app.listen(3000, () => console.log('Server started on port 3000'));