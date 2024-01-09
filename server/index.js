import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import UserRouter from './routers/userRouter.js';
import VideoRouter from './routers/videoRouters.js';

dotenv.config();

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({ credentials: true, origin: ['http://localhost:5173'] }));


mongoose.connect("mongodb://0.0.0.0/Codecampus", { useNewUrlParser: true })
  .then(console.log("Connected to DB"))
  .catch((error) => { console.log(error) });


app.use("/account", UserRouter);
app.use("/video", VideoRouter);

app.listen(3000, () => console.log('Server started on port 3000'));