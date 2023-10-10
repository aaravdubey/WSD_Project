import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  videoList: {type: Object, default: []},
  likedVideoList: {type: Object, default: []}
});

const User = mongoose.model('User', userSchema);

export default User;